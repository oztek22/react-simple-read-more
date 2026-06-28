import React from 'react';
import StringParser from '../src/string-parser.jsx';

// Text that exercises every feature at once:
//   - newlines  → multiline rendering via the \n branch
//   - a URL      → linkify-react converts it to an <a> tag
//   - length >100 chars × 3 chunks  → breakOn=3 triggers truncation + Read More
const COMBINED_TEXT =
  'First line: visit https://example.com for full documentation and release notes.\n' +
  'Second line: components let you split the UI into independent, reusable pieces and think about each in isolation.\n' +
  'Third line: props flow down from parent to child, while callbacks let children communicate back up the tree.';

export default function AllPropsCombinedExample() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>All Props Combined</h2>
      <p style={{ color: '#555', fontSize: 14 }}>
        A single <code>StringParser</code> with every prop set explicitly:
      </p>
      <ul style={{ color: '#555', fontSize: 14, lineHeight: 1.8 }}>
        <li>
          <code>text</code> — three <code>\n</code>-separated lines; line 1 contains a
          plain <code>https://</code> URL that is auto-linked.
        </li>
        <li>
          <code>charLimit=100</code> — each line is split into ~100-character chunks before
          rendering.
        </li>
        <li>
          <code>breakOn=3</code> — content after the third rendered chunk is hidden behind
          a <em>…Read More</em> toggle.
        </li>
      </ul>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: 4,
          padding: '12px 16px',
          background: '#fafafa',
        }}
      >
        <StringParser
          text={COMBINED_TEXT}
          charLimit={100}
          breakOn={3}
        />
      </div>
    </div>
  );
}
