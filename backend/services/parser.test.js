// backend/services/parser.test.js
const { parseInput } = require('./parser');

describe('parser service', () => {
  it('should parse valid edges correctly', () => {
    const input = ['A->B', ' B->C ', 'C->D'];
    const result = parseInput(input);

    expect(result.invalidEntries).toEqual([]);
    expect(result.validPairs).toEqual([
      { parent: 'A', child: 'B', raw: 'A->B' },
      { parent: 'B', child: 'C', raw: 'B->C' },
      { parent: 'C', child: 'D', raw: 'C->D' }
    ]);
  });

  it('should identify self-loops as invalid', () => {
    const input = ['A->A', 'A->B'];
    const result = parseInput(input);

    expect(result.invalidEntries).toEqual(['A->A']);
    expect(result.validPairs).toEqual([
      { parent: 'A', child: 'B', raw: 'A->B' }
    ]);
  });

  it('should reject invalid formats', () => {
    const input = [
      'a->b',     // lowercase
      'AB->C',    // multi-char
      'A-B',      // wrong separator
      'A->',      // missing child
      '',         // empty
      ' A -> B ', // spaces inside
      'A->B->C'   // multiple arrows
    ];
    const result = parseInput(input);

    const expectedInvalid = input.map(i => i.trim());
    expect(result.invalidEntries).toEqual(expectedInvalid);
    expect(result.validPairs).toEqual([]);
  });

  it('should handle non-array and non-string inputs safely', () => {
    expect(parseInput(null)).toEqual({ validPairs: [], invalidEntries: [] });
    
    const input = [123, null, undefined, {}, 'A->B'];
    const result = parseInput(input);
    
    expect(result.invalidEntries).toEqual(['123', 'null', 'undefined', '[object Object]']);
    expect(result.validPairs).toEqual([
      { parent: 'A', child: 'B', raw: 'A->B' }
    ]);
  });
});
