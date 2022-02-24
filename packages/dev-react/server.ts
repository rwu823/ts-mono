import 'node:worker_threads'

import next from 'next'

import child from 'node:child_process'
import fs from 'node:fs'
import { createServer } from 'node:https'
import { parse } from 'node:url'
import { promisify } from 'node:util'

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

const readFile = promisify(fs.readFile)
const exec = promisify(child.exec)

const port = process.env.PORT ?? 3000

;(async () => {
  await app.prepare()

  await exec(`
  mkcert -install
  mkcert localhost
  `).catch((error) => {
    if (error) {
      console.error(error)
    }
  })

  const [key, cert] = await Promise.all([
    readFile(`${__dirname}/localhost-key.pem`),
    readFile(`${__dirname}/localhost.pem`),
  ])

  createServer({ key, cert }, (req, res) => {
    const parsedUrl = parse(req.url!, true)

    handle(req, res, parsedUrl)
  }).listen(port, () => {
    console.log(`> Ready on https://localhost:${port}`)
  })
})()
