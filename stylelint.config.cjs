module.exports = {
  overrides: [
    {
      files: ['**/*.{tsx,js,jsx}'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order', 'stylelint-no-unsupported-browser-features'],
  rules: {
    // disable for prettier
    indentation: null,
    'string-quotes': null,
    'no-empty-first-line': null,
    'declaration-colon-newline-after': null,
    'no-eol-whitespace': null,
    'no-missing-end-of-source-newline': null,
    'plugin/no-unsupported-browser-features': [true],
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': [
      [
        /* eslint-disable prettier/prettier */
        'position', 'inset', 'top', 'right', 'bottom', 'left',
        'width', 'height',
      ],
      /* eslint-enable */
      {
        unspecified: 'bottomAlphabetical',
      },
    ],
  },
}