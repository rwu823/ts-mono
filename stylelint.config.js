/* eslint-disable unicorn/no-abusive-eslint-disable */

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order'],
  rules: {
    'order/order': ['custom-properties', 'declarations'],

    'order/properties-order': [
      [
        /* eslint-disable */
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
