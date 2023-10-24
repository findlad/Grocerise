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
let nfMilkPage = "https://www.nofrills.ca/skim-milk/p/20658003_EA";
let nfMilkTarget =
  ".price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value";
let nfMilkPrice;

function getPrice(targetPage, target, vendor, type) {
  (async () => {
    let price = "";
    const browser = await puppeteer.launch({ headless: "New" });
    const page = await browser.newPage();
    await page.setGeolocation({ latitude: 51.049999, longitude: -114.066666 });
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.goto(targetPage);
    try {
      const textSelector = target;
      await delay(6000);
      const htmlCode = await page.content();
      function scrapePrice(html) {
        const $ = cheerio.load(html);
        const price = $(textSelector).text().trim();
        return price;
      }
      const price = scrapePrice(htmlCode);
      console.log(vendor + " " + price);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      await browser.close();
    }
  })();
  fs.readFile("MilkHistory.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let file;
      try {
        file = JSON.parse(data);
      } catch (error) {
        // Handle the case where the file is empty or invalid JSON.
        file = { events: [] };
      }
      file.events.push({
        item: type,
        shop: vendor,
        price: price,
        day: new Date(),
      });
      const json = JSON.stringify(file);
      
      fs.writeFile("MilkHistory.json", json, "utf8", function (err) {
        if (err) {
          console.log(err);
        } else {
          // Everything went OK!
        }
      });
      return price;
    }
  });
}();


ssMilkPrice = getPrice(ssMilkPage, ssMilkTarget, "Superstore", "milk");
wmMilkPrice = getPrice(wmMilkPage, wmMilkTarget, "Walmart", "milk");
swMilkPrice = getPrice(swMilkPage, swMilkTarget, "Safeway", "milk");
nfMilkPrice = getPrice(nfMilkPage, nfMilkTarget, "NoFrills", "milk");
