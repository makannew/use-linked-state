const timeout = process.env.SLOWMO ? 30000 : 10000

beforeAll(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' })
})

describe('Example App E2E test', () => {
  //
  it(
    'has correct title',
    async () => {
      const title = await page.title()
      expect(title).toBe('use-linked-state')
    },
    timeout
  )
  //
  it(
    'has two input field',
    async () => {
      const firstInput = await page.$('#first-input')
      const secondInput = await page.$('#second-input')
      expect(firstInput).not.toBe(null)
      expect(secondInput).not.toBe(null)
    },
    timeout
  )
  //
  it(
    'input fields states are synced',
    async () => {
      const sampleValue = 'Hello'
      const firstInput = await page.$('#first-input')
      const secondInput = await page.$('#second-input')
      //
      await firstInput.click()
      await firstInput.type(sampleValue)
      const firstValue = await page.evaluate((elem) => elem.value, firstInput)
      const secondValue = await page.evaluate((elem) => elem.value, secondInput)

      expect(firstValue).toBe(sampleValue)
      expect(secondValue).toBe(sampleValue)
    },
    timeout
  )
})
