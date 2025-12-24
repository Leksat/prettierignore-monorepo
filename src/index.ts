#!/usr/bin/env node
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import ignoreWalk from 'ignore-walk';

import { processNestedRule } from './lib';

try {
  if (existsSync('.prettierignore')) {
    unlinkSync('.prettierignore');
  }
  const rules = collectIgnoreRules();
  let content = rules.join('\n') + '\n';
  if (existsSync('.prettierignore-append')) {
    content +=
      '# From .prettierignore-append\n' +
      readFileSync('.prettierignore-append', 'utf8');
  }
  writeFileSync('.prettierignore', content);
  console.log('Successfully generated .prettierignore');
} catch (error) {
  console.error('Error generating .prettierignore:', error);
  process.exit(1);
}

function collectIgnoreRules(): Array<string> {
  const baseDir = '.';
  const ignoreFiles = ['.gitignore', '.prettierignore'];
  return ignoreWalk
    .sync({ path: baseDir, ignoreFiles })
    .filter((path) => !path.startsWith('.git/'))
    .filter((path) =>
      ignoreFiles.some(
        (ignoreFile) => path === ignoreFile || path.endsWith('/' + ignoreFile),
      ),
    )
    .map((path) => {
      const isRoot = !path.includes('/');
      const basePath = dirname(path);
      return [`# From ${path}`].concat(
        readFileSync(join(baseDir, path), 'utf8')
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => !line.startsWith('#'))
          .filter(Boolean)
          .map((rule) =>
            isRoot
              ? // Root rules can be used as is.
                rule
              : processNestedRule(rule, basePath),
          ),
      );
    })
    .flat();
}
