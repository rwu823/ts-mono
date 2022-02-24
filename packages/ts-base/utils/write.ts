import { createWriteStream } from 'node:fs'
import c from 'picocolors'

class Write {
  private text: string

  constructor(text: string) {
    this.text = text
  }

  to(fileName: string) {
    return new Promise((resolve, reject) => {
      const ws = createWriteStream(fileName)
      ws.write(this.text)
      ws.end()
      ws.on('finish', (res: string) => {
        console.log(`Updated ${c.cyan(fileName)}`)
        resolve(res)
      }).on('error', reject)
    })
  }
}

export default (text: string) => new Write(text)
