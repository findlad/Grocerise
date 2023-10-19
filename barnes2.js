const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  // Superstore
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://pageskensington.com/item/qu7Mmis64A90SKHOncusjw");

  try {
    const textSelector =
      ".a-size-medium a-color-price header-price a-text-normal";
    await page.waitForSelector(textSelector);

    const htmlCode = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelector).text().trim();

      return price;
    }

    const superstoreMilkPrice = scrapePrice(htmlCode);
    console.log("Superstore " + superstoreMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
