import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/Sito-Web/',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
  },
  server: {
    port: 5173,
    open: true,
  },
});
