/**
 * @fileoverview Kyber1024 KEM algorithm implementation (DEPRECATED)
 * @module algorithms/kem/kyber/kyber-1024
 * @description
 * Kyber1024 is a lattice-based key encapsulation mechanism providing NIST security level 5.
 *
 * **DEPRECATED:** Kyber has been superseded by ML-KEM (NIST FIPS 203). Use ML-KEM-1024 instead.
 * It is part of the standard (Module-Lattice-Based Key-Encapsulation Mechanism).
 *
 * Key features:
 * - Lattice-based cryptography (Module-LWE problem)
 * - Security Level 5 (256-bit classical, quantum-resistant)
 * - IND-CCA2 security
 * - IND-CCA2 security
 * - Highest security level in ML-KEM family
 *
 * @see {@link https://pq-crystals.org/kyber/} - Kyber specification
 * @deprecated Use ML-KEM-1024 instead (NIST FIPS 203 standardized version
 */

import { LibOQSError, LibOQSInitError, LibOQSOperationError, LibOQSValidationError } from './core/errors.js';
import { isUint8Array } from './core/validation.js';

import _WasmFactory from './dist/kyber-1024.min.js';

async function loadModule() {
  return _WasmFactory;
}

/**
 * KYBER1024-INFO algorithm constants and metadata
 * @type {{readonly name: 'Kyber1024', readonly identifier: 'Kyber1024', readonly type: 'kem', readonly securityLevel: 5, readonly standardized: false, readonly deprecated: true, readonly description: string, readonly keySize: {readonly publicKey: 1568, readonly secretKey: 3168, readonly ciphertext: 1568, readonly sharedSecret: 32}}}
 */
export const KYBER1024_INFO = {
  name: 'Kyber1024',
  identifier: 'Kyber1024',
  type: 'kem',
  securityLevel: 5,
  standardized: false,
  deprecated: true,
  description: 'Kyber1024 (256-bit quantum security) - DEPRECATED, use ML-KEM-1024',
  keySize: {
    publicKey: 1568,
    secretKey: 3168,
    ciphertext: 1568,
    sharedSecret: 32
  }
};

/**
 * Factory function to create an Kyber1024 KEM instance
 *
 * @async
 * @function createKyber1024
 * @returns {Promise<Kyber1024>} Initialized Kyber1024 instance
 * @throws {LibOQSInitError} If module initialization fails
 *
 * @example
 * import { createKyber1024 } from '@oqs/liboqs-js';
 *
 * const kem = await createKyber1024();
 * const { publicKey, secretKey } = kem.generateKeyPair();
 * kem.destroy();
 */
export async function createKyber1024() {
  const moduleFactory = await loadModule();
  const wasmModule = await moduleFactory();
  wasmModule._OQS_init();

  const algoName = KYBER1024_INFO.identifier;
  const nameLen = wasmModule.lengthBytesUTF8(algoName);
  const namePtr = wasmModule._malloc(nameLen + 1);
  wasmModule.stringToUTF8(algoName, namePtr, nameLen + 1);

  const kemPtr = wasmModule._OQS_KEM_new(namePtr);
  wasmModule._free(namePtr);

  if (!kemPtr) {
    throw new LibOQSInitError('Kyber1024', 'Failed to create KEM instance');
  }

  return new Kyber1024(wasmModule, kemPtr);
}

/**
 * Kyber1024 wrapper class providing high-level KEM operations
 *
 * This class wraps the low-level WASM module to provide a user-friendly
 * interface for Kyber1024 operations with automatic memory management
 * and input validation.
 *
 * @class Kyber1024
 * @example
 * import LibOQS_ml_kem_1024 from '@oqs/liboqs-js/kyber-1024';
 * import { createKyber1024 } from '@oqs/liboqs-js/algorithms/kyber-1024';
 *
 * const kem = await createKyber1024(LibOQS_ml_kem_1024);
 * const { publicKey, secretKey } = kem.generateKeyPair();
 * const { ciphertext, sharedSecret } = kem.encapsulate(publicKey);
 * kem.destroy();
 */
export class Kyber1024 {
  /** @type {Object} @private */
  #wasmModule;
  /** @type {number} @private */
  #kemPtr;
  /** @type {boolean} @private */
  #destroyed = false;

  /**
   * @param {Object} wasmModule - Emscripten WASM module
   * @param {number} kemPtr - Pointer to KEM instance
   * @private
   */
  constructor(wasmModule, kemPtr) {
    this.#wasmModule = wasmModule;
    this.#kemPtr = kemPtr;
  }

  /**
   * Generate a new keypair for Kyber1024
   *
   * Generates a public/private keypair using the algorithm's internal
   * random number generator. The secret key must be kept confidential.
   *
   * @returns {{publicKey: Uint8Array, secretKey: Uint8Array}}
   * @throws {LibOQSOperationError} If keypair generation fails
   * @throws {LibOQSError} If instance has been destroyed
   * @example
   * const { publicKey, secretKey } = kem.generateKeyPair();
   * // publicKey: 1568 bytes
   * // secretKey: 3168 bytes (keep confidential!)
   */
  generateKeyPair() {
    this.#checkDestroyed();

    const publicKeyPtr = this.#wasmModule._malloc(KYBER1024_INFO.keySize.publicKey);
    const secretKeyPtr = this.#wasmModule._malloc(KYBER1024_INFO.keySize.secretKey);

    try {
      const result = this.#wasmModule._OQS_KEM_keypair(this.#kemPtr, publicKeyPtr, secretKeyPtr);

      if (result !== 0) {
        throw new LibOQSOperationError('keypair', 'Kyber1024', `Error code: ${result}`);
      }

      const publicKey = new Uint8Array(KYBER1024_INFO.keySize.publicKey);
      publicKey.set(this.#wasmModule.HEAPU8.subarray(publicKeyPtr, publicKeyPtr + KYBER1024_INFO.keySize.publicKey));

      return { publicKey };

    } finally {
      this.#wasmModule._free(publicKeyPtr);
      this.#wasmModule._free(secretKeyPtr);
    }
  }

  /**
   * Clean up resources and free WASM memory
   *
   * This method should be called when you're done using the instance
   * to free WASM memory. After calling destroy(), the instance cannot
   * be used for further operations.
   *
   * @example
   * const kem = await createKyber1024(LibOQS_ml_kem_1024);
   * // ... use kem ...
   * kem.destroy();
   */
  destroy() {
    if (!this.#destroyed) {
      if (this.#kemPtr) {
        this.#wasmModule._OQS_KEM_free(this.#kemPtr);
        this.#kemPtr = null;
      }
      this.#destroyed = true;
    }
  }

  /**
   * Enables automatic cleanup via `using` declarations
   * @example
   * using instance = await create...();
   * // automatically cleaned up at end of scope
   */
  [Symbol.dispose]() {
    this.destroy();
  }

  /**
   * Get algorithm information and constants
   * @returns {typeof KYBER1024_INFO} Algorithm metadata (copy of KYBER1024_INFO)
   * @example
   * const info = kem.info;
   * console.log(info.keySize.publicKey); // 1568
   */
  get info() {
    return KYBER1024_INFO;
  }

  #checkDestroyed() {
    if (this.#destroyed) {
      throw new LibOQSError('Instance has been destroyed', 'Kyber1024');
    }
  }

  #validatePublicKey(publicKey) {
    if (!isUint8Array(publicKey) || publicKey.length !== KYBER1024_INFO.keySize.publicKey) {
      throw new LibOQSValidationError(
        `Invalid public key: expected ${KYBER1024_INFO.keySize.publicKey} bytes, got ${publicKey?.length ?? 'null'}`,
        'Kyber1024'
      );
    }
  }

  #validateSecretKey(secretKey) {
    if (!isUint8Array(secretKey) || secretKey.length !== KYBER1024_INFO.keySize.secretKey) {
      throw new LibOQSValidationError(
        `Invalid secret key: expected ${KYBER1024_INFO.keySize.secretKey} bytes, got ${secretKey?.length ?? 'null'}`,
        'Kyber1024'
      );
    }
  }

  #validateCiphertext(ciphertext) {
    if (!isUint8Array(ciphertext) || ciphertext.length !== KYBER1024_INFO.keySize.ciphertext) {
      throw new LibOQSValidationError(
        `Invalid ciphertext: expected ${KYBER1024_INFO.keySize.ciphertext} bytes, got ${ciphertext?.length ?? 'null'}`,
        'Kyber1024'
      );
    }
  }
}

