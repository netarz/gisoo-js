# gisoo-js
n[![npm](https://img.shields.io/npm/v/@gisoo/sdk)](https://www.npmjs.com/package/@gisoo/sdk)

A tiny helper that gives you the official [`openai`](https://www.npmjs.com/package/openai) Node client already pointed at [Gisoo](https://gisoo.pro), a multi-model AI platform with an OpenAI-compatible API (chat, responses, embeddings, images, speech, music, video). ESM, Node 18+, TypeScript types included.

## Install

```bash
npm install @gisoo/sdk openai
```

## Use

Create a key in the Gisoo app (keys look like `sk-gisoo-v1-...`) and export `GISOO_API_KEY`.

```js
import { createGisoo } from '@gisoo/sdk';

const client = createGisoo(); // or createGisoo({ apiKey: 'sk-gisoo-v1-...' })
const r = await client.chat.completions.create({
  model: 'gemini-3.6-flash',
  messages: [{ role: 'user', content: 'سلام! یک جملهٔ کوتاه دربارهٔ تهران بگو.' }],
});
console.log(r.choices[0].message.content);
```

Streaming works as in the OpenAI client (`stream: true`). Other model IDs include `gpt-5-mini`, `deepseek-flash` and `openrouter/anthropic/claude-sonnet-4.5`.

Iran mirror: `createGisoo({ iran: true })` uses `https://ir.gisoo.pro/api/v1`.

### List models (no key needed)

```js
import { listModels } from '@gisoo/sdk';
const images = await listModels({ type: 'image' }); // chat, image, audio, embedding, video, music
console.log(images.map((m) => m.id));
```

## Good to know

- Pricing is pay-as-you-go through an Iranian bank card. There is no free tier and no signup credit.
- Default rate limit is 60 requests per minute per key.
- The API stores metadata, not request or response bodies.
- Gisoo also has an Anthropic-compatible endpoint (`https://gisoo.pro/api`) and a remote MCP server (`https://gisoo.pro/api/mcp`).

Docs (Persian): <https://gisoo.pro/docs> · App: <https://gisoo.pro>

## Releases (maintainers)

Releases are published by GitHub Actions with an npm provenance statement. Bump the version in `package.json`, commit, then push a tag such as `v0.1.1`.

MIT licensed. Made by [Gisoo](https://gisoo.pro).
