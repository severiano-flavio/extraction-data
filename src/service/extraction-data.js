module.exports = async (page) => {
   const data = await page.$$eval('div.search__products > div.product-card', el => el
 .map(product => {
   return {
     title: product.querySelector('[data-test-id="product-card-title"]').innerText,
     link: product.querySelector('a').href,
     code: product.querySelector('[data-test-id="product-card-code"]')?.innerText || null,
     image: product.querySelector('.b-image-wrapper > img').src
   }
 } ));

 return data;
}