# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.1] - 2026-06-28

### Added

- `breakOn` prop defaults to `Infinity` so the component renders all chunks when the prop is omitted.
- Jest regression test: `StringParser` rendered without a `breakOn` prop stays fully visible.
- Re-export `createTextArr` from `src/string-parser.jsx` so the named import in tests resolves correctly.
- GitHub Actions `publish.yml` workflow: triggers on `v*` tag pushes, publishes to NPM via `actions/setup-node` registry-url with `NODE_AUTH_TOKEN` from `NPM_TOKEN` secret.

### Changed

- Converted `babel.config.js` (CommonJS) to `babel.config.json`; removed `@babel/preset-env` since Parcel handles transpilation natively.
- `examples` npm script now passes `--port 1234 --no-autoinstall --log-level info` to Parcel.

### Fixed

- URL Linkification example now correctly renders anchor tags for all test URLs.
- Resolved `Opening /dev/tty failed` Parcel error by adding `--no-autoinstall` and `--log-level info`.
- Resolved `Port 1234 could not be used` error by pinning the port via `--port 1234` CLI flag.

## [2.0.0] - 2026-06-27

### Added
- Rollup build pipeline producing dual `dist/index.esm.js` (ES module) and `dist/index.cjs.js` (CommonJS) outputs.
- Pure utility function `createTextArr` extracted from component body for easier unit testing.
- `useState` and `useEffect` hooks replacing class lifecycle methods.
- Jest test suite covering `createTextArr` and the `StringParser` component.

### Changed
- Component rewritten as a function component; exported default is still a valid React element — no consumer-side API change.
- Peer dependency updated from `react ^15.5.4` to `react ^18.0.0`.
- Internal `<Linkify>` `properties` prop replaced by `options` (linkify-react@4 API).
- Build tooling switched from Babel CLI to Rollup with `@rollup/plugin-babel`.
- Package version bumped to `2.0.0` following semver (breaking changes below).

### Removed
- `React.createClass` — removed from React since v16; unavailable in React 18.
- `getInitialState` and `getDefaultProps` — part of `React.createClass`, removed with it.
- `componentWillReceiveProps` — hard-deprecated in React 16.3; causes errors in React 18 strict mode.
- `react-linkify` v0.2.1 dependency — replaced by `linkify-react@4`. Depended on `React.PropTypes` and `React.createClass` internally, making it incompatible with React 18.

## [1.1.1] - 2021-01-01

### Changed
- Upgraded compiled JS bundle to reflect 1.1.1 release.

## [1.1.0] - 2021-01-01

### Added
- `charLimit` prop for controlling the character threshold before the read-more toggle appears.

### Fixed
- Long string (no whitespace) overflow bug — long unbreakable strings no longer escape their container.
- `charLimit` off-by-one error causing incorrect truncation point.

## [1.0.0] - 2021-01-01

### Added
- Initial release of `react-simple-read-more`.
- Core `StringParser` component that truncates text and shows a Read More / Read Less toggle.
- `lineNumber` prop to control how many lines are shown before truncating.
- Links inside text are automatically detected and rendered as anchor tags via `react-linkify`.
- Links open in a new tab (`target="_blank"`).
- React peer dependency declared (`^15.5.4`).
- Babel and React as dev dependencies for local development.
