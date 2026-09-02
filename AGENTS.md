# Repository Guidelines

## Project Structure & Module Organization

This npm-workspaces monorepo contains a React application and its reusable utilities. Keep browser-independent logic in `packages/core/src/`; expose public APIs through `packages/core/src/index.ts`. Place its adjacent Vitest specs as `*.test.ts` (for example, `formatter.ts` and `formatter.test.ts`).

The user interface lives in `apps/web/src/`: `pages/` contains one tool screen per feature, `components/` contains shared UI, `App.tsx` defines routing, and `index.css` holds Tailwind/global styling. Build outputs (`packages/core/dist/` and `apps/web/dist/`) are generated—do not edit them manually. Use `scratch/` only for local experiments.

## Build, Test, and Development Commands

- `npm install` — install workspace dependencies (Node.js 18+).
- `npm run dev` — run the Vite web app at `http://localhost:5173`.
- `npm run build` — type-check and build every workspace.
- `npm test` — run workspace tests; currently this executes Vitest in `@dev-assistant/core` (the web app has no automated tests yet).
- `npm run test -w @dev-assistant/core` — run core tests alone while iterating on a utility.

## Coding Style & Naming Conventions

Use TypeScript with strict typing and ES modules. Follow the surrounding style: two-space indentation in core files and four-space indentation in React pages. Name utility modules in kebab-case (`text-analyzer.ts`), React pages in PascalCase (`TextAnalyzerPage.tsx`), exported functions in camelCase, and tests `*.test.ts`.

Prefer small, pure core functions that can run outside the browser. Keep UI-specific state and DOM access in `apps/web`. Reuse Tailwind utility classes and existing layout components rather than adding a separate styling system. No repository-wide formatter or linter script is configured; match nearby code and run the build before submitting.

## Testing Guidelines

Write Vitest coverage for each new or changed core behavior, including representative inputs, edge cases, and invalid input where applicable. Use `describe` to group a module's behavior and descriptive `test('...')` names. Test public functions directly; avoid tests that depend on browser globals unless they are explicitly part of the contract.

## Commit & Pull Request Guidelines

Recent history favors short, imperative messages, often with Conventional Commit prefixes, such as `feat: add BCrypt utility module`. Use `feat:`, `fix:`, `docs:`, or `chore:` when appropriate and keep each commit focused. Pull requests should explain the user-visible change, list validation performed (for example, `npm test` and `npm run build`), link relevant issues, and include screenshots for UI changes.
