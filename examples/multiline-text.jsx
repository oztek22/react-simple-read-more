import React from 'react';
import StringParser from '../src/string-parser.jsx';

// Five paragraphs separated by \n; paragraph 3 is intentionally empty.
// The empty paragraph renders as a blank-line spacer <div style={{ height: 10 }}>.
// Paragraphs that exceed charLimit are split into chunks: only the last chunk
// in each paragraph gets newLine=true (triggering the trailing <div> line-break);
// mid-paragraph continuation chunks have newLine=false and render without one.
const MULTILINE_TEXT =
  'First paragraph: React components are the building blocks of any React application. ' +
  'They let you split the UI into independent, reusable pieces and think about each piece in isolation.\n' +
  'Second paragraph: Props flow down from parent to child, while callbacks let children communicate ' +
  'back up. This one-way data flow keeps state predictable and components easy to test.\n' +
  '\n' +
  'Fourth paragraph (after the blank line): The empty line above this paragraph is rendered as a ' +
  '10 px spacer div — demonstrating the blank-line branch inside StringParser.\n' +
  'Fifth paragraph: State and lifecycle methods (or hooks) allow components to react to user input ' +
  'and side-effects, making interfaces dynamic without manual DOM manipulation.';

export default function MultilineTextExample() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Multiline Text</h2>
      <p style={{ color: '#555', fontSize: 14 }}>
        The <code>text</code> prop contains five <code>\n</code>-separated paragraphs,
        including one <strong>empty paragraph</strong> (paragraph 3). The empty paragraph
        is rendered as a 10 px spacer <code>&lt;div&gt;</code>. Long paragraphs that exceed
        <code> charLimit</code> are split into chunks; only the final chunk of each paragraph
        receives <code>newLine=true</code>, which appends the trailing line-break{' '}
        <code>&lt;div&gt;</code>.
      </p>

      <h3 style={{ marginBottom: 4 }}>Without breakOn (full text, newLine behaviour visible)</h3>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: 4,
          padding: '12px 16px',
          marginBottom: 24,
          background: '#fafafa',
        }}
      >
        <StringParser text={MULTILINE_TEXT} charLimit={120} />
      </div>

      <h3 style={{ marginBottom: 4 }}>With breakOn=3 (truncated after third chunk)</h3>
      <p style={{ color: '#555', fontSize: 14 }}>
        Setting <code>breakOn=3</code> hides content after the third rendered chunk and
        shows a <em>…Read More</em> trigger.
      </p>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: 4,
          padding: '12px 16px',
          background: '#fafafa',
        }}
      >
        <StringParser text={MULTILINE_TEXT} charLimit={120} breakOn={3} />
      </div>
    </div>
  );
}
