import { enableMapSet, produce } from 'immer'
enableMapSet()

import type * as All from './api'

const a = new Map()

console.log(
  produce(a, (draft) => {
    draft.set('key', 'abc')
  }),
  a,
)
const stockDividend = ({
  cashRatio = 0,
  cashDividend = 0,
  stockDividend = 0,
}) => {
  const price = cashDividend / (cashRatio / 100)
  const toCash = (stockDividend * price) / 10

  return ((toCash + cashDividend) / price) * 100
}

console.log(
  stockDividend({
    stockDividend: 1.14,
    cashDividend: 0.507,
    cashRatio: 1.58,
  }),

  stockDividend({
    stockDividend: 1.209,
    cashDividend: 0.302,
    cashRatio: 1.19,
  }),
)
