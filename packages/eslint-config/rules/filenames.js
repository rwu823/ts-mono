module.exports = {
  plugins: ['filenames'],
  rules: {
    'filenames/match-exported': 2,
    'filenames/no-index': 2,
  },

  overrides: [
    {
      files: ['**/pages/**', 'capacitor.config.ts'],
      rules: {
        'filenames/no-index': 0,
        'filenames/match-exported': 0,
      },
    },
  ],
}
