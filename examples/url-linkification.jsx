import React from 'react';
import StringParser from '../src/string-parser.jsx';

// All three URL forms that linkify-react recognises:
//   1. https:// plain URL
//   2. www-prefixed URL (no scheme)
//   3. email address
const SAMPLE_TEXT =
  'Visit the React docs at https://react.dev for guides and API references. ' +
  'The legacy site is still available at www.reactjs.org if you need older content. ' +
  'Questions? Email the maintainers at react-core@meta.com and someone will get back to you.';

export default function UrlLinkificationExample() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>URL Linkification</h2>
      <p style={{ color: '#555', fontSize: 14 }}>
        The text below contains three link forms detected by{' '}
        <a href="https://linkify.js.org" target="_blank" rel="noreferrer">
          linkify-react
        </a>
        : a plain <code>https://</code> URL, a <code>www.</code>-prefixed URL, and an
        email address. All three become clickable <code>&lt;a&gt;</code> elements that
        open in a new tab (<code>target=&quot;_blank&quot;</code>).
      </p>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: 4,
          padding: '12px 16px',
          background: '#fafafa',
        }}
      >
        {/* charLimit set high enough that no truncation occurs, keeping all URLs visible */}
        <StringParser text={SAMPLE_TEXT} charLimit={500} />
      </div>
    </div>
  );
}
