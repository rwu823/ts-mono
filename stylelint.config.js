module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order'],
  rules: {
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
