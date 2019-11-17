/* eslint-disable camelcase, no-eval, func-names, prefer-rest-params  */

const globalThis = (1, eval)('this')

const isBrowser =
  Object.prototype.toString.call(globalThis.document) ===
    '[object HTMLDocument]' || process.browser

export type PageView = Partial<{
  page_title: string
  page_path: string
  send_page_view: boolean
}>

export type GAOptions = Partial<{
  debug: boolean
}>

export type GAType = 'js' | 'config'

function gtag(_type: GAType, ..._args: any[]): void {
  globalThis.dataLayer = globalThis.dataLayer || []

  globalThis.dataLayer.push(arguments)
}

export class GA {
  private readonly id: string

  private readonly options: GAOptions

  private reTryTimes: number = 0

  private isScriptLoaded: boolean = false

  constructor(id: string, options?: GAOptions) {
    this.id = id
    this.options = options || {}

    if (
      !isBrowser ||
      document.querySelector(
        'script[src^="https://www.googletagmanager.com/gtag/js"]',
      )
    ) {
      return
    }

    const gaScript = document.createElement('script')
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    gaScript.async = true

    document.head.appendChild(gaScript)

    gaScript.onload = () => {
      this.isScriptLoaded = true
      gtag('js', new Date())
    }
  }

  pageView(options: PageView = {}) {
    if (!isBrowser) return

    const opts = {
      page_title: document.title,
      page_path: window.location.pathname,
      ...options,
    }

    if (this.isScriptLoaded) {
      gtag('config', this.id, opts)

      if (this.options.debug) {
        console.log('[ga]', opts)
      }
    } else {
      if (this.reTryTimes > 3) return
      setTimeout(() => {
        this.pageView(opts)
        this.reTryTimes += 1
      }, 500)
    }
  }
}

export default GA
