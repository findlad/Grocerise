const puppeteer = require("puppeteer");
require("events").EventEmitter.prototype._maxListeners = 100;

const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

let ssTarget = ".price__value";
let wmTarget = '[itemprop="price"]';
let swTarget = ".cnwOeN";
let nfTarget = ".price__value";
let coopTarget = ".product-price";

let wmCokeZeroPrice;
let wmCokeZeroPage =
  "https://www.walmart.ca/en/ip/Coca-Cola-Zero-Sugar-2L-Bottle/10214488";

let ssCokeZeroPrice;
let ssCokeZeroPage =
  "https://www.realcanadiansuperstore.ca/zero-sugar-bottle/p/20316026005_EA";

let swCokeZeroPrice;
let swCokeZeroPage = "https://voila.ca/products/450610EA/details";

let nfCokeZeroPrice;
let nfCokeZeroPage =
  "https://www.nofrills.ca/zero-sugar-bottle/p/20316026005_EA";

let coopCokeZeroPrice;
let coopCokeZeroPage =
  "https://shoponline.calgarycoop.com/Midtown#/product/3878";

let ssChickenPrice;
let ssChickenPage =
  "https://www.realcanadiansuperstore.ca/chicken-breast-boneless-skinless-3-pack/p/21340952_EA";

let wmChickenPrice;
let wmChickenPage =
  "https://www.walmart.ca/en/ip/prime-boneless-skinless-chicken-breast-raised-without-antibiotics/6000203053980?from=/search";

let swChickenPrice;
let swChickenPage = "https://voila.ca/products/340841KG/details";

let nfChickenPrice;
let nfChickenPage =
  "https://www.nofrills.ca/chicken-breast-boneless-skinless-3-pack/p/21340952_EA";

let coopChickenPrice;
let coopChickenPage =
  "https://shoponline.calgarycoop.com/Midtown#/product/38061";

let ssRicePrice;
let ssRicePage =
  "https://www.realcanadiansuperstore.ca/premium-long-grain-rice/p/20074783001_EA";

let wmRicePrice;
let wmRicePage =
  "https://www.walmart.ca/en/ip/Minute-Rice-Premium-Instant-Long-Grain-White-Rice-1-4-kg/10299508?from=/search";

let swRicePrice;
let swRicePage = "https://voila.ca/products/160395EA/details";

let nfRicePrice;
let nfRicePage =
  "https://www.nofrills.ca/premium-long-grain-rice/p/20074783001_EA";

let coopRicePrice;
let coopRicePage = "https://shoponline.calgarycoop.com/Midtown#/product/119";

function getPrice(targetPage, target, vendor, type) {
  (async () => {
    let price = "";
    //console.log(targetPage + " " + target + " " + vendor + " " + type);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // await page.setGeolocation({ latitude: 51.049999, longitude: -114.066666 });
    await page.setViewport({ width: 1700, height: 1000 });
    // console.log("Chromium executable path:", browser.executablePath);
    await page.goto(targetPage);

    try {
      const textSelector = target;
      await delay(15000);
      const htmlCode = await page.content();
      // console.log(htmlCode);
      // fs.writeFile("html.txt", htmlCode, "utf-8", (err) => {
      //   if (err) {
      //     console.error("error writing file", err);
      //   } else {
      //     console.log("file written fine");
      //   }
      // }); //dumps the html to check

      function scrapePrice(html) {
        const $ = cheerio.load(html);
        let priceTxt = $(target)
          .text()
          .trim()
          .replace(/[^-.0-9]/g, "");
        // console.log("prenumber " + priceTxt);
        priceTxt = Number(priceTxt.slice(0, 5)).toFixed(2);

        // console.log("postnumber " + priceTxt);
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

// ssRicePrice = getPrice(ssRicePage, ssTarget, "Superstore", "rice");
// ssChickenPrice = getPrice(ssChickenPage, ssTarget, "Superstore", "chicken");
// ssCokeZeroPrice = getPrice(ssCokeZeroPage, ssTarget, "Superstore", "coke");

// swRicePrice = getPrice(swRicePage, swTarget, "Safeway", "rice");
// swChickenPrice = getPrice(swChickenPage, swTarget, "Safeway", "chicken");
// swCokeZeroPrice = getPrice(swCokeZeroPage, swTarget, "Safeway", "coke");

// nfRicePrice = getPrice(nfRicePage, nfTarget, "NoFrills", "rice");
nfChickenPrice = getPrice(nfChickenPage, nfTarget, "NoFrills", "chicken");
nfCokeZeroPrice = getPrice(nfCokeZeroPage, nfTarget, "NoFrills", "coke");

// wmRicePrice = getPrice(wmRicePage, wmTarget, "Walmart", "rice");
// wmChickenPrice = getPrice(wmChickenPage, wmTarget, "Walmart", "chicken");
// wmCokeZeroPrice = getPrice(wmCokeZeroPage, wmTarget, "Walmart", "coke");

// coopRicePrice = getPrice(coopRicePage, coopTarget, "Coop", "rice");
// coopChickenPrice = getPrice(coopChickenPage, coopTarget, "Coop", "chicken");
// coopCokeZeroPrice = getPrice(coopCokeZeroPage, coopTarget, "Coop", "coke");
