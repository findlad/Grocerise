const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

let ssMilkPrice;
let ssMilkPage =
  "https://www.realcanadiansuperstore.ca/milk-1-mf/p/20657990_EA";
let ssMilkTarget =
  ".price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value";
let wmMilkPage =
  "https://www.walmart.ca/en/ip/Dairyland-1-Partly-skimmed-milk/6000079800122";
let wmMilkTarget = '[itemprop="price"]';
let wmMilkPrice;
let swMilkPage = "https://voila.ca/products/490731EA/details";
let swMilkTarget = ".text__Text-sc-6l1yjp-0.sc-hmjpBu.bIGwoI.jromfo";
let swMilkPrice;
let nfMilkPage = "https://voila.ca/products/490731EA/details";
let nfMilkTarget = ".text__Text-sc-6l1yjp-0.sc-hmjpBu.bIGwoI.jromfo";
let nfMilkPrice;

function getPrice(targetPage, targetClass, vendor) {
  (async () => {
    const browser = await puppeteer.launch({ headless: "New" });
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
    return price;
  })();
}

ssMilkPrice = getPrice(ssMilkPage, ssMilkTarget, "Superstore");
