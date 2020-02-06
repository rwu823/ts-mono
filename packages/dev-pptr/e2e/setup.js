const puppeteer = require('puppeteer-core')

module.exports = async () => {
  global.BROWSER_INSTANCE = await puppeteer.launch({
    devtools: true,
    headless: !process.env.DEBUG,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })
}
