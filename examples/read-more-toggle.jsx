import React from 'react';
import StringParser from '../src/string-parser.jsx';

// Ten newline-separated lines, each well under the default charLimit of 200,
// so createTextArr produces exactly 10 chunks. With breakOn=2 the component
// shows lines 0-1, renders "...Read More" at index 2, and hides lines 3-9
// until the user clicks to expand (which then shows "...Show less").
const SAMPLE_TEXT = [
  'The quick brown fox jumps over the lazy dog.',
  'A journey of a thousand miles begins with a single step.',
  'All that glitters is not gold, but silver has its own appeal.',
  'To be or not to be — that is the question every person must answer.',
  'Actions speak louder than words, so always choose deeds over talk.',
  'Every cloud has a silver lining if you look hard enough.',
  'The pen is mightier than the sword in the hands of a skilled writer.',
  'Practice makes perfect, but nobody is perfect, so why practice?',
  'Time flies like an arrow; fruit flies like a banana.',
  'In the middle of difficulty lies opportunity for those who seek it.',
].join('\n');

export default function ReadMoreToggle() {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Read More / Show Less Toggle</h2>
      <p style={{ color: '#555', fontSize: 13 }}>
        Ten-line text with <code>breakOn=2</code>. Lines 0–1 are visible; line 2
        renders <strong>...Read More</strong>. Clicking expands all lines and shows{' '}
        <strong>...Show less</strong>.
      </p>
      <StringParser text={SAMPLE_TEXT} breakOn={2} />
    </div>
  );
}
