const { buildHierarchies } = require('./treeBuilder');

describe('treeBuilder service', () => {
  it('should correctly build trees and compute depths for non-cyclic components', () => {
    const adjacencyList = new Map([
      ['A', ['B', 'C']],
      ['B', ['D']],
      ['C', ['E']],
      ['D', []],
      ['E', ['F']],
      ['F', []],
      ['P', ['Q']],
      ['Q', ['R']],
      ['R', []],
      ['G', ['H', 'I']],
      ['H', []],
      ['I', []]
    ]);

    const components = [
      { root: 'A', nodes: new Set(['A', 'B', 'C', 'D', 'E', 'F']), isCyclic: false },
      { root: 'P', nodes: new Set(['P', 'Q', 'R']), isCyclic: false },
      { root: 'G', nodes: new Set(['G', 'H', 'I']), isCyclic: false }
    ];

    const result = buildHierarchies(components, adjacencyList);

    expect(result).toEqual([
      {
        root: 'A',
        tree: { A: { B: { D: {} }, C: { E: { F: {} } } } },
        depth: 4 // A->C->E->F
      },
      {
        root: 'P',
        tree: { P: { Q: { R: {} } } },
        depth: 3
      },
      {
        root: 'G',
        tree: { G: { H: {}, I: {} } },
        depth: 2
      }
    ]);
  });

  it('should return empty tree and has_cycle for cyclic components', () => {
    const adjacencyList = new Map([
      ['X', ['Y']],
      ['Y', ['Z']],
      ['Z', ['X']]
    ]);

    const components = [
      { root: 'X', nodes: new Set(['X', 'Y', 'Z']), isCyclic: true }
    ];

    const result = buildHierarchies(components, adjacencyList);

    expect(result).toEqual([
      {
        root: 'X',
        tree: {},
        has_cycle: true
      }
    ]);
  });
});
