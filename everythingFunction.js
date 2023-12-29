import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env.MONGO_URL);
const connectionString = process.env.MONGO_URL;

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const dataStructure = new mongoose.Schema({
  item: String,
  shop: String,
  cost: Number,
  day: Date,
});

function getPrice(targetPage, target, vendor, type) {
  (async () => {
    let price;
    let todaysArray;
    //console.log(targetPage + " " + target + " " + vendor + " " + type);
    // const executablePath =
    //   "./node_modules/puppeteer-core/lib/esm/puppeteer/node/ChromeLauncher";
    const browser = await puppeteer.launch({
      headless: "new",
      // executablePath: executablePath,
    });
    const page = await browser.newPage();
    // await page.setGeolocation({ latitude: 51.049999, longitude: -114.066666 });
    await page.setViewport({ width: 1700, height: 1000 });
    await page.goto(targetPage);
    try {
      // const textSelector = target;
      await delay(10000);
      const htmlCode = await page.content();
      // console.log(htmlCode);
      // fs.writeFile("html.txt", htmlCode, "utf-8", (err) => {
      //   if (err) {
      //     console.error("error writing file", err);
      //   } else {
      //     console.log("file written fine");
      //   }
      // }); //dumps the html to check

      const $ = cheerio.load(htmlCode);
      let price = $(target)
        .text()
        .trim()
        .replace(/[^-.0-9]/g, "");
      // console.log("prenumber " + price);
      price = Number(price.slice(0, 5)).toFixed(2);

      if (price != 0) {
        const db = await mongoose.connect(connectionString);
        const priceData = db.model("priceData", dataStructure);

        let todaysPriceData = await priceData.create({
          item: type,
          shop: vendor,
          cost: price,
          day: new Date(),
        });

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
        await mongoose.disconnect();
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

export { delay };

let ssTarget = ".price__value";
let swTarget = ".cnwOeN";
let wmTarget = '[itemprop="price"]';
let nfTarget = ".price__value";
let coopTarget = ".product-price";

let swEggPrice;
let swEggPage = "https://voila.ca/products/150353EA/details";
let swTowelPrice;
let swTowelPage = "https://voila.ca/products/5026EA/details";
let swMilkPrice;
let swMilkPage = "https://voila.ca/products/490731EA/details";
let swCokeZeroPrice;
let swCokeZeroPage = "https://voila.ca/products/450610EA/details";
let swChickenPrice;
let swChickenPage = "https://voila.ca/products/340841KG/details";
let swRicePrice;
let swRicePage = "https://voila.ca/products/160395EA/details";
let swPizzaPrice;
let swPizzaPage = "https://voila.ca/products/819557EA/details";
let swBranPrice;
let swBranPage = "https://voila.ca/products/875435EA/details";
let swChipsPrice;
let swChipsPage = "https://voila.ca/products/890971EA/details";
let swCoffeePrice;
let swCoffeePage = "https://voila.ca/products/280087EA/details";
let swButterPrice;
let swButterPage = "https://voila.ca/products/483559EA/details";

let ssBranPrice;
let ssBranPage =
  "https://www.realcanadiansuperstore.ca/raisin-bran-family-size-cereal/p/21430755_EA";
let ssPizzaPrice;
let ssPizzaPage =
  "https://www.realcanadiansuperstore.ca/giuseppe-pizzeria-rising-crust-pepperoni-pizza/p/21106361_EA";
let ssChipsPrice;
let ssChipsPage =
  "https://www.realcanadiansuperstore.ca/oven-baked-bar-b-q-flavoured-potato-chips/p/21434125_EA";
let ssCokeZeroPrice;
let ssCokeZeroPage =
  "https://www.realcanadiansuperstore.ca/zero-sugar-bottle/p/20316026005_EA";
let ssChickenPrice;
let ssChickenPage =
  "https://www.realcanadiansuperstore.ca/chicken-breast-boneless-skinless-3-pack/p/21340952_EA";
let ssRicePrice;
let ssRicePage =
  "https://www.realcanadiansuperstore.ca/premium-long-grain-rice/p/20074783001_EA";
let ssEggPrice;
let ssEggPage =
  "https://www.realcanadiansuperstore.ca/free-range-large-eggs/p/20881824001_EA";
let ssTowelPrice;
let ssTowelPage =
  "https://www.realcanadiansuperstore.ca/paper-towel-6-12/p/21515966_EA";
let ssMilkPrice;
let ssMilkPage =
  "https://www.realcanadiansuperstore.ca/milk-1-mf/p/20657990_EA";
let ssCoffeePrice;
let ssCoffeePage =
  "https://www.realcanadiansuperstore.ca/original-fine-grind-coffee/p/20875767_EA";
let ssButterPrice;
let ssButterPage =
  "https://www.realcanadiansuperstore.ca/unsalted-butter/p/20316543002_EA";

let wmEggPrice;
let wmEggPage =
  "https://www.walmart.ca/en/ip/goldegg-free-run-large-eggs/6000196823370";
let wmTowelPrice;
let wmTowelPage =
  "https://www.walmart.ca/en/ip/bounty-select-a-size-paper-towels-6-double-rolls-white-90-sheets-per-roll/6000205967050";
let wmMilkPrice;
let wmMilkPage =
  "https://www.walmart.ca/en/ip/Dairyland-1-Partly-skimmed-milk/6000079800122";
let wmCokeZeroPrice;
let wmCokeZeroPage =
  "https://www.walmart.ca/en/ip/Coca-Cola-Zero-Sugar-2L-Bottle/10214488";
let wmChickenPrice;
let wmChickenPage =
  "https://www.walmart.ca/en/ip/prime-boneless-skinless-chicken-breast-raised-without-antibiotics/6000203053980?from=/search";
let wmRicePrice;
let wmRicePage =
  "https://www.walmart.ca/en/ip/Minute-Rice-Premium-Instant-Long-Grain-White-Rice-1-4-kg/10299508?from=/search";
let wmBranPrice;
let wmBranPage =
  "https://www.walmart.ca/en/ip/Kellogg-s-Two-Scoops-Raisin-Bran-Cereal-Family-Size-625g/6000204516210";
let wmPizzaPrice;
let wmPizzaPage =
  "https://www.walmart.ca/en/ip/Dr-Oetker-Giuseppe-Pizzeria-Rising-Crust-Pepperoni-Pizza/6000198536763";
let wmChipsPrice;
let wmChipsPage =
  "https://www.walmart.ca/en/ip/Lay-s-Oven-Baked-Potato-Chips-BBQ/5HYMR7FOVBPG";
let wmCoffeePrice;
let wmCoffeePage =
  "https://www.walmart.ca/en/ip/Tim-Hortons-Fine-Grind-Coffee/6000187769641";
let wmButterPrice;
let wmButterPage =
  "https://www.walmart.ca/en/ip/Great-Value-Unsalted-Butter/10054933";

let nfEggPrice;
let nfEggPage =
  "https://www.nofrills.ca/free-run-brown-eggs-large/p/20813628001_EA";
let nfTowelPrice;
let nfTowelPage = "https://www.nofrills.ca/paper-towel-6-12/p/21515966_EA";
let nfMilkPrice;
let nfMilkPage = "https://www.nofrills.ca/milk-1-mf/p/20657990_EA";
let nfCokeZeroPrice;
let nfCokeZeroPage =
  "https://www.nofrills.ca/zero-sugar-bottle/p/20316026005_EA";
let nfChickenPrice;
let nfChickenPage =
  "https://www.nofrills.ca/chicken-breast-boneless-skinless-3-pack/p/21340952_EA";
let nfRicePrice;
let nfRicePage =
  "https://www.nofrills.ca/premium-long-grain-rice/p/20074783001_EA";
let nfBranPrice;
let nfBranPage =
  "https://www.nofrills.ca/raisin-bran-family-size-cereal/p/21430755_EA";
let nfPizzaPrice;
let nfPizzaPage =
  "https://www.nofrills.ca/giuseppe-pizzeria-rising-crust-pepperoni-pizza/p/21106361_EA";
let nfChipsPrice;
let nfChipsPage =
  "https://www.nofrills.ca/oven-baked-bar-b-q-flavoured-potato-chips/p/21434125_EA";
let nfCoffeePrice;
let nfCoffeePage =
  "https://www.nofrills.ca/original-fine-grind-coffee/p/20875767_EA";
let nfButterPrice;
let nfButterPage = "https://www.nofrills.ca/unsalted-butter/p/20316543002_EA";

let coopEggPrice;
let coopEggPage = "https://shoponline.calgarycoop.com/crowfoot#/product/563";
let coopTowelPrice;
let coopTowelPage =
  "https://shoponline.calgarycoop.com/crowfoot#/product/17720";
let coopMilkPrice;
let coopMilkPage = "https://shoponline.calgarycoop.com/crowfoot#/product/211";
let coopCokeZeroPrice;
let coopCokeZeroPage =
  "https://shoponline.calgarycoop.com/Midtown#/product/3878";
let coopChickenPrice;
let coopChickenPage =
  "https://shoponline.calgarycoop.com/Midtown#/product/38061";
let coopRicePrice;
let coopRicePage = "https://shoponline.calgarycoop.com/Midtown#/product/119";
let coopBranPrice;
let coopBranPage = "https://shoponline.calgarycoop.com/Midtown#/product/32516";
let coopPizzaPrice;
let coopPizzaPage = "https://shoponline.calgarycoop.com/Midtown#/product/6001";
let coopChipsPrice;
let coopChipsPage = "https://shoponline.calgarycoop.com/Midtown#/product/32844";
let coopCoffeePrice;
let coopCoffeePage =
  "https://shoponline.calgarycoop.com/crowfoot#/product/9470";
let coopButterPrice;
let coopButterPage =
  "https://shoponline.calgarycoop.com/crowfoot#/product/2200";

const arrayOfCode = [
  {
    code: 'ssMilkPrice = getPrice(ssMilkPage, ssTarget, "Superstore", "milk");',
  },
  {
    code: 'ssEggPrice = getPrice(ssEggPage, ssTarget, "Superstore", "egg");',
  },
  {
    code: 'ssTowelPrice = getPrice(ssTowelPage, ssTarget, "Superstore", "towel");',
  },
  {
    code: 'ssRicePrice = getPrice(ssRicePage, ssTarget, "Superstore", "rice");',
  },
  {
    code: 'ssChickenPrice = getPrice(ssChickenPage, ssTarget, "Superstore", "chicken");',
  },
  {
    code: 'ssCokeZeroPrice = getPrice(ssCokeZeroPage, ssTarget, "Superstore", "coke");',
  },
  {
    code: 'ssChipsPrice = getPrice(ssChipsPage, ssTarget, "Superstore", "chips");',
  },
  {
    code: 'ssPizzaPrice = getPrice(ssPizzaPage, ssTarget, "Superstore", "pizza");',
  },
  {
    code: 'ssBranPrice = getPrice(ssBranPage, ssTarget, "Superstore", "bran");',
  },
  {
    code: 'ssCoffeePrice = getPrice(ssCoffeePage, ssTarget, "Superstore", "coffee");',
  },
  {
    code: 'ssButterPrice = getPrice(ssButterPage, ssTarget, "Superstore", "butter");',
  },
  { code: 'swMilkPrice = getPrice(swMilkPage, swTarget, "Safeway", "milk");' },
  { code: 'swEggPrice = getPrice(swEggPage, swTarget, "Safeway", "egg");' },
  {
    code: 'swTowelPrice = getPrice(swTowelPage, swTarget, "Safeway", "towel");',
  },
  { code: 'swRicePrice = getPrice(swRicePage, swTarget, "Safeway", "rice");' },
  {
    code: 'swChickenPrice = getPrice(swChickenPage, swTarget, "Safeway", "chicken");',
  },
  {
    code: 'swCokeZeroPrice = getPrice(swCokeZeroPage, swTarget, "Safeway", "coke");',
  },
  {
    code: 'swChipsPrice = getPrice(swChipsPage, swTarget, "Safeway", "chips");',
  },
  {
    code: 'swPizzaPrice = getPrice(swPizzaPage, swTarget, "Safeway", "pizza");',
  },
  { code: 'swBranPrice = getPrice(swBranPage, swTarget, "Safeway", "bran");' },
  {
    code: 'swCoffeePrice = getPrice(swCoffeePage, swTarget, "Safeway", "coffee");',
  },
  {
    code: 'swButterPrice = getPrice(swButterPage, swTarget, "Safeway", "butter");',
  },
  { code: 'wmMilkPrice = getPrice(wmMilkPage, wmTarget, "Walmart", "milk");' },
  { code: 'wmEggPrice = getPrice(wmEggPage, wmTarget, "Walmart", "egg");' },
  {
    code: 'wmTowelPrice = getPrice(wmTowelPage, wmTarget, "Walmart", "towel");',
  },
  { code: 'wmRicePrice = getPrice(wmRicePage, wmTarget, "Walmart", "rice");' },
  {
    code: 'wmChickenPrice = getPrice(wmChickenPage, wmTarget, "Walmart", "chicken");',
  },
  {
    code: 'wmCokeZeroPrice = getPrice(wmCokeZeroPage, wmTarget, "Walmart", "coke");',
  },
  {
    code: 'wmChipsPrice = getPrice(wmChipsPage, wmTarget, "Walmart", "chips");',
  },
  {
    code: 'wmPizzaPrice = getPrice(wmPizzaPage, wmTarget, "Walmart", "pizza");',
  },
  { code: 'wmBranPrice = getPrice(wmBranPage, wmTarget, "Walmart", "bran");' },
  {
    code: 'wmCoffeePrice = getPrice(wmCoffeePage, wmTarget, "Walmart", "coffee");',
  },
  {
    code: 'wmButterPrice = getPrice(wmButterPage, wmTarget, "Walmart", "butter");',
  },
  { code: 'nfMilkPrice = getPrice(nfMilkPage, nfTarget, "NoFrills", "milk");' },
  { code: 'nfEggPrice = getPrice(nfEggPage, nfTarget, "NoFrills", "egg");' },
  {
    code: 'nfTowelPrice = getPrice(nfTowelPage, nfTarget, "NoFrills", "towel");',
  },
  { code: 'nfRicePrice = getPrice(nfRicePage, nfTarget, "NoFrills", "rice");' },
  {
    code: 'nfChickenPrice = getPrice(nfChickenPage, nfTarget, "NoFrills", "chicken");',
  },
  {
    code: 'nfCokeZeroPrice = getPrice(nfCokeZeroPage, nfTarget, "NoFrills", "coke");',
  },
  {
    code: 'nfChipsPrice = getPrice(nfChipsPage, nfTarget, "NoFrills", "chips");',
  },
  {
    code: 'nfPizzaPrice = getPrice(nfPizzaPage, nfTarget, "NoFrills", "pizza");',
  },
  { code: 'nfBranPrice = getPrice(nfBranPage, nfTarget, "NoFrills", "bran");' },
  {
    code: 'nfCoffeePrice = getPrice(nfCoffeePage, nfTarget, "NoFrills", "coffee");',
  },
  {
    code: 'nfButterPrice = getPrice(nfButterPage, nfTarget, "NoFrills", "butter");',
  },
  { code: 'coopEggPrice = getPrice(coopEggPage, coopTarget, "Coop", "egg");' },
  {
    code: 'coopMilkPrice = getPrice(coopMilkPage, coopTarget, "Coop", "milk");',
  },
  {
    code: 'coopTowelPrice = getPrice(coopTowelPage, coopTarget, "Coop", "towel");',
  },
  {
    code: 'coopRicePrice = getPrice(coopRicePage, coopTarget, "Coop", "rice");',
  },
  {
    code: 'coopChickenPrice = getPrice(coopChickenPage, coopTarget, "Coop", "chicken");',
  },
  {
    code: 'coopCokeZeroPrice = getPrice(coopCokeZeroPage, coopTarget, "Coop", "coke");',
  },
  {
    code: 'coopChipsPrice = getPrice(coopChipsPage, coopTarget, "Coop", "chips");',
  },
  {
    code: 'coopPizzaPrice = getPrice(coopPizzaPage, coopTarget, "Coop", "pizza");',
  },
  {
    code: 'coopBranPrice = getPrice(coopBranPage, coopTarget, "Coop", "bran");',
  },
  {
    code: 'coopCoffeePrice = getPrice(coopCoffeePage, coopTarget, "Coop", "coffee");',
  },
  {
    code: 'coopButterPrice = getPrice(coopButterPage, coopTarget, "Coop", "butter");',
  },
];

const randomisedArray = arrayOfCode.sort(() => Math.random() - 0.5);

async function runCodeWithDelay() {
  for (const element of randomisedArray) {
    const code = element.code;
    eval(code);
    await new Promise((resolve) => setTimeout(resolve, 60000));
  }
}

runCodeWithDelay();
