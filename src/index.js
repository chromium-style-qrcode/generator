/**
 * @chromium-style-qrcode/generator
 * A Chromium Style QR Code Generator using Rust and WebAssembly
 */
import init, {
  QuietZone,
  CenterImage,
  ModuleStyle,
  LocatorStyle,
  generate_qr_code_with_options,
} from './qrcode.js';

// Re-export all enums and types
export { QuietZone, CenterImage, ModuleStyle, LocatorStyle };

// Track initialization state
let initPromise = null;
let initialized = false;

/**
 * Initialize the WebAssembly module
 *
 * @param {BufferSource | Response | PromiseLike<Response>} [input] Optional wasm module input
 * @returns {Promise<void>}
 */
export async function initialize(input) {
  if (initialized) {
    return;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = init(input).then(() => {
    initialized = true;
  });

  return initPromise;
}

/**
 * Check if the WASM module is initialized
 */
export function isInitialized() {
  return initialized;
}

/**
 * Generate QR code with options
 *
 * @param {string} data The data to encode in the QR code
 * @param {object} [options] Generation options
 * @param {ModuleStyle} [options.moduleStyle=ModuleStyle.Circles] Style of data modules
 * @param {LocatorStyle} [options.locatorStyle=LocatorStyle.Rounded] Style of locator patterns
 * @param {CenterImage} [options.centerImage=CenterImage.Dino] Center image type
 * @param {QuietZone} [options.quietZone=QuietZone.WillBeAddedByClient] Quiet zone handling
 * @returns {{ data: Uint8Array, size: number, original_size: number }} QR code data
 * @throws {Error} If WASM module is not initialized or generation fails
 */
export function generateQRCode(data, options = {}) {
  if (!initialized) {
    throw new Error('WASM module not initialized. Call initialize() first.');
  }

  const {
    centerImage = CenterImage.Dino,
    moduleStyle = ModuleStyle.Circles,
    locatorStyle = LocatorStyle.Rounded,
    quietZone = QuietZone.WillBeAddedByClient,
  } = options;

  return generate_qr_code_with_options(
    data,
    moduleStyle,
    locatorStyle,
    centerImage,
    quietZone
  );
}
