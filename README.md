# .prettierignore for monorepos

The package is a temporary workaround for
https://github.com/prettier/prettier/issues/4081

Usage: `pnpm run --filter @custom/prettierignore-monorepo generate $PWD`

What it does:

- Collects all `.gitignore` and `.prettierignore` files in the given path
- Glues them into a single root `.prettierignore`
- Appends rules from the root `.prettierignore-append`
