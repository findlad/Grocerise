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

let wmBranPrice;
let wmBranPage =
  "https://www.walmart.ca/en/ip/Kellogg-s-Two-Scoops-Raisin-Bran-Cereal-Family-Size-625g/6000204516210";

let ssBranPrice;
let ssBranPage =
  "https://www.realcanadiansuperstore.ca/raisin-bran-family-size-cereal/p/21430755_EA";

let swBranPrice;
let swBranPage = "https://voila.ca/products/875435EA/details";

let nfBranPrice;
let nfBranPage =
  "https://www.nofrills.ca/raisin-bran-family-size-cereal/p/21430755_EA";

let coopBranPrice;
let coopBranPage = "https://shoponline.calgarycoop.com/Midtown#/product/32516";

let ssPizzaPrice;
let ssPizzaPage =
  "https://www.realcanadiansuperstore.ca/giuseppe-pizzeria-rising-crust-pepperoni-pizza/p/21106361_EA";

let wmPizzaPrice;
let wmPizzaPage =
  "https://www.walmart.ca/en/ip/Dr-Oetker-Giuseppe-Pizzeria-Rising-Crust-Pepperoni-Pizza/6000198536763";

let swPizzaPrice;
let swPizzaPage = "https://voila.ca/products/819557EA/details";

let nfPizzaPrice;
let nfPizzaPage =
  "https://www.nofrills.ca/giuseppe-pizzeria-rising-crust-pepperoni-pizza/p/21106361_EA";

let coopPizzaPrice;
let coopPizzaPage = "https://shoponline.calgarycoop.com/Midtown#/product/6001";

let ssChipsPrice;
let ssChipsPage =
  "https://www.realcanadiansuperstore.ca/oven-baked-bar-b-q-flavoured-potato-chips/p/21434125_EA";

let wmChipsPrice;
let wmChipsPage =
  "https://www.walmart.ca/en/ip/Lay-s-Oven-Baked-Potato-Chips-BBQ/5HYMR7FOVBPG";

let swChipsPrice;
let swChipsPage = "https://voila.ca/products/890971EA/details";

let nfChipsPrice;
let nfChipsPage =
  "https://www.nofrills.ca/oven-baked-bar-b-q-flavoured-potato-chips/p/21434125_EA";

let coopChipsPrice;
let coopChipsPage = "https://shoponline.calgarycoop.com/Midtown#/product/32844";

function getPrice(targetPage, target, vendor, type) {
  (async () => {
    let price = "";
    //console.log(targetPage + " " + target + " " + vendor + " " + type);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setGeolocation({ latitude: 51.049999, longitude: -114.066666 });
    await page.setViewport({ width: 1700, height: 1000 });
    await page.goto(targetPage);
    try {
      const textSelector = target;
      await delay(10000);
      const htmlCode = await page.content();

      // fs.writeFile("html.txt", htmlCode, "utf-8"); //dumps the html to check

      function scrapePrice(html) {
        const $ = cheerio.load(html);
        let priceTxt = $(target)
          .text()
          .trim()
          .replace(/[^-.0-9]/g, "");
        // console.log(priceTxt);
        priceTxt = Number(priceTxt.slice(0, 5)).toFixed(2);

        // console.log(priceTxt);
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

// ssChipsPrice = getPrice(ssChipsPage, ssTarget, "Superstore", "chips");
// ssPizzaPrice = getPrice(ssPizzaPage, ssTarget, "Superstore", "pizza");
// ssBranPrice = getPrice(ssBranPage, ssTarget, "Superstore", "bran");

// swChipsPrice = getPrice(swChipsPage, swTarget, "Safeway", "chips");
// swPizzaPrice = getPrice(swPizzaPage, swTarget, "Safeway", "pizza");
// swBranPrice = getPrice(swBranPage, swTarget, "Safeway", "bran");

nfChipsPrice = getPrice(nfChipsPage, nfTarget, "NoFrills", "chips");
nfPizzaPrice = getPrice(nfPizzaPage, nfTarget, "NoFrills", "pizza");
// nfBranPrice = getPrice(nfBranPage, nfTarget, "NoFrills", "bran");

// wmChipsPrice = getPrice(wmChipsPage, wmTarget, "Walmart", "chips");
// wmPizzaPrice = getPrice(wmPizzaPage, wmTarget, "Walmart", "pizza");
// wmBranPrice = getPrice(wmBranPage, wmTarget, "Walmart", "bran");

// coopChipsPrice = getPrice(coopChipsPage, coopTarget, "Coop", "chips");
// coopPizzaPrice = getPrice(coopPizzaPage, coopTarget, "Coop", "pizza");
// coopBranPrice = getPrice(coopBranPage, coopTarget, "Coop", "bran");
