import type { NextApiHandler } from 'next'

import fetch from 'isomorphic-unfetch'

export default (async (req, res) => {
  if (req.method === 'GET') {
    const json = await fetch(`https://stock-ai.com/dailyDataQuery`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: 'a=c&symbolCode=^TWII&from=2019-06-04&to=2020-06-04&token=edc513b301d0416f35ce4423520dd6b129d5f421a43e3c4bdfff558a856fd7e8',
    }).then((r) => r.json())

    res.json(json.rows)
  }
}) as NextApiHandler
