import { NextApiHandler } from 'next'

export default ((_req, res) => {
  res.send({ OK: 1 })
}) as NextApiHandler
