const webScraping = require('../service/web-scraping');
const browser = require('../../config/browser');

module.exports = (app) => {
  app.get('/scrap', async (req, res, next) => {
    if (!req.query.q) {
      const error = new Error('Required query q missing');
      error.status = 400;
      next(error.message);
    };

    const browserConfig = await browser();
    
    try {
      const data = await webScraping(req.query.q, browserConfig);
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send("Something broke");
    } finally {
      browserConfig.close();
    }
  });
}
