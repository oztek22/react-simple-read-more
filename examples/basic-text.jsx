import React from 'react';
import StringParser from '../src/string-parser.jsx';

const SAMPLE_TEXT =
  'React makes it simple to build dynamic user interfaces by breaking the UI into ' +
  'reusable components. Each component manages its own state and renders based on props, ' +
  'making complex applications easier to reason about and maintain over time. Components ' +
  'can be composed together to build rich, interactive web experiences.';

export default function BasicTextExample() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Basic Text</h2>
      <p style={{ color: '#555', fontSize: 14 }}>
        Only the <code>text</code> prop is set. <code>charLimit</code> defaults to 200
        and <code>breakOn</code> is omitted.
      </p>
      <StringParser text={SAMPLE_TEXT} />
    </div>
  );
}
