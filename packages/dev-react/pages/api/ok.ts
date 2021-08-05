import { NextApiHandler } from 'next'

export default ((_req, res) => {
  res.send({
    date: process.env.DATE,
    sha: process.env.VERCEL_GIT_COMMIT_SHA ?? '-',
  })
}) as NextApiHandler
