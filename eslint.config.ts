// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint' // ✅ the correct meta-package
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    js.configs.recommended,

    {
        files: ['**/*.{js,ts,jsx,tsx}'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },

    // ✅ TypeScript recommended rules (ESLint Flat Config)
    ...tseslint.configs.flat.recommended,

    // ✅ React recommended rules (Flat Config)
    pluginReact.configs.flat.recommended,

    {
        ignores: ['dist/**', 'build/**'],
    },
])
