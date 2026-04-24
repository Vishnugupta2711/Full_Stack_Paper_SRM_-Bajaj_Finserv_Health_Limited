const { buildGraph, findComponents } = require('./graphBuilder');

describe('graphBuilder service', () => {
  it('should build graph and detect duplicates / diamonds', () => {
    const validPairs = [
      { parent: 'A', child: 'B', raw: 'A->B' },
      { parent: 'A', child: 'C', raw: 'A->C' },
      { parent: 'B', child: 'D', raw: 'B->D' },
      { parent: 'E', child: 'D', raw: 'E->D' }, // diamond -> D already claimed by B
      { parent: 'G', child: 'H', raw: 'G->H' },
      { parent: 'G', child: 'H', raw: 'G->H' }, // duplicate
      { parent: 'G', child: 'H', raw: 'G->H' }, // duplicate again (should only log once)
      { parent: 'G', child: 'I', raw: 'G->I' }
    ];

    const {
      adjacencyList,
      childOwner,
      allNodes,
      childNodes,
      duplicateEdges
    } = buildGraph(validPairs);

    expect(duplicateEdges).toEqual(['G->H']);
    expect(childOwner.get('D')).toBe('B');
    expect(childOwner.has('E')).toBe(false); // E has no parent
    
    expect(adjacencyList.get('A')).toEqual(['B', 'C']);
    expect(adjacencyList.get('B')).toEqual(['D']);
    expect(adjacencyList.get('E')).toEqual([]); // E->D discarded
    
    expect(allNodes).toEqual(new Set(['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I']));
    expect(childNodes).toEqual(new Set(['B', 'C', 'D', 'H', 'I']));
  });

  it('should find connected components correctly including pure cycles', () => {
    const adjacencyList = new Map([
      ['A', ['B']],
      ['B', []],
      ['X', ['Y']],
      ['Y', ['Z']],
      ['Z', ['X']] // pure cycle
    ]);
    const allNodes = new Set(['A', 'B', 'X', 'Y', 'Z']);
    const childNodes = new Set(['B', 'Y', 'Z', 'X']); // X is a child because Z->X

    const components = findComponents(adjacencyList, allNodes, childNodes);

    expect(components).toHaveLength(2);
    
    // Component 1 (Tree)
    expect(components[0].root).toBe('A');
    expect(components[0].nodes).toEqual(new Set(['A', 'B']));
    
    // Component 2 (Cycle)
    expect(components[1].root).toBe('X'); // X is lex smallest in X, Y, Z
    expect(components[1].nodes).toEqual(new Set(['X', 'Y', 'Z']));
  });
});
