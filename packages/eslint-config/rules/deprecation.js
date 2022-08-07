const NONE = 0
const WARN = 1
const ERROR = 2

module.exports = {
  plugins: ['deprecation'],
  rules: {
    'deprecation/deprecation': WARN,
  },
}
