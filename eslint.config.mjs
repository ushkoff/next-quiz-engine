import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const googleConfig = compat.extends('google').map((config) => {
  if (config.rules) {
    delete config.rules['valid-jsdoc'];
  }
  return config;
});

const eslintConfig = [
  ...googleConfig,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.extends('prettier'),
  {
    rules: {
      'require-jsdoc': 'off',
      'new-cap': 'off',
      quotes: ['error', 'single'],
    },
  },
];

export default eslintConfig;
