module.exports = {
  rules: {
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        ignoreCase: false,
        reservedFirst: ['key'],
      },
    ],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/static-property-placement': [2, 'static public field'],
    'react/no-unescaped-entities': 0,
    'react/self-closing-comp': [
      2,
      {
        component: true,
        html: true,
      },
    ],
  },
}
