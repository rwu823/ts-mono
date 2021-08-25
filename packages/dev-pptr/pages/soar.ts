import { chromium } from 'playwright'

const qs = new URLSearchParams({
  ParentUniqueGUID: '0c95aaec-4015-4748-b66a-1d2b137f07b3',
  CompanyID: 'DO56617EB8VNVY8D797F08SB',
})

const config = {
  ID: 'M0153',
  passwd: 'Qw720823',
}

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(
    `https://scsservices.azurewebsites.net/Login.aspx?${qs.toString()}`,
  )

  await page.type('input[name="edtUserID"]', config.ID)
  await page.type('input[name="edtPassword"]', config.passwd)

  await page.click('text=Login Login')

  await page.goto(
    'https://scsservices.azurewebsites.net/HRM/ATT/AttEmpOnlineSwipe.aspx',
  )

  await (new Date().getHours() <= 15
    ? page.click('#btnOnSwipe')
    : page.click('#btnOffSwipe'))

  await page.waitForTimeout(1000)

  await browser.close()
})()
