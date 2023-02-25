const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/{pages,components}/**/*.tsx'],
  theme: {
    extend: {
      maxWidth: {
        '1/2': '50%',
      },
    },
  },

  plugins: [
    plugin(({ addUtilities, matchUtilities, theme }) => {
      matchUtilities(
        {
          maxWidth: (value) => {
            if (value === 'center') {
              return {
                display: 'flex',
                'justify-content': 'center',
                'align-items': 'center',
              }
            }

            return {
              display: 'flex',
            }
          },
        },
        {
          values: { center: 'center' },
        },
      )

      // addUtilities({
      //   '.pl': {
      //     'white-space': 'pre-line',
      //   },
      //   '.content-hidden': {
      //     'content-visibility': 'hidden',
      //   },
      //   '.content-visible': {
      //     'content-visibility': 'visible',
      //   },
      // })
    }),
  ],
}
