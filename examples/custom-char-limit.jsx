import React from 'react';
import StringParser from '../src/string-parser.jsx';

const SAMPLE_TEXT =
  'React makes it simple to build dynamic user interfaces by breaking the UI into ' +
  'reusable components. Each component manages its own state and renders based on props, ' +
  'making complex applications easier to reason about and maintain over time. Components ' +
  'can be composed together to build rich, interactive web experiences with surprisingly ' +
  'little boilerplate, letting teams iterate quickly and ship features with confidence.';

const LIMITS = [50, 150, 500];

export default function CustomCharLimitExample() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2>Custom charLimit</h2>
      <p style={{ color: '#555', fontSize: 14 }}>
        The same text rendered with <code>charLimit</code> set to 50, 150, and 500.
      </p>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {LIMITS.map((limit) => (
          <div
            key={limit}
            style={{
              flex: 1,
              border: '1px solid #ddd',
              borderRadius: 6,
              padding: 16,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#888',
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              charLimit={limit}
            </div>
            <StringParser text={SAMPLE_TEXT} charLimit={limit} />
          </div>
        ))}
      </div>
    </div>
  );
}
