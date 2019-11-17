import { BrowserCron } from '../types'

declare const $: JQueryStatic

const example: BrowserCron = async page => {
  await page.goto('https://google.com')

  console.log('done with google')
}

export default example
