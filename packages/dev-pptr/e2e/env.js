// puppeteer_environment.js
const NodeEnvironment = require('jest-environment-node')
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')

module.exports = class extends NodeEnvironment {
  async setup() {
    await super.setup()

    const browser = await puppeteer.connect({
      browserWSEndpoint: global.BROWSER_INSTANCE.wsEndpoint(),
    })

    this.global.page = await browser.newPage()
  }

  async teardown() {
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}
