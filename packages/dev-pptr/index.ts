import puppeteer from 'puppeteer-core'

import example from './pages/example'
import rent591 from './pages/rent591'
import { cron } from './utils'

const { NODE_ENV = 'development' } = process.env
const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV === 'production'

puppeteer
  .launch({
    devtools: true,
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',

    ...(isProd && {
      devtools: false,
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
    }),
  })
  .then(async Browser => {
    const browser = await puppeteer.connect({
      browserWSEndpoint: Browser.wsEndpoint(),
      ...(isDev && {
        slowMo: 250,
      }),
    })

    cron(async () => {
      const page = await browser.newPage()

      return () => rent591(page)
    }, 30e3)

    cron(async () => {
      const page = await browser.newPage()

      return () => example(page)
    }, 5e3)
  })
  .catch(console.error)
