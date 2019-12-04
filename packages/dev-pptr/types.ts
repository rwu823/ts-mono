import { Page } from 'puppeteer'

export type BrowserCron<T> = (page: Page) => Promise<T>
