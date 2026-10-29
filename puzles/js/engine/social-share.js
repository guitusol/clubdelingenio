/**
 * Puzles del Club — Motor de Duelos y Retos por WhatsApp
 * Genera enlaces dinámicos con semilla matemática, imagen y marca personal
 * para desafiar a amigos o familiares con idénticas condiciones.
 */

class SocialShareEngine {
  constructor() {
    this.baseUrl = window.location.origin + window.location.pathname;
  }

  generateWhatsAppUrl(puzzleData) {
    const {
      imageId,
      title,
      difficulty,
      diffLabel,
      piecesCount,
      score,
      timeFormatted,
      seed
    } = puzzleData;

    // Parámetros codificados en la URL
    const params = new URLSearchParams({
      reto: '1',
      img: imageId,
      diff: difficulty,
      seed: seed.toString(),
      rival_score: score.toString(),
      rival_time: timeFormatted
    });

    const challengeUrl = `${this.baseUrl}?${params.toString()}`;

    // Mensaje preformateado entusiasta y elegante
    const text = 
`🧩 *¡DESAFÍO EN PUZLES DEL CLUB!* 🏆

Acabo de completar el puzle *"${title}"* (${piecesCount} piezas, nivel ${diffLabel}):
⏱️ *Tiempo:* ${timeFormatted}
⭐ *Puntuación:* ${score.toLocaleString()} pts

¿Podrás superar mi marca con el mismo corte de piezas?
Entra a resolverlo aquí:
👉 ${challengeUrl}`;

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  }

  // Comprueba si la URL actual proviene de un reto de WhatsApp
  checkIncomingChallenge() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('reto') === '1') {
      return {
        isChallenge: true,
        imageId: params.get('img') || 'preset_riviera',
        difficulty: params.get('diff') || 'facil',
        seed: parseInt(params.get('seed') || '12345', 10),
        rivalScore: parseInt(params.get('rival_score') || '0', 10),
        rivalTime: params.get('rival_time') || '00:00'
      };
    }
    return { isChallenge: false };
  }
}

window.SocialShareEngine = SocialShareEngine;
