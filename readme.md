# react-simple-read-more

[![npm version](https://img.shields.io/npm/v/react-simple-read-more.svg)](https://www.npmjs.com/package/react-simple-read-more)
[![license](https://img.shields.io/npm/l/react-simple-read-more.svg)](LICENSE)

A lightweight React component that truncates long text into readable chunks and hides the overflow behind a **Read More / Read Less** toggle. URLs and email addresses in the text are automatically converted to clickable links.

## Features

- **Chunk-based truncation** — splits text into segments of up to `charLimit` characters; content beyond the `breakOn`-th chunk is hidden until the user expands it.
- **Read More / Read Less toggle** — a single `…Read More` span is injected after the last visible chunk; clicking it reveals the rest and shows a `Read Less` control.
- **Multiline text** — newline (`\n`) characters in the source string are preserved: each line is split independently and rendered as a separate block.
- **Automatic link detection** — plain `https://` URLs, `www.`-prefixed URLs, and email addresses are converted to `<a target="_blank">` elements via [linkify-react](https://linkify.js.org).
- **Zero configuration** — only the `text` prop is required; `charLimit` and `breakOn` have sensible defaults so you can drop the component in with a single prop.

## Installation

```bash
npm install react-simple-read-more
```

This package requires the following peer dependencies:

```bash
npm install react react-dom linkify-react
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | **(Required)** The text to display. Newlines (`\n`) are supported. |
| `charLimit` | `number` | `200` | Maximum number of characters per rendered chunk. |
| `breakOn` | `number` | `Infinity` | Chunk index after which remaining content is hidden behind the Read More toggle. Omit (or leave at the default) to show all chunks without a toggle. |

## Usage

### Basic — text truncation with `breakOn`

Set `breakOn` to the chunk index after which content should be hidden behind a **…Read More** toggle.

```jsx
import StringParser from 'react-simple-read-more';

const text =
  'React makes it simple to build dynamic user interfaces by breaking the UI into ' +
  'reusable components. Each component manages its own state and renders based on props, ' +
  'making complex applications easier to reason about and maintain over time. Components ' +
  'can be composed together to build rich, interactive web experiences.';

function App() {
  return <StringParser text={text} charLimit={100} breakOn={2} />;
}
```

### Custom character limit

Control how wide each chunk is with `charLimit`. The same text rendered with different limits produces more or fewer chunks before the toggle fires.

```jsx
import StringParser from 'react-simple-read-more';

function App() {
  return <StringParser text={longText} charLimit={100} />;
}
```

### URL auto-linkification

URLs and email addresses in `text` are auto-linked — no extra configuration needed. Three forms are recognised: plain `https://` URLs, `www.`-prefixed URLs, and email addresses.

```jsx
import StringParser from 'react-simple-read-more';

const text =
  'Visit the React docs at https://react.dev for guides and API references. ' +
  'The legacy site is still available at www.reactjs.org if you need older content. ' +
  'Questions? Email the maintainers at react-core@meta.com.';

function App() {
  return <StringParser text={text} charLimit={500} />;
}
```

### All props combined

A single component exercising every feature: multiline text with `\n`, a plain `https://` URL that is auto-linked, `charLimit` to control chunk width, and `breakOn` to trigger the Read More toggle.

```jsx
import StringParser from 'react-simple-read-more';

const text =
  'First line: visit https://example.com for full documentation and release notes.\n' +
  'Second line: components let you split the UI into independent, reusable pieces.\n' +
  'Third line: props flow down from parent to child; callbacks let children communicate back up.';

function App() {
  return <StringParser text={text} charLimit={100} breakOn={3} />;
}
```

## Examples

The [`examples/`](https://github.com/oztek22/react-simple-read-more/tree/master/examples) directory contains runnable demos covering basic truncation, custom character limits, URL linkification, multiline text, the Read More toggle, and a combined all-props showcase.

To run the examples locally:

```bash
npm install
npm run examples
```

This starts a Parcel dev server at **http://localhost:1234**. The page hot-reloads as you edit any file under `examples/`.

## License

ISC
