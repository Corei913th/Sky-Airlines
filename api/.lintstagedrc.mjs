// Function form for typecheck: lint-staged calls this after stashing unstaged changes,
// so tsc sees only the staged snapshot — not a dirty working tree.
// This catches the class of bug where a mock file is temporarily "correct"
// in the working tree but the staged version is broken relative to a type change.
export default {
  "**/*.{ts,tsx}": [
    "node node_modules/eslint/bin/eslint.js --fix",
    "node node_modules/prettier/bin/prettier.cjs --write",
    () => "pnpm run typecheck",
  ],
  "**/*.{css,json,md,yml,yaml}": [
    "node node_modules/prettier/bin/prettier.cjs --write",
  ],
};