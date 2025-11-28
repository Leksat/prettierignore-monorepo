# .prettierignore for monorepos

Workaround for
[Prettier's inability to use nested ignore-files](https://github.com/prettier/prettier/issues/4081)

What `prettierignore-monorepo` bin does:

- Collects all `.gitignore` and `.prettierignore` files in the monorepo
- Glues them into a single root `.prettierignore`
- Appends rules from the root `.prettierignore-append` (optional)

## Usage

- Install as a dev dependency in the monorepo root
- If `.prettierignore` exists in the root, rename it to `.prettierignore-append`
  (and `git rm --cached .prettierignore`)
- Add `/.prettierignore` to root `.gitignore`
- Run `prettierignore-monorepo` bin to generate initial `.prettierignore`
- Set up the `prettierignore-monorepo` bin to run on some event (e.g. on a git
  hook, or in the `postinstall` script of the root `package.json`)
