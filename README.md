# .prettierignore for monorepos

The package is a temporary workaround for
https://github.com/prettier/prettier/issues/4081

What it does:

- Collects all `.gitignore` and `.prettierignore` files in the given path
- Glues them into a single root `.prettierignore`
- Appends rules from the root `.prettierignore-append`

## Installation

- Install the package as a dev dependency
- Rename your root `.prettierignore` to `.prettierignore-append`
- Add `/.prettierignore` to your root `.gitignore`
- Let the package regenerate the root `.prettierignore` on some event, e.g.
  - Add a `postinstall` script to your root `package.json`

  ```json
  {
    "scripts": {
      "postinstall": "prettierignore-monorepo"
    }
  }
  ```

  - Use githooks
