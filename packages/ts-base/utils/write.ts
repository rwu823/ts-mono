import { createWriteStream } from 'fs'
import stream from 'stream'
import c from 'chalk'

class Write {
  private text: string

  constructor(text: string) {
    this.text = text
  }

  to(fileName: string) {
    return new Promise((resolve, reject) => {
      const sr = new stream.Readable()
      sr.push(this.text)
      sr.push(null)

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
