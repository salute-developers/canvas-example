/* eslint-disable @typescript-eslint/no-var-requires */
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
const coverage = require('@cypress/code-coverage/task');
const debug = require('debug')('e2e');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    addMatchImageSnapshotPlugin(on, config);

    coverage(on, config);

    on('before:browser:launch', (browser = {}, launchOptions) => {
        debug(browser);

        if (browser.name === 'chrome' || browser.name === 'chromium') {
            launchOptions.args.push('--window-size=1920,2000');
            launchOptions.args.push('--disable-dev-shm-usage');
            launchOptions.args.push('--force-device-scale-factor=1');

            debug(launchOptions.args);
        }

        return launchOptions;
    });

    return config;
};
