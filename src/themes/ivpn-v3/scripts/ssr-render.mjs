/**
 * scripts/ssr-render.mjs
 *
 * Build-time SSR pre-render script.
 * Run AFTER `vite build --config vite.config.ssr.js` has produced ssr-dist/.
 *
 * Imports each SSR bundle, calls render(lang, baseURL), and writes the resulting
 * HTML to ../../data/ssr/<name>.json so Hugo can include it in static pages.
 *
 * baseURL is read from VITE_APP_WEBAPI_URL in the env file that was written by
 * the Dockerfile before this script runs. Falls back to http://localhost.
 */

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const themeDir  = resolve(__dirname, '..')
const dataDir   = resolve(themeDir, '../../data/ssr')

// ── Read baseURL from the env file written by the Dockerfile ─────────────────
function readEnvFile(filePath) {
  if (!existsSync(filePath)) return {}
  return Object.fromEntries(
    readFileSync(filePath, 'utf8')
      .split('\n')
      .filter(line => line.includes('=') && !line.startsWith('#'))
      .map(line => {
        const idx = line.indexOf('=')
        return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()]
      })
  )
}

// NODE_ENV tells us which .env file was written (staging / production / development)
const env = process.env.NODE_ENV || 'development'
const envVars = readEnvFile(resolve(themeDir, `.env.${env}`))
const baseURL = (
  process.env.VITE_APP_WEBAPI_URL ||
  envVars.VITE_APP_WEBAPI_URL ||
  'http://localhost'
).replace(/\/$/, '') // strip trailing slash

console.log(`SSR pre-rendering with baseURL: ${baseURL}`)

mkdirSync(dataDir, { recursive: true })

const entries = [
  { name: 'pricing',    bundle: 'entry.pricing.js', lang: 'en' },
  { name: 'pricing_es', bundle: 'entry.pricing.js', lang: 'es' },
  { name: 'servers',    bundle: 'entry.servers.js', lang: 'en' },
  // light (OnePageCheckout) is skipped: fully interactive payment/crypto page;
  // SSR adds no SEO value and the component requires browser crypto at module load.
]

for (const { name, bundle, lang } of entries) {
  const bundlePath = pathToFileURL(resolve(themeDir, `ssr-dist/${bundle}`)).href

  let html = ''
  try {
    // Dynamic import re-uses the cached module for same-bundle entries (e.g.
    // pricing + pricing_es both import entry.pricing.js once).
    const mod = await import(bundlePath)
    html = await mod.render(lang, baseURL)
    console.log(`  ✓ ssr: rendered ${name} (${lang})`)
  } catch (err) {
    // Print the full error so it's visible in Docker build logs.
    console.error(`\n  ✗ ssr: render failed for ${name} (${lang})`)
    console.error(err.stack || err.message)
    // Exit with non-zero so the build fails loudly instead of silently
    // writing empty HTML that makes pages look broken without any warning.
    process.exit(1)
  }

  writeFileSync(resolve(dataDir, `${name}.json`), JSON.stringify({ html }))
}

console.log('SSR pre-rendering complete.')
