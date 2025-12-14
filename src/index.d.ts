/**
 * @chromium-style-qrcode/generator
 * A Chromium Style QR Code Generator using Rust and WebAssembly
 */

// Re-export enums from qrcode.d.ts
export { QuietZone, CenterImage, ModuleStyle, LocatorStyle } from './qrcode.js';

// Re-export types from qrcode.d.ts
export type {
  InitInput,
  InitOutput,
  QrCodeResult,
  SyncInitInput,
} from './qrcode.js';

// Import types for use in function signatures
import type {
  InitInput,
  QuietZone,
  CenterImage,
  ModuleStyle,
  LocatorStyle,
  QrCodeResult,
} from './qrcode.js';

/**
 * Options for generating a QR code
 */
export interface GenerateQRCodeOptions {
  /**
   * Style of data modules
   * @default ModuleStyle.Circles
   */
  moduleStyle?: ModuleStyle;

  /**
   * Style of locator patterns
   * @default LocatorStyle.Rounded
   */
  locatorStyle?: LocatorStyle;

  /**
   * Center image type
   * @default CenterImage.Dino
   */
  centerImage?: CenterImage;

  /**
   * Quiet zone handling
   * @default QuietZone.WillBeAddedByClient
   */
  quietZone?: QuietZone;
}

/**
 * Initialize the WebAssembly module
 *
 * @param input - Optional wasm module input
 * @returns Promise that resolves when initialization is complete
 *
 * @example
 * ```ts
 * import { initialize } from '@chromium-style-qrcode/generator';
 *
 * await initialize();
 * ```
 */
export function initialize(
  input?: InitInput | Promise<InitInput>
): Promise<void>;

/**
 * Check if the WASM module is initialized
 *
 * @returns true if the module is initialized, false otherwise
 *
 * @example
 * ```ts
 * import { isInitialized, initialize } from '@chromium-style-qrcode/generator';
 *
 * if (!isInitialized()) {
 *   await initialize();
 * }
 * ```
 */
export function isInitialized(): boolean;

/**
 * Generate QR code with options
 *
 * @param data - The data to encode in the QR code
 * @param options - Generation options
 * @returns QR code result containing pixel data, size, and original size
 * @throws Error if WASM module is not initialized or generation fails
 *
 * @example
 * ```ts
 * import { initialize, generateQRCode, ModuleStyle, LocatorStyle } from '@chromium-style-qrcode/generator';
 *
 * await initialize();
 *
 * const result = generateQRCode('https://example.com', {
 *   moduleStyle: ModuleStyle.Circles,
 *   locatorStyle: LocatorStyle.Rounded,
 * });
 *
 * console.log(result.data); // Uint8Array of pixel data
 * console.log(result.size); // QR code size
 * ```
 */
export function generateQRCode(
  data: string,
  options?: GenerateQRCodeOptions
): QrCodeResult;
