import { Page } from 'puppeteer'

export type BrowserCron = (page: Page) => Promise<void>
