import { ChromiumBrowser } from 'playwright'

declare const $: JQueryStatic

type RectObject = {
  id: number
  title: string
  price: string
  address: string
  info?: string
}

let oldObjectList = {}

const rent591 = async (browser: ChromiumBrowser) => {
  const page = await browser.newPage()
  await page.goto(
    'https://rent.591.com.tw/?kind=1&region=1&section=5&rentprice=,40000&area=20,&shape=2,1',
  )

  await page.click('#area-box-body .pull-left.area-select-active')

  const pages = await page.$$eval(
    '#container .pageBar .pageNum-form',
    (a) => a.length,
  )

  const getObjectList = async () =>
    page.$$eval('#content .listInfo', (uls) =>
      Object.fromEntries(
        uls.map((ul) => {
          const $info = $(ul).find('.infoContent')
          const $a = $info.find('h3 a')
          const $em = $info.find('p.lightBox em')
          const $price = $(ul).find('.price i')

          const id = ($a
            .attr('href')
            .trim()
            .match(/(\d+)\.html$/) || [])[1]

          return [
            id,
            {
              id: +id,
              address: $em.text().trim(),
              title: $a.text().trim(),
              price: $price.text().trim(),
              info: $info
                .find('p.lightBox')
                .eq(0)
                .text()
                .trim()
                .replace(/\n|\s/g, ''),
            },
          ]
        }),
      ),
    )

  const objectList = await getObjectList()

  await [...Array(pages)]
    .reduce<Promise<any>>(
      (p) =>
        p.then(async () => {
          await Promise.all([
            page.waitForResponse((res) =>
              res
                .url()
                .startsWith('https://rent.591.com.tw/home/data/listExposure'),
            ),
            page.click('#container .pageBar a.pageNext'),
          ])

          Object.assign(objectList, await getObjectList())
        }),
      Promise.resolve(),
    )
    .catch(console.error)

  const newObjectList =
    Object.keys(oldObjectList).length > 0
      ? Object.entries(objectList).reduce((obj, [id, o]) => {
          if (!(id in oldObjectList)) {
            Object.assign(obj, {
              [id]: o,
            })
          }

          return obj
        }, {})
      : objectList

  oldObjectList = objectList

  if (Object.keys(newObjectList).length > 0) {
    return newObjectList
  }

  return null
}

export default rent591
