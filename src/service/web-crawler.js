const browserConfig = require('../../config/browser')

module.exports = async (website) => {

  const browser = await browserConfig();

  const registry = {};
  let queue = [website];

  while (queue.length > 0) {
    const url = queue[queue.length - 1];
    console.log("current url", url);
    const page = await browser.newPage();
    await page.goto(url);
    registry[url] = await page.$eval("*", (el) => el.innerText);
    queue.pop();
    console.log("queue length", queue);

    const hrefs = await page.$$eval("a", (anchorEls) =>
      anchorEls.map((a) => a.href)
    );

    const filteredHrefs = hrefs.filter(
      (href) => href.startsWith(website) && registry[href] === undefined
    );
    const uniqueHrefs = [...new Set(filteredHrefs)];
    queue.push(...uniqueHrefs);
    queue = [...new Set(queue)];

    await page.close();
  }

  browser.close();

  return registry;
};