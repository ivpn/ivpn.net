/**
 * @fileoverview Error classes for LibOQS operations
 * @module @oqs/liboqs-js/errors
 */

/**
 * Base error class for all LibOQS errors
 * @extends Error
 */
export class LibOQSError extends Error {
  /**
   * @param {string} message - Error message
   * @param {string} [algorithm] - Algorithm name
   * @param {string} [operation] - Operation name
   */
  constructor(message, algorithm, operation) {
    super(message);
    this.name = 'LibOQSError';
    this.algorithm = algorithm;
    this.operation = operation;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Error thrown during algorithm initialization
 * @extends LibOQSError
 */
export class LibOQSInitError extends LibOQSError {
  /**
   * @param {string} algorithm - Algorithm name
   * @param {string} [details] - Additional error details
   */
  constructor(algorithm, details) {
    const message = `Failed to initialize ${algorithm}${details ? ': ' + details : ''}`;
    super(message, algorithm, 'init');
    this.name = 'LibOQSInitError';
  }
}

/**
 * Error thrown during cryptographic operations
 * @extends LibOQSError
 */
export class LibOQSOperationError extends LibOQSError {
  /**
   * @param {string} operation - Operation name (e.g., 'keypair', 'encaps', 'sign')
   * @param {string} algorithm - Algorithm name
   * @param {string} [details] - Additional error details
   */
  constructor(operation, algorithm, details) {
    const message = `${operation} failed for ${algorithm}${details ? ': ' + details : ''}`;
    super(message, algorithm, operation);
    this.name = 'LibOQSOperationError';
  }
}

/**
 * Error thrown for validation failures
 * @extends LibOQSError
 */
export class LibOQSValidationError extends LibOQSError {
  /**
   * @param {string} message - Error message
   * @param {string} [algorithm] - Algorithm name
   */
  constructor(message, algorithm) {
    super(message, algorithm, 'validation');
    this.name = 'LibOQSValidationError';
  }
}
