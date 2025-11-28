# .prettierignore for monorepos

The package is a temporary workaround for
https://github.com/prettier/prettier/issues/4081

What it does:

- Collects all `.gitignore` and `.prettierignore` files in the given path
- Glues them into a single root `.prettierignore`
- Appends rules from the root `.prettierignore-append`

## Installation

1. Install the package as a dev dependency

   ```
   pnpm i -D prettierignore-monorepo
   ```

2. Rename your root `.prettierignore` to `.prettierignore-append`

   ```
   mv .prettierignore .prettierignore-append
   ```

3. Add `/.prettierignore` to your root `.gitignore`

   ```
   echo "/.prettierignore" >> .gitignore
   ```

4. Let the package regenerate the root `.prettierignore` on some event. E.g. use
   githooks. Or add a `postinstall` script to your root `package.json`

   ```
   npm pkg set scripts.postinstall=prettierignore-monorepo
   ```
