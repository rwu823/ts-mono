const testOBSAccount = {
  id: 'tw_obs_streamer_web',
  passwd: 'qqqqqqqq',
}

const waitForAction = async (
  selector: string,
  event: 'click' | 'type' = 'click',
  ...eventArgs: unknown[]
) => {
  await page.waitForSelector(selector)

  return page[event](selector, ...eventArgs)
}
const doLogin = async ({ id, passwd }: { id: string; passwd: string }) => {
  const formSelector = '#login-modal'

  if (!page.url().endsWith(formSelector)) {
    await page.click('button[data-ga-event-label="header_login"]')
    await page.waitForSelector(formSelector)
  }

  await page.type(`${formSelector} input[name="openID"]`, id)
  await page.type(`${formSelector} input[name="password"]`, passwd)

  return Promise.all([
    page.click('button[type=submit]'),
    page.waitForNavigation(),
  ])
}

const stopStreaming = async () => {
  const isStreaming = await page
    .waitForSelector('button[data-testid=stopStreaming]', {
      timeout: 5 * 1000,
    })
    .catch(() => false)

  if (isStreaming) {
    await waitForAction('button[data-testid=stopStreaming]', 'click')
    await waitForAction(
      'button[data-testid=pictureModalConfirmButton]',
      'click',
    )
  }
}

describe('Live Stream Settings', () => {
  beforeAll(async () => {
    await page.goto('https://sta.17.live')
    await doLogin(testOBSAccount)
    await page.goto(`${page.url()}/settings/live`)
    await stopStreaming()
  })

  afterAll(stopStreaming)

  it('should see the live setting form', async () => {
    const captionEl = await page.waitForSelector('#caption')

    expect(captionEl).toBeTruthy()
  })

  it('should create streaming success', async () => {
    await page.type('#caption', 'e2e testing')

    await page.click('button:has-text("Create streaming")')
    const stopStreamingButton = await page.waitForSelector(
      'button[data-testid=stopStreaming]',
    )

    expect(stopStreamingButton).toBeTruthy()
  })

  it('should stop streaming success', async () => {
    await stopStreaming()
    await page.waitForTimeout(5 * 1000)
    await page.reload()
    const createStreamButton = await page.waitForSelector(
      'button[data-testid=createStreaming]',
    )

    expect(createStreamButton).toBeTruthy()
  })
})
