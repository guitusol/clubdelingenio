/**
 * DEDUCCIÓN LÓGICA — Motor de Matriz Lógica Cruzada (Grid Logic Engine)
 */

class GridLogicEngine {
  constructor(caseData) {
    this.caseData = caseData;
    this.categories = caseData.categories;
    // Map de celdas: clave "catA_itemA:catB_itemB" -> 0 (vacio), 1 (cruz X), 2 (check V)
    this.cells = new Map();
    this.autoCrossEnabled = true;
    this.init();
  }

  init() {
    this.cells.clear();
  }

  getCellKey(catAId, itemAId, catBId, itemBId) {
    // Ordenar categorías alfabéticamente para clave canónica bidireccional
    if (catAId > catBId) {
      return `${catBId}_${itemBId}:${catAId}_${itemAId}`;
    }
    return `${catAId}_${itemAId}:${catBId}_${itemBId}`;
  }

  getCellValue(catAId, itemAId, catBId, itemBId) {
    const key = this.getCellKey(catAId, itemAId, catBId, itemBId);
    return this.cells.get(key) || 0;
  }

  setCellValue(catAId, itemAId, catBId, itemBId, value) {
    const key = this.getCellKey(catAId, itemAId, catBId, itemBId);
    this.cells.set(key, value);

    // Si se marca un Check (2), tachar automáticamente la fila y columna en esa sub-matriz
    if (value === 2 && this.autoCrossEnabled) {
      this.autoCrossRowAndCol(catAId, itemAId, catBId, itemBId);
      this.propagateTransitive(catAId, itemAId, catBId, itemBId);
    }
  }

  cycleCellValue(catAId, itemAId, catBId, itemBId) {
    const current = this.getCellValue(catAId, itemAId, catBId, itemBId);
    // Ciclo: 0 (vacío) -> 1 (❌ cruz) -> 2 (✔️ check) -> 0 (vacío)
    const nextVal = (current + 1) % 3;
    this.setCellValue(catAId, itemAId, catBId, itemBId, nextVal);
    return nextVal;
  }

  autoCrossRowAndCol(catAId, itemAId, catBId, itemBId) {
    const catA = this.categories.find(c => c.id === catAId);
    const catB = this.categories.find(c => c.id === catBId);
    if (!catA || !catB) return;

    // Tachar otras casillas de la misma fila (mismo itemA, diferentes itemB)
    catB.items.forEach(otherB => {
      if (otherB.id !== itemBId) {
        const k = this.getCellKey(catAId, itemAId, catBId, otherB.id);
        if (this.cells.get(k) !== 2) {
          this.cells.set(k, 1);
        }
      }
    });

    // Tachar otras casillas de la misma columna (mismo itemB, diferentes itemA)
    catA.items.forEach(otherA => {
      if (otherA.id !== itemAId) {
        const k = this.getCellKey(catAId, otherA.id, catBId, itemBId);
        if (this.cells.get(k) !== 2) {
          this.cells.set(k, 1);
        }
      }
    });
  }

  propagateTransitive(catAId, itemAId, catBId, itemBId) {
    // Si A=B, y existe C tal que B=C, entonces A=C
    const otherCats = this.categories.filter(c => c.id !== catAId && c.id !== catBId);

    otherCats.forEach(catC => {
      catC.items.forEach(itemC => {
        // ¿B está conectado con C?
        const bToC = this.getCellValue(catBId, itemBId, catC.id, itemC.id);
        if (bToC === 2) {
          this.cells.set(this.getCellKey(catAId, itemAId, catC.id, itemC.id), 2);
          this.autoCrossRowAndCol(catAId, itemAId, catC.id, itemC.id);
        } else if (bToC === 1) {
          const aToCKey = this.getCellKey(catAId, itemAId, catC.id, itemC.id);
          if (this.cells.get(aToCKey) !== 2) {
            this.cells.set(aToCKey, 1);
          }
        }
      });
    });
  }

  /**
   * Comprueba si el jugador ha completado correctamente la reconstrucción del caso.
   * @returns {{ completed: boolean, hasErrors: boolean, correctCount: number, totalNeeded: number, errors: string[] }}
   */
  evaluateSolution() {
    const sol = this.caseData.solution;
    const cat0 = this.categories[0]; // Categoría ancla (personaje o sospechoso)
    const otherCats = this.categories.slice(1);

    let totalNeeded = 0;
    let correctCount = 0;
    let hasErrors = false;
    const errorDetails = [];

    cat0.items.forEach(p => {
      const expectedAssignments = sol[p.id];
      if (!expectedAssignments) return;

      otherCats.forEach(cat => {
        totalNeeded++;
        const targetItemId = expectedAssignments[cat.id];
        if (!targetItemId) return;

        const cellVal = this.getCellValue(cat0.id, p.id, cat.id, targetItemId);
        if (cellVal === 2) {
          correctCount++;
        } else if (cellVal === 1) {
          hasErrors = true;
          errorDetails.push(`Has descartado incorrectamente la relación entre ${p.name_es} y ${cat.name_es}`);
        }
      });
    });

    const isFullySolved = (correctCount === totalNeeded && !hasErrors);

    return {
      completed: isFullySolved,
      hasErrors,
      correctCount,
      totalNeeded,
      errors: errorDetails
    };
  }

  resetGrid() {
    this.cells.clear();
  }
}

if (typeof window !== 'undefined') {
  window.GridLogicEngine = GridLogicEngine;
}
