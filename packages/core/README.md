# @dev-assistant/core

Shared core logic and utilities for the Dev Assistant project.

## Features

- **Text Diffing**: Wrapper around `diff-match-patch`.
- **Formatting**: Shared Prettier configuration and formatting logic.

## Scripts

- `npm run build`: Compiles TypeScript to JavaScript.
- `npm run test`: Runs unit tests using Vitest.

## Usage

This package is intended to be used as a workspace dependency in other apps or packages within the monorepo.

```json
"dependencies": {
  "@dev-assistant/core": "*"
}
```
