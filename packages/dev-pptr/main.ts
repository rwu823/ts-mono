import { chromium } from 'playwright'

import rent591 from './pages/rent591'
import stock from './pages/stock'
import { cron } from './utils/cron'

const { NODE_ENV = 'development' } = process.env
const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV === 'production'

chromium
  .launch({
    // executablePath:
    //   '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',

    ...(isProd && {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
      // executablePath: '/usr/bin/chromium-browser',
    }),
  })
  .then(async (browser) => {
    // const browser = await puppeteer.connect({
    //   browserWSEndpoint: Browser.wsEndpoint(),
    //   ...(isDev && {
    //     slowMo: 250,
    //   }),
    // })

    // const monthlyKdStock = await stock(browser)
    // console.info(monthlyKdStock)

    await browser.close()

    // cron(async () => {
    //   const page = await browser.newPage()

    //   return async () => {
    //     console.log(`goto 591 ${new Date()}`)
    //     const newObjects = await rent591(page)

    //     if (newObjects) {
    //       console.log(newObjects)
    //     }
    //   }
    // }, 30e3)

    // cron(async () => {
    //   const page = await browser.newPage()

    //   return () => example(page)
    // }, 5e3)
  })
  .catch(console.error)
