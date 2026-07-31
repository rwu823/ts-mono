export interface JSON {
  stat: string
  date: string
  title: string
  hints: string
  fields: string[]
  data: string[][]
  groups: Group[]
  total: number
  notes: string[]
  selectType: string
}

export interface Group {
  start: number
  span: number
  title: string
}

const res = await fetch(
  `https://www.twse.com.tw/rwd/zh/marginTrading/TWTA1U?response=json&_=${String(Date.now())}`,
  {
    method: 'GET',
  },
)

const json = await res.json()

const checkJson = (json: unknown): json is JSON =>
  json !== null && typeof json === 'object' && 'data' in json

if (checkJson(json)) {
  const list = json.data.filter((it) => {
    const note = it.at(-1)

    if (typeof note === 'string') {
      const notes = [...note]

      if (notes.includes('T')) {
        return true
      }
    }
  })

  console.log(
    // eslint-disable-next-line prettier/prettier
`[${json.date}] 不可質押的股票，共計 ${String(list.length)}
---
${list.map((it) => [it.at(0), it.at(1)]).join('\n')}
`,
  )
}
