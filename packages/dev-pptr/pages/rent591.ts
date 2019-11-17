import { BrowserCron } from '../types'

declare const $: JQueryStatic

type RectObject = {
  id: number
  title: string
  price: string
  address: string
  info?: string
}

let oldObjectList = {}

const rent591: BrowserCron = async page => {
  console.log('goto 591')
  await page.goto(
    'https://rent.591.com.tw/?kind=1&region=1&section=5&rentprice=,40000&area=20,&shape=2,1',
  )

  try {
    if (await page.$('#area-box-body .pull-left.area-select-active')) {
      await page.click('#area-box-body .pull-left.area-select-active')
    }
  } finally {
    const pages = await page.$$eval(
      '#container .pageBar .pageNum-form',
      a => a.length,
    )

    const getObjectList = async () =>
      page.$$eval('#content .listInfo', uls =>
        uls.reduce<{
          [id: string]: RectObject
        }>((o, ul) => {
          const $info = $(ul).find('.infoContent')
          const $a = $info.find('h3 a')
          const $em = $info.find('p.lightBox em')
          const $price = $(ul).find('.price i')

          const id = ($a
            .attr('href')!
            .trim()
            .match(/(\d+)\.html$/) || [])[1]

          o[id] = {
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
          }

          return o
        }, {}),
      )

    const objectList = await getObjectList()

    await [...Array(pages)]
      .reduce<Promise<any>>(
        p =>
          p.then(async () => {
            await Promise.all([
              page.waitForNavigation(),
              page.click('#container .pageBar a.pageNext'),
            ])

            Object.assign(objectList, await getObjectList())
          }),
        Promise.resolve(),
      )
      .catch(console.error)

    const newObjectList = Object.keys(oldObjectList).length
      ? Object.entries(objectList).reduce((obj, [id, o]) => {
          if (!(id in oldObjectList)) {
            Object.assign(obj, {
              [id]: o,
            })
          }

          return obj
        }, {})
      : objectList

    if (Object.keys(newObjectList).length) {
      console.log({ newObjectList })
    }

    oldObjectList = objectList
  }
}

export default rent591
