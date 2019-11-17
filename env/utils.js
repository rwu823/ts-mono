/* eslint-disable no-new-func */
const fs = require('fs')

exports.read = file =>
  new Promise(done => {
    let s = ''
    const rs = fs.createReadStream(file)
    rs.on('data', c => {
      s += c
    }).on('end', () => done(s))
  })

exports.parseJSON = jsonc => new Function(`return ${jsonc}`)()

exports.write = (fiile, str = '') =>
  new Promise(resolve => {
    const ws = fs.createWriteStream(fiile)

    ws.write(str)

    ws.end()

    ws.on('close', resolve)
  })
