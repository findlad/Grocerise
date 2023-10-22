const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));


function getPrice(targetPage,targetClass,vendor)
(async () => {
  const browser = await puppeteer.launch({ headless: 'New' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 1000 });
  await page.goto(targetPage);
  try {
    const textSelectorWm = targetClass;
    await delay(5000);
    const htmlCode = await page.content();
    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const priceWm = $(textSelectorWm).text().trim();
      return priceWm;
    }
    const price = scrapePrice(htmlCode);
    console.log(vendor + " " + price);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
  return price
})();
