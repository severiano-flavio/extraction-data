const express = require('express');
const crawler = require('../src/controller/crawl');
const scraping = require('../src/controller/scrap');

const app = express();
const port = process.env.PORT || 3000;

const listener = app.listen(port, () => {
  console.log('app is running on port: ' + listener.address().port);
})

crawler(app);
scraping(app);

module.exports = app;