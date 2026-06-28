import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StringParser, { createTextArr } from './string-parser';

jest.mock('linkify-react', () => {
  const React = require('react');
  const MockLinkify = ({ children }) => React.createElement(React.Fragment, null, children);
  return { __esModule: true, default: MockLinkify };
});

// 240 chars with spaces — splits into multiple chunks at charLimit=50
const LONG_TEXT = 'hello world '.repeat(20);

describe('StringParser', () => {
  describe('renders truncated text by default', () => {
    it('shows only up to breakOn chunks when text produces more', () => {
      render(<StringParser text={LONG_TEXT} charLimit={50} breakOn={1} />);
      expect(screen.getByText(/Read More/i)).toBeInTheDocument();
    });

    it('shows all text when text fits within fewer chunks than breakOn', () => {
      render(<StringParser text="Short text" charLimit={200} breakOn={10} />);
      expect(screen.getByText('Short text')).toBeInTheDocument();
      expect(screen.queryByText(/Read More/i)).not.toBeInTheDocument();
    });
  });

  describe("'Read more' button", () => {
    it('is present when text exceeds charLimit and breakOn is reached', () => {
      render(<StringParser text={LONG_TEXT} charLimit={50} breakOn={1} />);
      expect(screen.getByText(/Read More/i)).toBeInTheDocument();
    });

    it('is absent when text is short enough to fit within charLimit', () => {
      render(<StringParser text="hello world" charLimit={200} breakOn={999} />);
      expect(screen.queryByText(/Read More/i)).not.toBeInTheDocument();
    });
  });

  describe("clicking 'Read more'", () => {
    it('reveals full text and removes Read More button', () => {
      render(<StringParser text={LONG_TEXT} charLimit={50} breakOn={1} />);
      fireEvent.click(screen.getByText(/Read More/i));
      expect(screen.queryByText(/Read More/i)).not.toBeInTheDocument();
    });

    it('shows Show less button after expanding', () => {
      render(<StringParser text={LONG_TEXT} charLimit={50} breakOn={1} />);
      fireEvent.click(screen.getByText(/Read More/i));
      expect(screen.getByText(/Show less/i)).toBeInTheDocument();
    });
  });

  describe("clicking 'Read less'", () => {
    it('collapses text back to truncated view', () => {
      render(<StringParser text={LONG_TEXT} charLimit={50} breakOn={1} />);
      fireEvent.click(screen.getByText(/Read More/i));
      fireEvent.click(screen.getByText(/Show less/i));
      expect(screen.getByText(/Read More/i)).toBeInTheDocument();
    });

    it('hides Show less button after collapsing', () => {
      render(<StringParser text={LONG_TEXT} charLimit={50} breakOn={1} />);
      fireEvent.click(screen.getByText(/Read More/i));
      fireEvent.click(screen.getByText(/Show less/i));
      expect(screen.queryByText(/Show less/i)).not.toBeInTheDocument();
    });
  });

  describe('charLimit prop', () => {
    it('triggers Read More when text is longer than charLimit', () => {
      render(<StringParser text={LONG_TEXT} charLimit={50} breakOn={1} />);
      expect(screen.getByText(/Read More/i)).toBeInTheDocument();
    });

    it('does not trigger Read More when text is shorter than charLimit', () => {
      render(<StringParser text="hello world" charLimit={200} breakOn={999} />);
      expect(screen.queryByText(/Read More/i)).not.toBeInTheDocument();
    });

    it('produces more chunks with a smaller charLimit', () => {
      const smallLimitChunks = createTextArr(LONG_TEXT, 20);
      const largeLimitChunks = createTextArr(LONG_TEXT, 200);
      expect(smallLimitChunks.length).toBeGreaterThan(largeLimitChunks.length);
    });
  });

  describe('empty text', () => {
    it('renders an empty wrapper div when text is an empty string', () => {
      const { container } = render(
        <StringParser text="" charLimit={200} breakOn={1} />
      );
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.queryByText(/Read More/i)).not.toBeInTheDocument();
    });

    it('renders an empty wrapper div when text is undefined', () => {
      const { container } = render(
        <StringParser charLimit={200} breakOn={1} />
      );
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.queryByText(/Read More/i)).not.toBeInTheDocument();
    });
  });

  describe('without breakOn prop', () => {
    it('renders all text and shows no Read More button when breakOn is omitted', () => {
      render(<StringParser text={LONG_TEXT} charLimit={50} />);
      expect(screen.queryByText(/Read More/i)).not.toBeInTheDocument();
    });

    it('renders no Show less button when breakOn is omitted', () => {
      render(<StringParser text={LONG_TEXT} charLimit={50} />);
      expect(screen.queryByText(/Show less/i)).not.toBeInTheDocument();
    });

    it('renders text content when breakOn is omitted', () => {
      render(<StringParser text="hello world" charLimit={200} />);
      expect(screen.getByText('hello world')).toBeInTheDocument();
    });
  });
});
