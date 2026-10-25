import test from 'node:test';
import assert from 'node:assert/strict';
import { createGisoo } from '../index.js';

test('default base URL', () => {
  const c = createGisoo({ apiKey: 'sk-gisoo-v1-test' });
  assert.ok(c.baseURL.startsWith('https://gisoo.pro/api/v1'));
});

test('iran mirror', () => {
  const c = createGisoo({ apiKey: 'sk-gisoo-v1-test', iran: true });
  assert.ok(c.baseURL.startsWith('https://ir.gisoo.pro/api/v1'));
});

test('missing key throws', () => {
  const old = process.env.GISOO_API_KEY;
  delete process.env.GISOO_API_KEY;
  assert.throws(() => createGisoo());
  if (old) process.env.GISOO_API_KEY = old;
});
