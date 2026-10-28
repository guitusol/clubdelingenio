<?php
/**
 * API Backend para Duelos Online de Damas del Club
 * Club del Ingenio — Sede Central de Juegos Lógicos
 * Soporta almacenamiento dual: MySQL/MariaDB (vía db.php) y fallback JSON en disco
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Configuración de directorio de respaldo para salas en disco si la BD no está disponible
$roomsBackupDir = __DIR__ . '/rooms';
if (!is_dir($roomsBackupDir)) {
    @mkdir($roomsBackupDir, 0755, true);
}

// Conexión a Base de Datos
$pdo = null;
if (file_exists(__DIR__ . '/db.php')) {
    try {
        // Redirigir temporalmente la salida de error en caso de fallo en db.php
        ob_start();
        include __DIR__ . '/db.php';
        ob_end_clean();
    } catch (Throwable $e) {
        $pdo = null;
    }
}

// Helper: Generador de tablero inicial clásico de Damas Españolas (8x8)
function getInitialCheckersBoard() {
    $board = [];
    for ($r = 0; $r < 8; $r++) {
        $row = [];
        for ($c = 0; $c < 8; $c++) {
            if (($r + $c) % 2 === 1) {
                if ($r < 3) $row[] = 'B';
                elseif ($r > 4) $row[] = 'W';
                else $row[] = null;
            } else {
                $row[] = null;
            }
        }
        $board[] = $row;
    }
    return $board;
}

// Helper: Generador de Código de Sala amigable de 6 caracteres alfanuméricos
function generateRoomCode($pdo, $backupDir) {
    $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Evitamos I, O, 0, 1 para evitar confusiones
    for ($attempt = 0; $attempt < 10; $attempt++) {
        $randStr = '';
        for ($i = 0; $i < 6; $i++) {
            $randStr .= $chars[random_int(0, strlen($chars) - 1)];
        }
        $code = 'DAMAS-' . $randStr;

        // Comprobar que no exista
        if ($pdo) {
            $stmt = $pdo->prepare("SELECT id FROM damas_rooms WHERE room_code = ? LIMIT 1");
            $stmt->execute([$code]);
            if (!$stmt->fetch()) {
                return $code;
            }
        } else {
            if (!file_exists($backupDir . '/' . $code . '.json')) {
                return $code;
            }
        }
    }
    return 'DAMAS-' . strtoupper(substr(uniqid(), -6));
}

// Helper: Obtener datos de sala (BD o JSON)
function fetchRoom($pdo, $backupDir, $roomCode) {
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM damas_rooms WHERE room_code = ? LIMIT 1");
            $stmt->execute([$roomCode]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $row['board'] = json_decode($row['board_json'], true);
                $row['last_move'] = $row['last_move_json'] ? json_decode($row['last_move_json'], true) : null;
                return $row;
            }
        } catch (Throwable $e) {
            // Fallback a archivo si falla consulta SQL
        }
    }

    $filePath = $backupDir . '/' . preg_replace('/[^A-Z0-9\-]/', '', $roomCode) . '.json';
    if (file_exists($filePath)) {
        $content = file_get_contents($filePath);
        $data = json_decode($content, true);
        if ($data) return $data;
    }

    return null;
}

// Helper: Guardar datos de sala (BD o JSON)
function saveRoom($pdo, $backupDir, $room) {
    $roomCode = $room['room_code'];
    $boardJson = is_string($room['board_json']) ? $room['board_json'] : json_encode($room['board']);
    $lastMoveJson = isset($room['last_move_json']) 
        ? (is_string($room['last_move_json']) ? $room['last_move_json'] : json_encode($room['last_move']))
        : (isset($room['last_move']) ? json_encode($room['last_move']) : null);

    $saved = false;
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO damas_rooms 
                (room_code, player_white, player_white_name, player_black, player_black_name, status, turn, board_json, last_move_json, move_count, winner)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    player_white = VALUES(player_white),
                    player_white_name = VALUES(player_white_name),
                    player_black = VALUES(player_black),
                    player_black_name = VALUES(player_black_name),
                    status = VALUES(status),
                    turn = VALUES(turn),
                    board_json = VALUES(board_json),
                    last_move_json = VALUES(last_move_json),
                    move_count = VALUES(move_count),
                    winner = VALUES(winner)
            ");
            $stmt->execute([
                $roomCode,
                $room['player_white'] ?? null,
                $room['player_white_name'] ?? 'Blancas',
                $room['player_black'] ?? null,
                $room['player_black_name'] ?? 'Negras',
                $room['status'] ?? 'waiting',
                $room['turn'] ?? 'W',
                $boardJson,
                $lastMoveJson,
                $room['move_count'] ?? 0,
                $room['winner'] ?? null
            ]);
            $saved = true;
        } catch (Throwable $e) {
            // Continúa a respaldo en archivo
        }
    }

    // Guardar también en respaldo JSON para redundancia
    $filePath = $backupDir . '/' . preg_replace('/[^A-Z0-9\-]/', '', $roomCode) . '.json';
    $fileData = [
        'room_code' => $roomCode,
        'player_white' => $room['player_white'] ?? null,
        'player_white_name' => $room['player_white_name'] ?? 'Blancas',
        'player_black' => $room['player_black'] ?? null,
        'player_black_name' => $room['player_black_name'] ?? 'Negras',
        'status' => $room['status'] ?? 'waiting',
        'turn' => $room['turn'] ?? 'W',
        'board' => is_array($room['board']) ? $room['board'] : json_decode($boardJson, true),
        'last_move' => isset($room['last_move']) && is_array($room['last_move']) ? $room['last_move'] : ($lastMoveJson ? json_decode($lastMoveJson, true) : null),
        'move_count' => (int)($room['move_count'] ?? 0),
        'winner' => $room['winner'] ?? null,
        'updated_at' => date('Y-m-d H:i:s')
    ];
    @file_put_contents($filePath, json_encode($fileData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    return true;
}

// Obtener payload de entrada
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_REQUEST;
}

$action = $input['action'] ?? $_GET['action'] ?? 'status';

try {
    switch ($action) {

        // ====================================================================
        // ACCIÓN: CREAR SALA NUEVA
        // ====================================================================
        case 'create':
            $playerId = trim($input['player_id'] ?? '');
            if (!$playerId) {
                $playerId = 'usr_' . bin2hex(random_bytes(8));
            }
            $playerName = trim($input['player_name'] ?? 'Comandante Blanco');
            $preferredColor = strtoupper(trim($input['color'] ?? 'W'));
            if ($preferredColor !== 'B') $preferredColor = 'W';

            $roomCode = generateRoomCode($pdo, $roomsBackupDir);
            $initialBoard = getInitialCheckersBoard();

            $room = [
                'room_code' => $roomCode,
                'player_white' => $preferredColor === 'W' ? $playerId : null,
                'player_white_name' => $preferredColor === 'W' ? $playerName : 'Blancas',
                'player_black' => $preferredColor === 'B' ? $playerId : null,
                'player_black_name' => $preferredColor === 'B' ? $playerName : 'Negras',
                'status' => 'waiting',
                'turn' => 'W',
                'board' => $initialBoard,
                'board_json' => json_encode($initialBoard),
                'last_move' => null,
                'last_move_json' => null,
                'move_count' => 0,
                'winner' => null
            ];

            saveRoom($pdo, $roomsBackupDir, $room);

            echo json_encode([
                'success' => true,
                'room_code' => $roomCode,
                'your_color' => $preferredColor,
                'player_id' => $playerId,
                'room' => [
                    'status' => 'waiting',
                    'turn' => 'W',
                    'player_white_name' => $room['player_white_name'],
                    'player_black_name' => $room['player_black_name'],
                    'board' => $initialBoard,
                    'move_count' => 0
                ]
            ]);
            break;

        // ====================================================================
        // ACCIÓN: UNIRSE A SALA EXISTENTE
        // ====================================================================
        case 'join':
            $roomCode = strtoupper(trim($input['room_code'] ?? ''));
            $playerId = trim($input['player_id'] ?? '');
            if (!$playerId) {
                $playerId = 'usr_' . bin2hex(random_bytes(8));
            }
            $playerName = trim($input['player_name'] ?? 'Rival Desafiante');

            if (!$roomCode) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Código de sala no proporcionado']);
                exit;
            }

            $room = fetchRoom($pdo, $roomsBackupDir, $roomCode);
            if (!$room) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'La sala no existe o ha caducado']);
                exit;
            }

            $assignedColor = null;

            // 1. Si el jugador ya estaba en la sala (reconexión)
            if ($room['player_white'] === $playerId) {
                $assignedColor = 'W';
                if ($playerName) $room['player_white_name'] = $playerName;
            } elseif ($room['player_black'] === $playerId) {
                $assignedColor = 'B';
                if ($playerName) $room['player_black_name'] = $playerName;
            } 
            // 2. Si hay un hueco libre
            elseif (empty($room['player_white'])) {
                $assignedColor = 'W';
                $room['player_white'] = $playerId;
                $room['player_white_name'] = $playerName ?: 'Blancas';
            } elseif (empty($room['player_black'])) {
                $assignedColor = 'B';
                $room['player_black'] = $playerId;
                $room['player_black_name'] = $playerName ?: 'Negras';
            } else {
                // Sala completa
                http_response_code(403);
                echo json_encode(['success' => false, 'error' => 'La sala ya está completa con dos jugadores']);
                exit;
            }

            // Si ambos jugadores están presentes, pasar a 'playing'
            if (!empty($room['player_white']) && !empty($room['player_black']) && $room['status'] === 'waiting') {
                $room['status'] = 'playing';
            }

            saveRoom($pdo, $roomsBackupDir, $room);

            echo json_encode([
                'success' => true,
                'room_code' => $roomCode,
                'your_color' => $assignedColor,
                'player_id' => $playerId,
                'room' => [
                    'status' => $room['status'],
                    'turn' => $room['turn'],
                    'player_white_name' => $room['player_white_name'],
                    'player_black_name' => $room['player_black_name'],
                    'board' => $room['board'],
                    'last_move' => $room['last_move'],
                    'move_count' => (int)$room['move_count'],
                    'winner' => $room['winner']
                ]
            ]);
            break;

        // ====================================================================
        // ACCIÓN: CONSULTAR ESTADO DE LA SALA (POLLING)
        // ====================================================================
        case 'status':
        case 'poll':
            $roomCode = strtoupper(trim($input['room_code'] ?? $_GET['room_code'] ?? ''));
            $playerId = trim($input['player_id'] ?? $_GET['player_id'] ?? '');

            if (!$roomCode) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Código de sala no proporcionado']);
                exit;
            }

            $room = fetchRoom($pdo, $roomsBackupDir, $roomCode);
            if (!$room) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Sala no encontrada']);
                exit;
            }

            $yourColor = null;
            if ($playerId) {
                if ($room['player_white'] === $playerId) $yourColor = 'W';
                elseif ($room['player_black'] === $playerId) $yourColor = 'B';
            }

            echo json_encode([
                'success' => true,
                'room_code' => $roomCode,
                'status' => $room['status'],
                'turn' => $room['turn'],
                'is_your_turn' => ($yourColor !== null && $room['turn'] === $yourColor),
                'your_color' => $yourColor,
                'player_white_name' => $room['player_white_name'],
                'player_black_name' => $room['player_black_name'],
                'has_opponent' => (!empty($room['player_white']) && !empty($room['player_black'])),
                'board' => $room['board'],
                'last_move' => $room['last_move'],
                'move_count' => (int)$room['move_count'],
                'winner' => $room['winner']
            ]);
            break;

        // ====================================================================
        // ACCIÓN: REALIZAR MOVIMIENTO
        // ====================================================================
        case 'move':
            $roomCode = strtoupper(trim($input['room_code'] ?? ''));
            $playerId = trim($input['player_id'] ?? '');
            $move = $input['move'] ?? null;
            $newBoard = $input['board'] ?? null;
            $winner = $input['winner'] ?? null;

            if (!$roomCode || !$playerId || !$move || !$newBoard) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Parámetros de movimiento incompletos']);
                exit;
            }

            $room = fetchRoom($pdo, $roomsBackupDir, $roomCode);
            if (!$room) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Sala no encontrada']);
                exit;
            }

            // Validar que la sala esté activa
            if ($room['status'] !== 'playing') {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'La partida no está en curso activa']);
                exit;
            }

            // Validar que el jugador tenga el turno
            $playerColor = null;
            if ($room['player_white'] === $playerId) $playerColor = 'W';
            elseif ($room['player_black'] === $playerId) $playerColor = 'B';

            if (!$playerColor || $room['turn'] !== $playerColor) {
                http_response_code(403);
                echo json_encode(['success' => false, 'error' => 'No es tu turno de juego']);
                exit;
            }

            // Aplicar jugada
            $room['board'] = $newBoard;
            $room['board_json'] = json_encode($newBoard);
            $room['last_move'] = $move;
            $room['last_move_json'] = json_encode($move);
            $room['move_count'] = ((int)$room['move_count']) + 1;
            $room['turn'] = ($playerColor === 'W') ? 'B' : 'W';

            if ($winner) {
                $room['status'] = 'finished';
                $room['winner'] = $winner;
            }

            saveRoom($pdo, $roomsBackupDir, $room);

            echo json_encode([
                'success' => true,
                'room_code' => $roomCode,
                'status' => $room['status'],
                'turn' => $room['turn'],
                'move_count' => (int)$room['move_count'],
                'winner' => $room['winner']
            ]);
            break;

        // ====================================================================
        // ACCIÓN: ABANDONAR / RENDIRSE
        // ====================================================================
        case 'leave':
        case 'resign':
            $roomCode = strtoupper(trim($input['room_code'] ?? ''));
            $playerId = trim($input['player_id'] ?? '');

            if (!$roomCode || !$playerId) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
                exit;
            }

            $room = fetchRoom($pdo, $roomsBackupDir, $roomCode);
            if ($room) {
                $room['status'] = 'finished';
                if ($room['player_white'] === $playerId) {
                    $room['winner'] = 'B';
                } elseif ($room['player_black'] === $playerId) {
                    $room['winner'] = 'W';
                }
                saveRoom($pdo, $roomsBackupDir, $room);
            }

            echo json_encode(['success' => true, 'message' => 'Partida finalizada por abandono']);
            break;

        // ====================================================================
        // ACCIÓN: REINICIAR / REVANCHA EN LA MISMA SALA
        // ====================================================================
        case 'rematch':
            $roomCode = strtoupper(trim($input['room_code'] ?? ''));
            if (!$roomCode) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Sala no indicada']);
                exit;
            }

            $room = fetchRoom($pdo, $roomsBackupDir, $roomCode);
            if (!$room) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Sala no encontrada']);
                exit;
            }

            // Intercambiar colores para la revancha
            $tempId = $room['player_white'];
            $tempName = $room['player_white_name'];
            $room['player_white'] = $room['player_black'];
            $room['player_white_name'] = $room['player_black_name'];
            $room['player_black'] = $tempId;
            $room['player_black_name'] = $tempName;

            $initialBoard = getInitialCheckersBoard();
            $room['board'] = $initialBoard;
            $room['board_json'] = json_encode($initialBoard);
            $room['last_move'] = null;
            $room['last_move_json'] = null;
            $room['move_count'] = 0;
            $room['turn'] = 'W';
            $room['status'] = 'playing';
            $room['winner'] = null;

            saveRoom($pdo, $roomsBackupDir, $room);

            echo json_encode(['success' => true, 'room_code' => $roomCode, 'status' => 'playing']);
            break;

        default:
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Acción no reconocida']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
