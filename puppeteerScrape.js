const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.realcanadiansuperstore.ca/milk-1-mf/p/20657990_EA"
  );

  try {
    // Use single or double quotes to specify the selector
    const textSelector = await page.waitForSelector(
      ".price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value"
    );

    const htmlCode = await page.content();
    console.log("code", htmlCode);

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(
        ".price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value"
      )
        .text()
        .trim();
      console.log(price.substring(0, 10));
      return price;
    }

    const Price = scrapePrice(htmlCode);
    console.log(Price);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();