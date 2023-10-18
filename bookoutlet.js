const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://bookoutlet.ca/products/9780385660044B/a-short-history-of-nearly-everything"
  );

  try {
    const textSelector = ".jss1209";
    //await page.waitForSelector(textSelector);
    await page.waitForNavigation({
      waitUntil: "networkidle2",
    });

    const htmlCode = await page.content();
    //console.log(htmlCode);
    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelector).text().trim();

      return price;
    }

    const superstoreMilkPrice = scrapePrice(htmlCode);
    console.log("book " + superstoreMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
