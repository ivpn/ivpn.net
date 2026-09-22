/**
 * @fileoverview Cross-realm validation utilities
 * @module core/validation
 * @description
 * Provides validation functions that work across different JavaScript realms
 * (e.g., different iframes, workers, WASM contexts, jsdom vs real browser).
 *
 * Uses duck-typing instead of instanceof to avoid cross-realm issues.
 */

/**
 * Check if a value is a Uint8Array (cross-realm safe)
 *
 * @param {*} value - Value to check
 * @returns {boolean} True if value is Uint8Array-like
 *
 * @example
 * isUint8Array(new Uint8Array([1, 2, 3])); // true
 * isUint8Array([1, 2, 3]); // false
 * isUint8Array(null); // false
 */
export function isUint8Array(value) {
  // Check if value is a typed array view and specifically Uint8Array
  return value != null &&
    typeof value === 'object' &&
    ArrayBuffer.isView(value) &&
    value.constructor.name === 'Uint8Array';
}
