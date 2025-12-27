/**
 * Copy WASM related files to dist folder
 */
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

const srcDir = resolve(rootDir, 'src');
const distDir = resolve(rootDir, 'dist');

// Ensure dist directory exists
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Files to copy (wasm-pack already generates .d.ts files)
const filesToCopy = [
  'index.d.ts',
  'qrcode_bg.wasm',
  'qrcode.js',
  'qrcode.d.ts',
  'qrcode_bg.wasm.d.ts',
];

for (const file of filesToCopy) {
  const srcPath = resolve(srcDir, file);
  const destPath = resolve(distDir, file);

  if (existsSync(srcPath)) {
    copyFileSync(srcPath, destPath);
    console.log(`Copied: ${file}`);
  } else {
    console.warn(`Warning: ${file} not found in src/`);
  }
}

console.log('WASM files copied to dist/');
