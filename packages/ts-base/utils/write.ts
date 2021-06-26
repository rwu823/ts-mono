import c from 'chalk'
import { createWriteStream } from 'fs'
import stream from 'stream'

class Write {
  private text: string

  constructor(text: string) {
    this.text = text
  }

  to(fileName: string) {
    return new Promise((resolve, reject) => {
      const sr = new stream.Readable()
      // eslint-disable-next-line unicorn/no-useless-undefined
      sr.push(this.text, undefined)

      sr.pipe(createWriteStream(fileName))
        .on('finish', (res: string) => {
          console.log(`Updated ${c.cyan(fileName)}`)
          resolve(res)
        })
        .on('error', reject)
    })
  }
}

export default (text: string) => new Write(text)
