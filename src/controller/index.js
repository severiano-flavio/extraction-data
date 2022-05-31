const webScraping = require('../service/web-scraping');
const browser = require('../../config/browser');

module.exports = (app) => {
  app.get('/', async (req, res) => {
      res.status(200).send("Digite /scrap ou /crawl para começar a extração");
  });
}
