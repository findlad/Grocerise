const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

let bestBuyTcl8Price;
let bestBuyTcl8Page =
  "https://www.bestbuy.ca/en-ca/product/tcl-65-qm-class-4k-uhd-hdr-qled-smart-google-tv-65qm850g-ca-2023/16693220?source=search&adSlot=1";
let bestBuyTarget = ".3B6QJ ";

function getPrice(targetPage, target, vendor, type) {
  (async () => {
    let price = "";
    //console.log(targetPage + " " + target + " " + vendor + " " + type);

    const browser = await puppeteer.launch({ headless: "New" });
    const page = await browser.newPage();
    //await page.setGeolocation({ latitude: 51.049999, longitude: -114.066666 });
    //await page.setViewport({ width: 1300, height: 1000 });
    await page.goto(targetPage);
    try {
      const textSelector = target;
      await delay(6000);
      const htmlCode = await page.content();

      fs.writeFile("html.txt", htmlCode); //dumps the html to check

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

bestBuyTcl8Price = getPrice(
  bestBuyTcl8Page,
  bestBuyTarget,
  "Best Buy",
  "TCL Q8"
);
