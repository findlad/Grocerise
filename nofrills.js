const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

(async () => {
  const browser = await puppeteer.launch({ headless: "New" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 1000 });

  await page.goto("https://www.nofrills.ca/skim-milk/p/20658003_EA");
  const textSelectornf =
    ".price__value selling-price-list__item__price selling-price-list__item__price--now-price__value"; // Replace with the correct selector

  let pricenf; // Define pricenf here

  try {
    await delay(5000);

    const htmlCodenf = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      return $(textSelectornf).text().trim(); // No need to store it in pricenfw
    }

    pricenf = scrapePrice(htmlCodenf); // Assign the result to pricenf
    console.log("NoFrills " + pricenf);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
