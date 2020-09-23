describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com')
  })

  it('should display "google" text on page', async () => {
    const title = await page.title()

    expect(title).toBe('Google')
  })
})
