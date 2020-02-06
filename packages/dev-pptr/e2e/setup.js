const puppeteer = require('puppeteer-core')

module.exports = async () => {
  global.BROWSER_INSTANCE = await puppeteer.launch({
    devtools: true,
    headless: !process.env.DEBUG,
    executablePath: process.env.CI
      ? '/usr/bin/google-chrome'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })
}
