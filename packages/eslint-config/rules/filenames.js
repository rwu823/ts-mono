module.exports = {
  rules: {
    'filenames/match-exported': 2,
    'filenames/no-index': 2,
  },

  overrides: [
    {
      files: ['**/pages/**'],
      rules: {
        'filenames/no-index': 0,
        'filenames/match-exported': 0,
      },
    },
  ],
}
