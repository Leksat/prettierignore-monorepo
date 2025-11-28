import { describe, test, expect } from 'vitest';
import { processNestedRule } from './lib';

describe('processNestedRule', () => {
  test('basic rule', () => {
    expect(processNestedRule('node_modules', 'src')).toBe(
      '/src/**/node_modules',
    );
  });

  test('negation', () => {
    expect(processNestedRule('!node_modules', 'src')).toBe(
      '!/src/**/node_modules',
    );
  });

  test('leading slash', () => {
    expect(processNestedRule('/node_modules', 'src')).toBe('/src/node_modules');
  });

  test('trailing slash', () => {
    expect(processNestedRule('node_modules/', 'src')).toBe(
      '/src/**/node_modules/',
    );
  });

  test('leading and trailing slashes', () => {
    expect(processNestedRule('/node_modules/', 'src')).toBe(
      '/src/node_modules/',
    );
  });

  test('path segments', () => {
    expect(processNestedRule('node_modules/*', 'src')).toBe(
      '/src/node_modules/*',
    );
  });

  test('complex rule', () => {
    expect(processNestedRule('!/generated/**/*.txt', 'src/lib')).toBe(
      '!/src/lib/generated/**/*.txt',
    );
  });
});
