import React from 'react';
import StringParser from '../src/string-parser.jsx';

// 400 characters, zero spaces — triggers the known charLimit bug.
// createTextArr splits by finding spaces; when none exist, splitIndex walks
// to the end of the string without finding ' ', so tempArr[0] never shrinks
// below charLimit and the while-loop exits only when tempArr[0] === cmptext
// (unchanged), meaning the full unsplit word is kept as a single chunk.
//
// Expected: the string should be split at charLimit characters even without
//           a space boundary, producing a truncated first chunk and a
//           "Read More" button.
// Actual:   the entire 400-character string is treated as one chunk and
//           rendered in full with no truncation.
const NO_SPACE_STRING = 'a'.repeat(400);

const CASES = [
  {
    label: 'Empty string',
    text: '',
    charLimit: 200,
    note: 'text=""  — component renders nothing (empty array from createTextArr)',
  },
  {
    label: 'Whitespace-only string',
    text: '     ',
    charLimit: 200,
    note: 'text is spaces only — split("\\n") yields one whitespace line, rendered as a spacer div',
  },
  {
    label: 'Single word shorter than charLimit',
    text: 'Hello',
    charLimit: 200,
    note: 'text.length (5) < charLimit (200) — no splitting needed, rendered as-is',
  },
  {
    label: '400-char string with no spaces (charLimit bug)',
    text: NO_SPACE_STRING,
    charLimit: 200,
    note: 'Known bug: no space found, so the full 400-char chunk is kept unsplit',
    isBugCase: true,
  },
];

export default function EmptyAndEdgeCasesExample() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2>Empty &amp; Edge Cases</h2>
      <p style={{ color: '#555', fontSize: 14 }}>
        Four edge-case inputs. The last demonstrates a known bug where a string
        longer than <code>charLimit</code> but containing no spaces is not
        truncated.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {CASES.map(({ label, text, charLimit, note, isBugCase }) => (
          <div
            key={label}
            style={{
              border: `1px solid ${isBugCase ? '#e57373' : '#ddd'}`,
              borderRadius: 6,
              padding: 16,
              background: isBugCase ? '#fff8f8' : '#fff',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: isBugCase ? '#c62828' : '#888',
                marginBottom: 4,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: 12, color: '#999', marginBottom: 10 }}>
              {note}
            </div>
            <div
              style={{
                background: '#f5f5f5',
                borderRadius: 4,
                padding: 12,
                /* overflow-wrap prevents the no-space bug case from blowing out layout */
                overflowWrap: 'break-word',
              }}
            >
              <StringParser text={text} charLimit={charLimit} breakOn={1} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
