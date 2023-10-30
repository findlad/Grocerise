const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

let ssTarget = ".price__value";
let wmTarget = '[itemprop="price"]';
let swTarget = ".jromfo";
let nfTarget = ".price__value";

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

function getPrice(targetPage, target, vendor, type) {
  (async () => {
    let price = "";
    //console.log(targetPage + " " + target + " " + vendor + " " + type);

    const browser = await puppeteer.launch({ headless: "New" });
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

ssRicePrice = getPrice(ssRicePage, ssTarget, "Superstore", "rice");
ssChickenPrice = getPrice(ssChickenPage, ssTarget, "Superstore", "chicken");

swRicePrice = getPrice(swRicePage, swTarget, "Safeway", "rice");
swChickenPrice = getPrice(swChickenPage, swTarget, "Safeway", "chicken");

wmRicePrice = getPrice(wmRicePage, wmTarget, "Walmart", "rice");
wmChickenPrice = getPrice(wmChickenPage, wmTarget, "Walmart", "chicken");

nfRicePrice = getPrice(nfRicePage, nfTarget, "NoFrills", "rice");
nfChickenPrice = getPrice(nfChickenPage, nfTarget, "NoFrills", "chicken");
