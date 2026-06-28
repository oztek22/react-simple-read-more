# Deprecated API Audit

Audit of `react-simple-read-more` v1.1.1 against React 18 compatibility.

## 1. `React.createClass`

| | |
|---|---|
| **File** | `src/string-parser.jsx:4` |
| **Status** | Removed in React 15.5 (moved to `create-react-class` package), unavailable from `react` in React 16+. |
| **Current code** | `const StringParser = React.createClass({ … })` |
| **Fix** | Rewrite as a function component using `useState` / `useEffect`, or use `class StringParser extends React.Component` with a constructor. Architecture decision: function component. |

---

## 2. `getInitialState`

| | |
|---|---|
| **File** | `src/string-parser.jsx:5–9` |
| **Status** | Exclusive to `React.createClass`. Removed along with it. |
| **Current code** | `getInitialState: function() { return { isMore: false, text: [] } }` |
| **Fix** | Replace with `const [isMore, setIsMore] = useState(false)` and `const [text, setText] = useState([])`. |

---

## 3. `getDefaultProps`

| | |
|---|---|
| **File** | `src/string-parser.jsx:11–14` |
| **Status** | Exclusive to `React.createClass`. Removed along with it. |
| **Current code** | `getDefaultProps: function() { return { charLimit: 200 } }` |
| **Fix** | Use ES default parameters in the function signature: `function StringParser({ charLimit = 200, … })`. |

---

## 4. `componentWillReceiveProps`

| | |
|---|---|
| **File** | `src/string-parser.jsx:19–22` |
| **Status** | Deprecated in React 16.3 (`UNSAFE_componentWillReceiveProps` alias added). **Hard-removed in React 18 strict mode** — triggers an error when `<StrictMode>` is active, and will produce console errors in production. |
| **Current code** | `componentWillReceiveProps: function(nextProp) { if(nextProp.text != this.props.text) { this.createTextArr(nextProp); } }` |
| **Fix** | Replace with a `useEffect` that lists `props.text` as a dependency: `useEffect(() => { setText(createTextArr(text, charLimit)); }, [text, charLimit])`. |

---

## 5. `react-linkify` v0.2.1 — React 18 incompatibilities

| | |
|---|---|
| **File** | `src/string-parser.jsx:2`, `package.json:24` |
| **Status** | **Multiple breaking incompatibilities with React 18.** |

### 5a. `properties` prop (removed in react-linkify ≥ 1.0)

```jsx
// Current usage (v0.2.1 API — line 86)
<Linkify properties={{ target: '_blank' }} target="_blank">
```

The `properties` prop was the v0.2.1 way to pass attributes to generated anchors. It was replaced by `componentDecorator` in v1.0 and is absent in modern alternatives. Passing both `properties` and `target` is redundant and produces a React warning.

### 5b. Legacy React internals

`react-linkify` v0.2.1 was last published in 2017. It relies on:
- `React.PropTypes` (removed in React 15.5)
- `React.createClass` internally
- The legacy string-ref / `ReactDOM.findDOMNode` path

All of these throw or silently malfunction under React 18's concurrent renderer.

### 5c. Peer dependency mismatch

`package.json` declares `"react": "^15.5.4"` as both a peer and dev dependency, targeting a version over 7 years old. React 18 introduced breaking changes to the rendering pipeline (automatic batching, concurrent features, new root API) that this component does not account for.

### Fix

Replace `react-linkify` with `linkify-react@4`. The declarative API shape is compatible:

```jsx
// Before (react-linkify v0.2.1)
import Linkify from 'react-linkify';
<Linkify properties={{ target: '_blank' }}>…</Linkify>

// After (linkify-react v4)
import Linkify from 'linkify-react';
<Linkify options={{ target: '_blank' }}>…</Linkify>
```

---

## Summary table

| API | Location | React version removed | Replacement |
|---|---|---|---|
| `React.createClass` | `string-parser.jsx:4` | React 16.0 | `function` component |
| `getInitialState` | `string-parser.jsx:5` | React 16.0 | `useState` |
| `getDefaultProps` | `string-parser.jsx:11` | React 16.0 | ES default parameters |
| `componentWillReceiveProps` | `string-parser.jsx:19` | React 18 strict | `useEffect` with dep array |
| `react-linkify` v0.2.1 `properties` prop | `string-parser.jsx:86` | n/a (package API break) | `linkify-react@4` `options` prop |
| `react-linkify` v0.2.1 (package) | `package.json:24` | n/a (incompatible) | `linkify-react@4` |

---

## Peer dependency target after v2.0.0

```json
"peerDependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```
