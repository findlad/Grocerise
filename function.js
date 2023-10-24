const puppeteer = require("puppeteer");
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

async function getPrice(targetPage, target, vendor, type) {
  const browser = await puppeteer.launch({ headless: true }); // Set headless to true for a headless browser
  const page = await browser.newPage();
  await page.setGeolocation({ latitude: 51.049999, longitude: -114.066666 });
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  try {
    await page.goto(targetPage);
    await delay(6000);

    const htmlCode = await page.content();
    const $ = cheerio.load(htmlCode);
    const price = $(target).text().trim();

    console.log(vendor + " " + price);

    // Create an object with the data
    const data = {
      item: type,
      shop: vendor,
      price: price,
      day: new Date(),
    };

    // Write the data to the "MilkHistory.json" file
    fs.readFile("MilkHistory.json", "utf8", (err, jsonData) => {
      if (err) {
        console.error(err);
      } else {
        let file;
        try {
          file = JSON.parse(jsonData);
        } catch (error) {
          // Handle the case where the file is empty or invalid JSON.
          file = { events: [] };
        }
        file.events.push(data);

        fs.writeFile(
          "MilkHistory.json",
          JSON.stringify(file),
          "utf8",
          (writeErr) => {
            if (writeErr) {
              console.error(writeErr);
            } else {
              console.log("Data written to MilkHistory.json");
            }
          }
        );
      }
    });

    return price;
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
}

// Call getPrice within an async context to wait for it to complete
(async () => {
  ssMilkPrice = await getPrice(ssMilkPage, ssMilkTarget, "Superstore", "milk");
  wmMilkPrice = await getPrice(wmMilkPage, wmMilkTarget, "Walmart", "milk");
  swMilkPrice = await getPrice(swMilkPage, swMilkTarget, "Safeway", "milk");
  nfMilkPrice = await getPrice(nfMilkPage, nfMilkTarget, "NoFrills", "milk");
})();
