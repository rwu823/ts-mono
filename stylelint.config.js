module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order', 'stylelint-no-unsupported-browser-features'],
  rules: {
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
