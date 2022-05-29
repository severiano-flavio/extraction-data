module.exports = async (browser, website = process.env.API_WEBSITE, timeout = 0) => {
  const page = await browser.newPage();
  await page.goto(website, {
    waitUntil: 'load',
    timeout
  })

  return {
    native: page,
    body() {
      return page;
    },
    async click(selector) {
      await page.waitForSelector(selector)
      await page.click(selector);
      return this;
    },
    async type(selector, text) {
      await page.waitForSelector(selector);
      await page.type(selector, text)
      return this;
    },
    async activeNavigation(selector, action) {
      await Promise.all([
        page.waitForNavigation(),
        page[action](selector)
      ]);
      return this;
    },
    async waitForSelector(selector, timeout) {
      await page.waitForSelector(selector, { timeout });
      return this;
    }
  }
}