import React from 'react';
import BasicText from './basic-text.jsx';
import CustomCharLimit from './custom-char-limit.jsx';
import ReadMoreToggle from './read-more-toggle.jsx';
import MultilineText from './multiline-text.jsx';
import UrlLinkification from './url-linkification.jsx';
import EmptyAndEdgeCases from './empty-and-edge-cases.jsx';
import AllPropsCombined from './all-props-combined.jsx';

export default function App() {
  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>react-simple-read-more demos</h1>

      <section>
        <h2>Basic Text</h2>
        <BasicText />
      </section>

      <section>
        <h2>Custom Char Limit</h2>
        <CustomCharLimit />
      </section>

      <section>
        <h2>Read More Toggle</h2>
        <ReadMoreToggle />
      </section>

      <section>
        <h2>Multiline Text</h2>
        <MultilineText />
      </section>

      <section>
        <h2>URL Linkification</h2>
        <UrlLinkification />
      </section>

      <section>
        <h2>Empty and Edge Cases</h2>
        <EmptyAndEdgeCases />
      </section>

      <section>
        <h2>All Props Combined</h2>
        <AllPropsCombined />
      </section>
    </div>
  );
}
