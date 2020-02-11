module.exports = {
  devtools: true,
  headless: !process.env.DEBUG,
  executablePath: process.env.CI
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
}
