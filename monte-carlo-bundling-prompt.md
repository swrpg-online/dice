# Task: Add Bundling to @swrpg-online/monte-carlo Package

## Context

The @swrpg-online/monte-carlo package currently only provides CommonJS modules that require external dependencies at runtime. Users consuming the dist folder directly (e.g., in browser environments or without a bundler) encounter issues with module resolution and the "exports is undefined" error. The dependency @swrpg-online/dice has already been updated with proper bundling.

## Current Issues

1. The dist folder contains CommonJS modules that use `require()` statements
2. External dependency (@swrpg-online/dice) is not bundled, causing resolution issues
3. No browser-compatible build is available
4. Import path `@swrpg-online/dice/dist/types` directly references dist folder (bad practice)

## Required Changes

### 1. Fix the problematic import

- In `src/MonteCarlo.ts`, change line 2 from:
  ```typescript
  import { DiceResult } from "@swrpg-online/dice/dist/types";
  ```
  To:
  ```typescript
  import type { DiceResult } from "@swrpg-online/dice";
  ```
- Note: First verify if DiceResult is exported from the main @swrpg-online/dice package. If not, you may need to keep the current import until the dice package exports it properly.

### 2. Add Rollup for bundling

Install the following dev dependencies:

```bash
npm install --save-dev rollup @rollup/plugin-typescript @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-terser tslib
```

### 3. Create rollup.config.js

Create a Rollup configuration that generates three bundle formats (UMD, ESM, CJS) with all dependencies included:

- UMD bundle for browsers (dist/bundle.umd.js) with global name "SwrpgMonteCarlo"
- ESM bundle for modern bundlers (dist/bundle.esm.js)
- CJS bundle for Node.js (dist/bundle.cjs.js)
- Include source maps for all bundles
- Mark @swrpg-online/dice as external OR bundle it (depending on use case)

### 4. Create tsconfig.rollup.json

Create a TypeScript config for Rollup that extends tsconfig.json but sets `"module": "esnext"`

### 5. Update package.json

- Add a "bundle" script: `"bundle": "rollup -c"`
- Update "build" script to: `"build": "tsc && npm run bundle"`
- Update package.json exports to support multiple module formats:
  ```json
  "main": "dist/bundle.cjs.js",
  "module": "dist/bundle.esm.js",
  "browser": "dist/bundle.umd.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/bundle.esm.js",
      "require": "./dist/bundle.cjs.js",
      "browser": "./dist/bundle.umd.js",
      "default": "./dist/index.js"
    }
  }
  ```

### 6. Test the bundles

Create simple test files to verify:

- UMD bundle works in browser (create test HTML file)
- CJS bundle works with require() in Node.js
- ESM bundle works with import in Node.js
- Verify the monte-carlo simulation functions work correctly

### 7. Run prettier and tests

- Run `npm run test` to ensure all tests pass
- Run `npx prettier --write .` to format all files
- Ensure the build completes successfully

### 8. Commit with semantic-release format

Since this repo uses semantic-release with Angular commit conventions, commit with:

```
feat(build): add rollup bundler for UMD, ESM, and CJS outputs

- Add rollup configuration for creating self-contained bundles
- Update package.json exports to support multiple module formats
- Fix direct dist import of DiceResult type
- Bundle includes all dependencies for standalone usage
```

## Expected Outcome

After these changes:

1. Users can use the monte-carlo dist folder directly in browsers via the UMD bundle
2. The package works with both require() and import statements
3. No external dependency resolution issues
4. The package maintains backward compatibility with existing users

## Important Notes

- Maintain backward compatibility - keep the original dist/index.js working
- This repo uses semantic-release, so use proper commit message format
- The GitHub Actions workflow must pass (especially Prettier checks)
- Consider whether to bundle @swrpg-online/dice or keep it as external dependency based on package size and use cases
