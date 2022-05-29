require('dotenv').config();
const handlerPage = require('./handler-page');
const extractionData = require('./extraction-data');

module.exports = async (q, browserConfig) => {
  const page = await handlerPage(browserConfig);

  await page.click(process.env.API_INICIAL_SELECTOR)
  
  await page.type(process.env.API_INPUT_FORM, q)
  
  await page.activeNavigation(process.env.API_SUBMIT_BUTTON, 'click');
  
  console.log('Search in ', await page.native.url());
  
  await page.waitForSelector(process.env.API_EXTRACTION_LIST, 20000);
  
  return await extractionData(page.body());
}