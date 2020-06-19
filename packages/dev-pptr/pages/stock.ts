/* eslint-disable camelcase */

import { BrowserCron } from '../types'
import * as api from './apis/notion'

interface NotionBlocks {
  recordMap: RecordMap
}

interface RecordMap {
  block: Record<string, Block>
}

interface Block {
  role: string
  value: {
    id: string
    version: number
    type: string
    created_time: number
    last_edited_time: number
    parent_id: string
    parent_table: string
    alive: boolean
    created_by_table: string
    created_by_id: string
    last_edited_by_table: string
    last_edited_by_id: string
    shard_id: number
    space_id: string
    properties: Properties
  }
}

interface Properties {
  '4$_5': string[][]
  '?)n>': string[][]
  title: string[][]
}

const stock: BrowserCron<string[]> = async (page) => {
  const [res] = await Promise.all([
    api.notion<NotionBlocks>({
      method: 'POST',
      url: '/queryCollection',
      data: {
        collectionId: 'ca53f164-052c-48fa-bc49-9a62e2680055',
        collectionViewId: '3130aa7d-0dfa-4942-ac86-857f231f82c2',
        query: { aggregations: [{ property: 'title', aggregator: 'count' }] },
        loader: {
          type: 'table',
          limit: 70,
          searchQuery: '',
          userTimeZone: 'Asia/Taipei',
          userLocale: 'zh-tw',
          loadContentCover: true,
        },
        mode: 'cors',
        credentials: 'include',
      },
    }),
    page.goto(
      'https://goodinfo.tw/StockInfo/StockList.asp?RPT_TIME=&MARKET_CAT=%E6%99%BA%E6%85%A7%E9%81%B8%E8%82%A1&INDUSTRY_CAT=%E6%9C%88KD+20~50%E9%BB%83%E9%87%91%E4%BA%A4%E5%8F%89%40%40%E6%9C%88KD%E7%9B%B8%E4%BA%92%E4%BA%A4%E5%8F%89%40%40KD+20~50%E9%BB%83%E9%87%91%E4%BA%A4%E5%8F%89',
    ),
  ])

  const myListIDs = Object.values(res.recordMap.block)
    .map((block) => {
      return block.value?.properties?.title[0][0]
    })
    .filter(Boolean)

  const stockIDs = await page.$$eval(
    '#tblStockList tbody > tr > td:first-child a',
    (elList) =>
      elList.map((el) => (el.firstChild as Text)?.data).filter(Boolean),
  )
  const myListIDsSet = new Set(myListIDs)
  return stockIDs.filter((id) => myListIDsSet.has(id))
}

export default stock
