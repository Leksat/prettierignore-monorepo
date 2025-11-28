export function processNestedRule(rule: string, basePath: string): string {
  // Check for negation.
  const isNegated = rule.startsWith('!');
  if (isNegated) {
    rule = rule.slice(1);
  }

  // Check for leading slash.
  let hasLeadingSlash = rule.startsWith('/');
  if (hasLeadingSlash) {
    rule = rule.slice(1);
  }

  // Check for trailing slash.
  const endsWithSlash = rule.endsWith('/');
  if (endsWithSlash) {
    rule = rule.slice(0, -1);
  }

  // Prepend the base path.
  rule =
    hasLeadingSlash || rule.includes('/')
      ? `/${basePath}/${rule}`
      : `/${basePath}/**/${rule}`;

  // Re‑append the trailing slash if it existed.
  if (endsWithSlash) {
    rule += '/';
  }

  // Re‑append negation if needed.
  return isNegated ? `!${rule}` : rule;
}
