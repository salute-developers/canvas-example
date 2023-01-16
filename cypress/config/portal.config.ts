import { defineConfig } from 'cypress';

import { initCypressPlugins } from '../plugins/index';

export default defineConfig({
    viewportWidth: 1280,
    viewportHeight: 800,
    userAgent: '(stargate; SberPortal)',
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
        specPattern: 'cypress/e2e/**/*@portal.spec.ts',
    },
});
