const puppeteer = require('puppeteer');
module.exports = async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu',
    ]
  });

  return browser;
}