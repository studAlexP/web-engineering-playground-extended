
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';
import love from 'eslint-config-love';

export default tseslint.config(
  love,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettier,
  eslintConfigPrettier,
  {
    rules: {
      'no-console': 'off',
      'linebreak-style': 0,
      'no-plusplus': 'off',
    },
  }
);
