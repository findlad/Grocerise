const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  // Superstore
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://www.tntsupermarket.com/eng/76380101-dairyland-1-milk-jug.html"
  );

  try {
    const textSelector = ".productFullDetail-productPrice-Aod";
    await page.waitForSelector(textSelector);

    const htmlCode = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelector).text().trim();

      return price;
    }

    const standtMilkPrice = scrapePrice(htmlCode);
    console.log("tandt " + tandtMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
