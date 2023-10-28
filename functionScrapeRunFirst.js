const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

let ssEggPrice;
let ssEggPage =
  "https://www.realcanadiansuperstore.ca/free-range-large-eggs/p/20881824001_EA";
let ssTarget = ".price__value";

let wmEggPrice;
let wmEggPage =
  "https://www.walmart.ca/en/ip/Farmer-s-Finest-Free-Range-Large-Brown-Eggs/6000196823906?from=/search";
let wmTarget = '[itemprop="price"]';

let swEggPrice;
let swEggPage = "https://voila.ca/products/150353EA/details";
let swTarget = ".jromfo";

let nfEggPrice;
let nfEggPage =
  "https://www.nofrills.ca/free-range-large-eggs/p/20881824001_EA";
let nfTarget = ".price__value";

let ssMilkPrice;
let ssMilkPage =
  "https://www.realcanadiansuperstore.ca/milk-1-mf/p/20657990_EA";

let wmMilkPrice;
let wmMilkPage =
  "https://www.walmart.ca/en/ip/Dairyland-1-Partly-skimmed-milk/6000079800122";

let swMilkPrice;
let swMilkPage = "https://voila.ca/products/490731EA/details";

let nfMilkPrice;
let nfMilkPage = "https://www.nofrills.ca/skim-milk/p/20658003_EA";

function getPrice(targetPage, target, vendor, type) {
  (async () => {
    let price = "";
    //console.log(targetPage + " " + target + " " + vendor + " " + type);

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    //await page.setGeolocation({ latitude: 51.049999, longitude: -114.066666 });
    await page.setViewport({ width: 1300, height: 1000 });
    await page.goto(targetPage);
    try {
      const textSelector = target;
      await delay(5000);
      const htmlCode = await page.content();

      // fs.writeFile("html.txt", htmlCode, "utf-8"); //dumps the html to check

      function scrapePrice(html) {
        const $ = cheerio.load(html);
        const priceTxt = $(target)
          .text()
          .trim()
          .replace(/\$/g, " ")
          .slice(0, 10);

        //console.log(priceTxt);
        return priceTxt;
      }

      let price = scrapePrice(htmlCode);
      if (price != 0) {
        todaysArray = {
          item: type,
          shop: vendor,
          cost: price,
          day: new Date(),
        };
        let existingFile = fs.readFileSync("priceHistory.json", "utf-8");
        let existingArray = JSON.parse(existingFile);
        existingArray.push(todaysArray);
        existingFile = JSON.stringify(existingArray);
        fs.writeFileSync("priceHistory.json", existingFile, "utf-8");
      }
      console.log(vendor + " " + type + " $" + price);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      await browser.close();
    }

    return price;
  })();
}

ssMilkPrice = getPrice(ssMilkPage, ssTarget, "Superstore", "milk");

wmMilkPrice = getPrice(wmMilkPage, wmTarget, "Walmart", "milk");

swMilkPrice = getPrice(swMilkPage, swTarget, "Safeway", "milk");

nfMilkPrice = getPrice(nfMilkPage, nfTarget, "NoFrills", "milk");

ssEggPrice = getPrice(ssEggPage, ssTarget, "Superstore", "egg");

wmEggPrice = getPrice(wmEggPage, wmTarget, "Walmart", "egg");

swEggPrice = getPrice(swEggPage, swTarget, "Safeway", "egg");

nfEggPrice = getPrice(nfEggPage, nfTarget, "NoFrills", "egg");
