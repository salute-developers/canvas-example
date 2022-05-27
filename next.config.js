/* eslint-disable @typescript-eslint/no-var-requires */
const { redirects } = require('./config-helpers/redirects/redirects');
const { name: appName } = require('./package.json');

module.exports = {
    // адрес CDN для статики
    assetPrefix: process.env.PUBLIC_URL || '',
    reactStrictMode: true,
    // выключает заголовок X-Powered-By: Next.js
    poweredByHeader: false,
    env: {
        NEXT_PUBLIC_RELEASE: process.env.RELEASE || 'localdev',
        NEXT_PUBLIC_APP_NAME: appName,
        NEXT_PUBLIC_IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
    },
    eslint: {
        // eslint-config-next кофликтует с нашим '../../.eslintrc.js'
        ignoreDuringBuilds: true,
    },
    webpack: (config, options) => {
        const { isServer } = options;

        if (process.env.NODE_ENV === 'development') {
            return config;
        }

        if (!isServer) {
            config.externals = {
                ...(config.externals || {}),
                react: 'React',
                'react-dom': 'ReactDOM',
            };
        }

        return config;
    },
    redirects,
};
