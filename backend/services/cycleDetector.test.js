const { detectCycles } = require('./cycleDetector');

describe('cycleDetector service', () => {
  it('should correctly identify tree vs cycle components', () => {
    const adjacencyList = new Map([
      ['A', ['B', 'C']],
      ['B', ['D']],
      ['C', ['E']],
      ['D', []],
      ['E', ['F']],
      ['F', []],
      ['X', ['Y']],
      ['Y', ['Z']],
      ['Z', ['X']],
      ['P', ['Q']],
      ['Q', ['R']],
      ['R', []],
      ['G', ['H', 'I']],
      ['H', []],
      ['I', []],
      ['S', ['T']],
      ['T', ['U']],
      ['U', ['T']] // mixed tree and cycle
    ]);

    const components = [
      { root: 'A', nodes: new Set(['A', 'B', 'C', 'D', 'E', 'F']) },
      { root: 'X', nodes: new Set(['X', 'Y', 'Z']) },
      { root: 'P', nodes: new Set(['P', 'Q', 'R']) },
      { root: 'G', nodes: new Set(['G', 'H', 'I']) },
      { root: 'S', nodes: new Set(['S', 'T', 'U']) }
    ];

    const result = detectCycles(components, adjacencyList);

    expect(result).toEqual([
      { root: 'A', nodes: new Set(['A', 'B', 'C', 'D', 'E', 'F']), isCyclic: false },
      { root: 'X', nodes: new Set(['X', 'Y', 'Z']), isCyclic: true },
      { root: 'P', nodes: new Set(['P', 'Q', 'R']), isCyclic: false },
      { root: 'G', nodes: new Set(['G', 'H', 'I']), isCyclic: false },
      { root: 'S', nodes: new Set(['S', 'T', 'U']), isCyclic: true }
    ]);
  });

  it('should NOT report cycle for a diamond graph', () => {
    // Diamond: A->B, A->C, B->D, C->D. This is not a cycle!
    // But since D is a child of B in childOwner (from phase 2), the graphBuilder
    // actually prevents diamonds from being in adjacencyList.
    // However, if we test detectCycles directly with a diamond adjacencyList:
    const diamondAdj = new Map([
      ['A', ['B', 'C']],
      ['B', ['D']],
      ['C', ['D']],
      ['D', []]
    ]);

    const components = [
      { root: 'A', nodes: new Set(['A', 'B', 'C', 'D']) }
    ];

    const result = detectCycles(components, diamondAdj);

    expect(result[0].isCyclic).toBe(false);
  });
});
