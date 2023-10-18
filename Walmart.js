const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://www.walmart.ca/en/ip/Dairyland-1-Partly-skimmed-milk/6000079800122"
  );

  try {
    const textSelector = "$"; // Replace with the correct selector
    await page.waitForSelector(textSelector);

    const htmlCode = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelector).text().trim();
      console.log("Walmart " + price.substring(0, 10));
      return price;
    }

    const walmartMilkPrice = scrapePrice(htmlCode);
    console.log("walmart " + walmartMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
