/**
 * CÁLCULO TÁCTICO RELÁMPAGO — Motor de Resolución Algorítmica (Solver)
 * Resuelve cualquier problema de Countdown (Cifras y Letras) mediante
 * búsqueda exhaustiva en árbol con poda inteligente.
 * 
 * Encuentra:
 * 1. La solución exacta con el menor número de operaciones.
 * 2. Si no es exacta, la aproximación matemáticamente más cercana.
 */

class CountdownSolver {
  /**
   * Resuelve el objetivo dado a partir de un array de números.
   * @param {number} target Cifra objetivo (ej: 482)
   * @param {number[]} numbers Fichas disponibles (ej: [25, 50, 75, 100, 3, 6])
   * @returns {{ exact: boolean, bestDiff: number, bestValue: number, steps: Array<{a:number, op:string, b:number, res:number, text:string}> }}
   */
  static solve(target, numbers) {
    let bestDiff = Math.abs(target - numbers[0]);
    let bestResult = numbers[0];
    let bestSteps = [];
    let exactFound = false;

    // Normalizar números válidos
    const initialNums = numbers.filter(n => typeof n === 'number' && n > 0);

    // Función recursiva de exploración
    function search(nums, steps) {
      // Evaluar cada número actual frente al target
      for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        const diff = Math.abs(target - val);

        if (diff < bestDiff || (diff === bestDiff && (!bestSteps.length || steps.length < bestSteps.length))) {
          bestDiff = diff;
          bestResult = val;
          bestSteps = [...steps];
          if (diff === 0) {
            exactFound = true;
          }
        }
      }

      // Si ya encontramos solución exacta y los pasos actuales superan o igualan a la mejor solución, podar
      if (exactFound && bestDiff === 0 && steps.length >= bestSteps.length) {
        return;
      }

      // Si solo queda 1 ficha, no se pueden hacer más operaciones
      if (nums.length < 2) return;

      // Probar todas las parejas ordenadas (i, j)
      const len = nums.length;
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          const a = nums[i];
          const b = nums[j];

          // Array con los números restantes excluyendo i y j
          const remaining = [];
          for (let k = 0; k < len; k++) {
            if (k !== i && k !== j) remaining.push(nums[k]);
          }

          // Probar las 4 operaciones (reglas clásicas: solo enteros positivos)
          
          // 1. Suma: a + b (conmutativa)
          {
            const res = a + b;
            const step = { a, op: '+', b, res, text: `${Math.max(a,b)} + ${Math.min(a,b)} = ${res}` };
            search([...remaining, res], [...steps, step]);
          }

          // 2. Multiplicación: a * b (conmutativa, evitar multiplicar por 1)
          if (a !== 1 && b !== 1) {
            const res = a * b;
            const step = { a, op: '×', b, res, text: `${Math.max(a,b)} × ${Math.min(a,b)} = ${res}` };
            search([...remaining, res], [...steps, step]);
          }

          // 3. Resta: mayor - menor (no permitir resultado <= 0)
          if (a > b) {
            const res = a - b;
            const step = { a, op: '−', b, res, text: `${a} − ${b} = ${res}` };
            search([...remaining, res], [...steps, step]);
          } else if (b > a) {
            const res = b - a;
            const step = { a: b, op: '−', b: a, res, text: `${b} − ${a} = ${res}` };
            search([...remaining, res], [...steps, step]);
          }

          // 4. División exacta: mayor / menor (entero sin resto, divisor > 1)
          if (b > 1 && a % b === 0) {
            const res = a / b;
            const step = { a, op: '÷', b, res, text: `${a} ÷ ${b} = ${res}` };
            search([...remaining, res], [...steps, step]);
          } else if (a > 1 && b % a === 0) {
            const res = b / a;
            const step = { a: b, op: '÷', b: a, res, text: `${b} ÷ ${a} = ${res}` };
            search([...remaining, res], [...steps, step]);
          }
        }
      }
    }

    search(initialNums, []);

    return {
      exact: exactFound && bestDiff === 0,
      bestDiff,
      bestValue: bestResult,
      steps: bestSteps
    };
  }
}

if (typeof window !== 'undefined') {
  window.CountdownSolver = CountdownSolver;
}
