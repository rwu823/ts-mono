import 'worker_threads'

import next from 'next'

import child from 'child_process'
import fs from 'fs'
import { createServer } from 'https'
import { parse } from 'url'
import { promisify } from 'util'

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

      process.exit(1)
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
