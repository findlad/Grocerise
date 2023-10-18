const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.nofrills.ca/milk-1-mf/p/20657990_EA");

  try {
    const textSelector =
      ".price__value selling-price-list__item__price selling-price-list__item__price--now-price__value";
    await page.waitForSelector(textSelector);

    const htmlCode = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelector).text().trim();

      return price;
    }

    const noFrillsMilkPrice = scrapePrice(htmlCode);
    console.log("NoFrills " + noFrillsMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
