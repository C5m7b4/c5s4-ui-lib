import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

export default defineConfig({
  // plugins: [react()],
  test: {
    reporters: ['default'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      enabled: true,
      reportOnFailure: true,
      exclude: [
        'node_modules',
        'playground/**',
        'dist/**',
        'src/mocks/**',
        'postcss.config.js',
        'tailwind.config.js',
        'src/components/tooltips/**',
      ],
    },
    globals: true,
    environment: 'happy-dom',
    setupFiles: './setupTests.js',
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    // browser: {
    //   provider: 'playwright', // or 'webdriverio'
    //   enabled: true,
    //   // at least one instance is required
    //   instances: [{ browser: 'chromium' }],
    // },
  },
});
