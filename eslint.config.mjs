import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        rules: {
            // 여기에 원하는 규칙을 추가합니다
            semi: ['error', 'always'],
            quotes: ['warn', 'single'],
            'no-unused-vars': 'warn',
            indent: ['error', 4],
            // 더 많은 규칙을 추가할 수 있습니다
        },
    },
];
