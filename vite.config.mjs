import { defineConfig } from 'vite';

export default defineConfig({
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
      ],
    },
    globals: true,
    environment: 'happy-dom',
    setupFiles: './setupTests.js',
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
  },
});
