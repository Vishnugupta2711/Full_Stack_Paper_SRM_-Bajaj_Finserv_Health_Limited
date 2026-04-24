const { generateSummary } = require('./summarizer');

describe('summarizer service', () => {
  it('should generate summary correctly according to the example', () => {
    const hierarchies = [
      { root: 'A', tree: { A: { B: { D: {} }, C: { E: { F: {} } } } }, depth: 4 },
      { root: 'X', tree: {}, has_cycle: true },
      { root: 'P', tree: { P: { Q: { R: {} } } }, depth: 3 },
      { root: 'G', tree: { G: { H: {}, I: {} } }, depth: 2 }
    ];

    const summary = generateSummary(hierarchies);

    expect(summary).toEqual({
      total_trees: 3,
      total_cycles: 1,
      largest_tree_root: 'A'
    });
  });

  it('should handle tiebreak properly (lexicographically smaller)', () => {
    const hierarchies = [
      { root: 'P', tree: {}, depth: 4 },
      { root: 'A', tree: {}, depth: 4 } // A comes after but should win
    ];

    const summary = generateSummary(hierarchies);

    expect(summary.largest_tree_root).toBe('A');
  });

  it('should handle no trees correctly', () => {
    const hierarchies = [
      { root: 'X', tree: {}, has_cycle: true }
    ];

    const summary = generateSummary(hierarchies);

    expect(summary).toEqual({
      total_trees: 0,
      total_cycles: 1,
      largest_tree_root: ''
    });
  });
});
