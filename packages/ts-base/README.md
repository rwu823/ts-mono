<h1 align="center">
  TS Base | TypeScript Infrastructure
</h1>
<p align="center">
  <a href="https://github.com/rwu823/ts-base/releases">
    <img src="https://flat.badgen.net/github/release/rwu823/ts-base" />
  </a>
  <a href="https://circleci.com/gh/rwu823/ts-base" alt="Build Status">
    <img src="https://flat.badgen.net/circleci/github/rwu823/ts-base/main" />
  </a>
  <a href="https://codecov.io/gh/rwu823/ts-base" alt="Coverage">
    <img src="https://flat.badgen.net/codecov/c/github/rwu823/ts-base" />
  </a>
</p>


## Infrastructure

Everything you needed for TypeScript project init. it includes:

- `.eslintrc` - ESLint configs for TypeScript parser it extends:
  - eslint-config-airbnb
  - eslint-config-prettier
  - eslint-plugin-import
  - eslint-plugin-jsx
  - eslint-plugin-prettier
  - eslint-plugin-react
- `tsconfig.json` - TypeScript setting with strict mode
- `prettier.config.js` - Prettier with precommit hook integration.
- `.vscode/launch.json` - Added `ts-node` for debugging.
- `jest` / `ts-jest` for unit testing.

## Installation

```sh
yarn add -D rwu823/ts-mono\#base/latest
```

## Initialization

```sh
yarn ts-base-init
```

## Version Convention

`ts-base`'s major version base on TypeScript's version and suffix `YY.M.D`. So it looks like `3.0.1-18.8.8`.
