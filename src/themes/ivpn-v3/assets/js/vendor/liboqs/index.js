// Vendored subset of @oqs/liboqs-js — Kyber-1024 and Classic-McEliece-348864 only.
// Source: https://github.com/open-quantum-safe/liboqs-js  (MIT licence)
// WASM dist files and JS wrappers are stored locally so there is no runtime
// dependency on the npm registry.

export { createKyber1024 } from './kyber-1024.js';
export { createClassicMcEliece348864 } from './classic-mceliece-348864.js';
