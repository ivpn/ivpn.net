/**
 * @fileoverview Classic-McEliece-348864 KEM algorithm implementation
 * @module algorithms/kem/classic-mceliece/classic-mceliece-348864
 * @description
 * Classic-McEliece-348864 is a code-based key encapsulation mechanism providing NIST security level 1.
 * It is based on the McEliece cryptosystem using binary Goppa codes.
 *
 * Key features:
 * - Code-based cryptography (Goppa codes)
 * - Security Level 1 (128-bit classical, quantum-resistant)
 * - Extremely conservative security margin
 * - IND-CCA2 security
 * - Very large public keys, small ciphertexts
 *
 * @see {@link https://classic.mceliece.org/} - Classic McEliece specification
 */

import { LibOQSError, LibOQSInitError, LibOQSOperationError, LibOQSValidationError } from './core/errors.js';
import { isUint8Array } from './core/validation.js';

import _WasmFactory from './dist/classic-mceliece-348864.min.js';

async function loadModule() {
  return _WasmFactory;
}

/**
 * CLASSIC-MCELIECE-348864-INFO algorithm constants and metadata
 * @type {{readonly name: 'Classic-McEliece-348864', readonly identifier: 'Classic-McEliece-348864', readonly type: 'kem', readonly securityLevel: 1, readonly standardized: false, readonly description: string, readonly keySize: {readonly publicKey: 261120, readonly secretKey: 6492, readonly ciphertext: 96, readonly sharedSecret: 32}}}
 */
export const CLASSIC_MCELIECE_348864_INFO = {
  name: 'Classic-McEliece-348864',
  identifier: 'Classic-McEliece-348864',
  type: 'kem',
  securityLevel: 1,
  standardized: false,
  description: 'Classic McEliece 348864 code-based KEM (NIST Level 1, 128-bit quantum security)',
  keySize: {
    publicKey: 261120,
    secretKey: 6492,
    ciphertext: 96,
    sharedSecret: 32
  }
};

/**
 * Load and initialize Classic-McEliece-348864 module
 * @returns {Promise<ClassicMcEliece348864>} Initialized Classic-McEliece-348864 instance
 * @throws {LibOQSInitError} If initialization fails
 * @example
 * import { createClassicMcEliece348864 } from '@oqs/liboqs-js';
 * const kem = await createClassicMcEliece348864();
 */
export async function createClassicMcEliece348864() {
  const moduleFactory = await loadModule();
  const wasmModule = await moduleFactory();
  wasmModule._OQS_init();

  const algoName = CLASSIC_MCELIECE_348864_INFO.identifier;
  const nameLen = wasmModule.lengthBytesUTF8(algoName);
  const namePtr = wasmModule._malloc(nameLen + 1);
  wasmModule.stringToUTF8(algoName, namePtr, nameLen + 1);

  const kemPtr = wasmModule._OQS_KEM_new(namePtr);
  wasmModule._free(namePtr);

  if (!kemPtr) {
    throw new LibOQSInitError('Classic-McEliece-348864', 'Failed to create KEM instance');
  }

  return new ClassicMcEliece348864(wasmModule, kemPtr);
}

/**
 * Classic-McEliece-348864 wrapper class providing high-level KEM operations
 *
 * This class wraps the low-level WASM module to provide a user-friendly
 * interface for Classic-McEliece-348864 operations with automatic memory management
 * and input validation.
 *
 * @class ClassicMcEliece348864
 * @example
 * import { createClassicMcEliece348864 } from '@oqs/liboqs-js';
 *
 * const kem = await createClassicMcEliece348864();
 * const { publicKey, secretKey } = kem.generateKeyPair();
 * const { ciphertext, sharedSecret } = kem.encapsulate(publicKey);
 * kem.destroy();
 */
export class ClassicMcEliece348864 {
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
   * Generate a new keypair for Classic-McEliece-348864
   *
   * Generates a public/private keypair using the algorithm's internal
   * random number generator. The secret key must be kept confidential.
   *
   * @returns {publicKey: Uint8Array, secretKey: Uint8Array} Generated keypair
   * @throws {LibOQSOperationError} If keypair generation fails
   * @throws {LibOQSError} If instance has been destroyed
   * @example
   * const { publicKey, secretKey } = kem.generateKeyPair();
   * // publicKey: 261120 bytes
   * // secretKey: 6492 bytes (keep confidential!)
   */
  generateKeyPair() {
    this.#checkDestroyed();

    const publicKeyPtr = this.#wasmModule._malloc(CLASSIC_MCELIECE_348864_INFO.keySize.publicKey);
    const secretKeyPtr = this.#wasmModule._malloc(CLASSIC_MCELIECE_348864_INFO.keySize.secretKey);

    try {
      const result = this.#wasmModule._OQS_KEM_keypair(this.#kemPtr, publicKeyPtr, secretKeyPtr);

      if (result !== 0) {
        throw new LibOQSOperationError('keypair', 'Classic-McEliece-348864', `Error code: ${result}`);
      }

      const publicKey = new Uint8Array(CLASSIC_MCELIECE_348864_INFO.keySize.publicKey);
      publicKey.set(this.#wasmModule.HEAPU8.subarray(publicKeyPtr, publicKeyPtr + CLASSIC_MCELIECE_348864_INFO.keySize.publicKey));

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
   * const kem = await createClassicMcEliece348864();
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
   * @returns {typeof CLASSIC_MCELIECE_348864_INFO} Algorithm metadata (copy of CLASSIC_MCELIECE_348864_INFO)
   * @example
   * const info = kem.info;
   * console.log(info.keySize.publicKey); // 261120
   */
  get info() {
    return CLASSIC_MCELIECE_348864_INFO;
  }

  #checkDestroyed() {
    if (this.#destroyed) {
      throw new LibOQSError('Instance has been destroyed', 'Classic-McEliece-348864');
    }
  }

  #validatePublicKey(publicKey) {
    if (!isUint8Array(publicKey) || publicKey.length !== CLASSIC_MCELIECE_348864_INFO.keySize.publicKey) {
      throw new LibOQSValidationError(
        `Invalid public key: expected ${CLASSIC_MCELIECE_348864_INFO.keySize.publicKey} bytes, got ${publicKey?.length ?? 'null'}`,
        'Classic-McEliece-348864'
      );
    }
  }

  #validateSecretKey(secretKey) {
    if (!isUint8Array(secretKey) || secretKey.length !== CLASSIC_MCELIECE_348864_INFO.keySize.secretKey) {
      throw new LibOQSValidationError(
        `Invalid secret key: expected ${CLASSIC_MCELIECE_348864_INFO.keySize.secretKey} bytes, got ${secretKey?.length ?? 'null'}`,
        'Classic-McEliece-348864'
      );
    }
  }

  #validateCiphertext(ciphertext) {
    if (!isUint8Array(ciphertext) || ciphertext.length !== CLASSIC_MCELIECE_348864_INFO.keySize.ciphertext) {
      throw new LibOQSValidationError(
        `Invalid ciphertext: expected ${CLASSIC_MCELIECE_348864_INFO.keySize.ciphertext} bytes, got ${ciphertext?.length ?? 'null'}`,
        'Classic-McEliece-348864'
      );
    }
  }
}
