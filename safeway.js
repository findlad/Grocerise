const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://voila.ca/products/490731EA/details");

  try {
    const textSelector = ".text__Text-sc-6l1yjp-0 sc-hmjpBu bIGwoI jromfo";
    await page.waitForNavigation({
      waitUntil: "networkidle0",
    });
    const htmlCode = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelector).text().trim();

      return price;
    }

    const safewayMilkPrice = scrapePrice(htmlCode);
    console.log("safeway " + superstoreMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
