// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },

  typescript: true,
  solid: true,

  jsonc: false,
  yaml: false,

  rules: {
    'no-console': ['off'],
    'ts/no-unused-expressions': ['off'],
    'eslint-comments/no-unlimited-disable': ['off'],
    'eslint-comments/no-unused-disable': 'off',
  },
})
