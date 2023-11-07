const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

let wmTarget = '[itemprop="price"]';
let ssTarget = ".price__value";
let swTarget = ".jromfo";
let nfTarget = ".price__value";

let ssEggPrice;
let ssEggPage =
  "https://www.realcanadiansuperstore.ca/free-range-large-eggs/p/20881824001_EA";

let wmEggPrice;
let wmEggPage =
  "https://www.walmart.ca/en/ip/Farmer-s-Finest-Free-Range-Large-Brown-Eggs/6000196823906";

let swEggPrice;
let swEggPage = "https://voila.ca/products/150353EA/details";

let nfEggPrice;
let nfEggPage =
  "https://www.nofrills.ca/free-run-brown-eggs-large/p/20813628001_EA";

let ssTowelPrice;
let ssTowelPage =
  "https://www.realcanadiansuperstore.ca/paper-towel-6-12/p/21515966_EA";

let wmTowelPrice;
let wmTowelPage =
  "https://www.walmart.ca/en/ip/bounty-select-a-size-paper-towels-6-double-rolls-white-90-sheets-per-roll/6000205967050";

let swTowelPrice;
let swTowelPage = "https://voila.ca/products/5026EA/details";

let nfTowelPrice;
let nfTowelPage = "https://www.nofrills.ca/paper-towel-6-12/p/21515966_EA";

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
    await page.setGeolocation({ latitude: 51.049999, longitude: -114.066666 });
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
          .slice(0, 6);

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

wmMilkPrice = getPrice(wmMilkPage, wmTarget, "Walmart", "milk");
wmEggPrice = getPrice(wmEggPage, wmTarget, "Walmart", "egg");
wmTowelPrice = getPrice(wmTowelPage, wmTarget, "Walmart", "towel");

ssMilkPrice = getPrice(ssMilkPage, ssTarget, "Superstore", "milk");
ssEggPrice = getPrice(ssEggPage, ssTarget, "Superstore", "egg");
ssTowelPrice = getPrice(ssTowelPage, ssTarget, "Superstore", "towel");

swMilkPrice = getPrice(swMilkPage, swTarget, "Safeway", "milk");
swEggPrice = getPrice(swEggPage, swTarget, "Safeway", "egg");
swTowelPrice = getPrice(swTowelPage, swTarget, "Safeway", "towel");

nfMilkPrice = getPrice(nfMilkPage, nfTarget, "NoFrills", "milk");
nfEggPrice = getPrice(nfEggPage, nfTarget, "NoFrills", "egg");
nfTowelPrice = getPrice(nfTowelPage, nfTarget, "NoFrills", "towel");