import OpenAI from 'openai';

export const BASE_URL = 'https://gisoo.pro/api/v1';
export const IRAN_BASE_URL = 'https://ir.gisoo.pro/api/v1';

/**
 * Build an OpenAI client pointed at Gisoo.
 * apiKey falls back to process.env.GISOO_API_KEY; iran:true uses ir.gisoo.pro.
 * Any other option is passed to `new OpenAI(...)`.
 */
export function createGisoo({ apiKey, iran = false, baseURL, ...rest } = {}) {
  const key = apiKey || (typeof process !== 'undefined' ? process.env.GISOO_API_KEY : undefined);
  if (!key) throw new Error('Pass apiKey or set GISOO_API_KEY (keys look like sk-gisoo-v1-...).');
  return new OpenAI({ ...rest, apiKey: key, baseURL: baseURL || (iran ? IRAN_BASE_URL : BASE_URL) });
}

/** Fetch the public model list (no API key needed). `type` filters: chat, image, audio, embedding, video, music. */
export async function listModels({ type, iran = false, baseURL } = {}) {
  const url = (baseURL || (iran ? IRAN_BASE_URL : BASE_URL)).replace(/\/+$/, '') + '/models';
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
  const body = await res.json();
  const models = Array.isArray(body) ? body : body.data ?? [];
  return type ? models.filter((m) => m.type === type) : models;
}
