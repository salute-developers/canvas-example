import { defineConfig } from 'cypress';

import { initCypressPlugins } from '../plugins/index';

export default defineConfig({
    viewportWidth: 1920,
    viewportHeight: 1080,
    userAgent: '(sberbox; SberBox)',
    chromeWebSecurity: false,
    video: false,
    env: {
        coverage: false,
    },
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return initCypressPlugins(on, config);
        },
        baseUrl: 'http://localhost:3000',
        specPattern: 'cypress/e2e/**/*@sberbox.spec.ts',
    },
});
