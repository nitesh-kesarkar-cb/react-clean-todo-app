// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    // Base JS recommended rules
    js.configs.recommended,

    // Apply settings for JS/TS/JSX/TSX files
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true, // ✅ Needed to parse JSX in TSX
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: pluginReact,
        },
        rules: {
            ...pluginReact.configs.recommended.rules, // ✅ Pull in React recommended rules
            'react/react-in-jsx-scope': 'off',
        },
        settings: {
            react: {
                version: 'detect', // ✅ auto-detect React version
            },
        },
    },

    // TypeScript recommended rules (flat config array)
    ...tseslint.configs.recommended,

    {
        ignores: ['dist/**', 'build/**'],
    },
])
