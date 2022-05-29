const webCrawler = require("../service/web-crawler");

module.exports = async (app) => {
  app.get('/crawl', async ({query}, res, next) => {
    if (!query.website) {
      const err = new Error("Required query website missing");
      err.status = 400;
      res.status(400).send(err.message);
    }
    try {
      const response = await webCrawler(query.website);
      res.status(200).send(response);

    } catch(err) {
      res.status(500).send(err.message);
    }
  })
}