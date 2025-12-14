import { defineConfig } from 'vite';
import { resolve } from 'path';

import { isLib, isProd } from './vite.helper';
import { BASE, LIB_NAME } from './vite.constant';

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Library build configuration
  if (isLib(mode)) {
    return defineConfig({
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.js'),
          name: LIB_NAME,
          formats: ['es', 'cjs', 'umd'],
          fileName: (format) => {
            if (format === 'es') return 'index.js';
            if (format === 'cjs') return 'index.cjs';
            return `index.${format}.js`;
          },
        },
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
          // Ensure wasm files are handled correctly
          external: [],
          output: {
            // Use named exports to avoid default export issues
            exports: 'named',
            // Ensure proper globals for UMD build
            globals: {},
            // Preserve module structure
            preserveModules: false,
            // Asset file names
            assetFileNames: '[name][extname]',
          },
        },
      },
    });
  }

  // Development/Production build (demo page)
  return defineConfig({
    ...(isProd(mode) ? { base: BASE } : null),
  });
};
