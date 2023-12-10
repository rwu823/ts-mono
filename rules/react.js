const ERROR = 2
module.exports = {
  rules: {
    'react/no-unknown-property': [ERROR, { ignore: ['css'] }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'react/prop-types': 0,

    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
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
