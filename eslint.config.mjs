import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        rules: {
            semi: ['error', 'always'],
            quotes: ['warn', 'single'],
            'no-unused-vars': 'warn',
            indent: ['error', 4],
        },
    },
];
