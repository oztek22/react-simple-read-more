import { createTextArr } from './createTextArr.js';

describe('createTextArr', () => {
  describe('short text under charLimit', () => {
    it('returns a single chunk with newLine true', () => {
      expect(createTextArr('hello', 200)).toEqual([
        { text: 'hello', newLine: true },
      ]);
    });

    it('returns empty array for empty string', () => {
      expect(createTextArr('', 200)).toEqual([]);
    });
  });

  describe('text exactly at charLimit', () => {
    it('returns a single unsplit chunk', () => {
      const text = 'a'.repeat(200);
      expect(createTextArr(text, 200)).toEqual([{ text, newLine: true }]);
    });
  });

  describe('text split across multiple charLimit-sized chunks', () => {
    it('splits into two chunks when one word boundary fits within charLimit', () => {
      // 'hello world' length=11, charLimit=5:
      // binary split at index 5 (space) → ['hello', ' world']
      expect(createTextArr('hello world', 5)).toEqual([
        { text: 'hello', newLine: false },
        { text: ' world', newLine: true },
      ]);
    });

    it('splits into more than two chunks for longer text', () => {
      // 'aa bb cc dd ee ff' length=17, charLimit=5:
      // iteration 1 splits at index 8 (space) → ['aa bb cc', ' dd ee ff']
      // iteration 2 splits each half at nearest space →
      //   ['aa bb', ' cc', ' dd ee', ' ff']
      expect(createTextArr('aa bb cc dd ee ff', 5)).toEqual([
        { text: 'aa bb', newLine: false },
        { text: ' cc', newLine: false },
        { text: ' dd ee', newLine: false },
        { text: ' ff', newLine: true },
      ]);
    });
  });

  describe('edge cases', () => {
    it('returns a single chunk for a string of only spaces under charLimit', () => {
      expect(createTextArr('   ', 200)).toEqual([
        { text: '   ', newLine: true },
      ]);
    });

    it('single word longer than charLimit with no spaces — appends empty trailing chunk (known broken behaviour)', () => {
      // TODO: correct output should be [{ text: 'abcdef', newLine: true }]
      // The algorithm walks splitIndex off the end, falls back to appending '' as a second chunk.
      expect(createTextArr('abcdef', 3)).toEqual([
        { text: 'abcdef', newLine: false },
        { text: '', newLine: true },
      ]);
    });

    it('multi-line input where one line has no spaces — that line appends an empty trailing chunk (known broken behaviour)', () => {
      // TODO: correct output for the second line is { text: 'abcdef', newLine: true } with no empty chunk.
      // The algorithm cannot find a space in 'abcdef' and appends '' as a split result.
      expect(createTextArr('hello\nabcdef', 5)).toEqual([
        { text: 'hello', newLine: true },
        { text: 'abcdef', newLine: false },
        { text: '', newLine: true },
      ]);
    });

    it('charLimit of 0 — any text exceeds limit and appends empty trailing chunk (known broken behaviour)', () => {
      // TODO: correct output is [{ text: 'hello', newLine: true }] — no split point exists.
      // The guard condition `tempText.length > charLimit` is immediately satisfied for any non-empty text,
      // but the inner while exits early because tempText is shortened to length 2 which is still > 0 but
      // the no-space walk pushes splitIndex off the end, leaving an empty second chunk.
      expect(createTextArr('hello', 0)).toEqual([
        { text: 'hello', newLine: false },
        { text: '', newLine: true },
      ]);
    });

    it('charLimit of 1 — word without spaces appends empty trailing chunk (known broken behaviour)', () => {
      // TODO: correct output is [{ text: 'hi', newLine: true }].
      // splitIndex walks off the end of 'hi' and an empty string is appended.
      expect(createTextArr('hi', 1)).toEqual([
        { text: 'hi', newLine: false },
        { text: '', newLine: true },
      ]);
    });

    it('charLimit of 1 — two-char string with a space splits correctly', () => {
      // midpoint of 'a b' (length 3) is 1.5; charAt(1) === ' ' so split is found immediately.
      expect(createTextArr('a b', 1)).toEqual([
        { text: 'a', newLine: false },
        { text: ' b', newLine: true },
      ]);
    });
  });
});
