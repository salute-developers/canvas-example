module.exports = {
    extends: ['@salutejs/eslint-config'],
    ignorePatterns: ['*.d.ts', 'coverage/*', 'build/*'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
};
