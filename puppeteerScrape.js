const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

(async () => {
  // Superstore
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  //const displaySs = document.getElementById("supMilk");
  await page.goto(
    "https://www.realcanadiansuperstore.ca/milk-1-mf/p/20657990_EA"
  );

  try {
    const textSelectorSs =
      ".price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value";
    await page.waitForSelector(textSelectorSs);

    const htmlCodeSs = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelectorSs).text().trim();

      return price;
    }

    const superstoreMilkPrice = scrapePrice(htmlCodeSs);
    console.log("Superstore " + superstoreMilkPrice);
    //displaySs.innerHTML = superstoreMilkPrice;
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
  //save ssmilk price date to existing file somehow
  let ssmilktoday = [{ item: ssmilk, price: superstoreMilkPrice, day: Date }];
  fs.readFile("ssMilkHistory.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      const file = JSON.parse(data);
      file.events.push({ item: ssmilk, price: superstoreMilkPrice, day: Date });
      const json = JSON.stringify(file);

      fs.writeFile("ssMilkHistory.json", json, "utf8", function (err) {
        if (err) {
          console.log(err);
        } else {
          //Everything went OK!
        }
      });
    }
  });
})();

// walmart

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 1000 });

  await page.goto(
    "https://www.walmart.ca/en/ip/Dairyland-1-Partly-skimmed-milk/6000079800122"
  );

  try {
    const textSelectorWm = '[itemprop="price"]'; // Replace with the correct selector

    await delay(5000);

    const htmlCodeWm = await page.content();
    //console.log(htmlCodeWm);
    /*fs.writeFile(
      "wmhtml.txt",
      htmlCodeWm,
      {
        encoding: "utf8",
        flag: "w",
        mode: 0o666,
      },
      (err) => {
        if (err) {
          console.error(err); // Use console.error to log errors.
        } else {
          console.log("File written successfully");
          console.log("The written file has the following contents:");
          console.log(fs.readFileSync("wmhtml.txt", "utf8"));
        }
      }
    );*/

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const priceWm = $(textSelectorWm).text().trim();
      console.log("Walmart " + priceWm.substring(0, 10));
      return priceWm;
    }

    const walmartMilkPrice = scrapePrice(htmlCodeWm);
    console.log("walmart " + walmartMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();

(async () => {
  // Safeway
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("https://voila.ca/products/490731EA/details");

  try {
    const textSelectorSw = ".text__Text-sc-6l1yjp-0 sc-hmjpBu bIGwoI jromfo"; // Replace with the correct selector
    await page.waitForSelector(textSelectorSw);
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    //const htmlCodeSw = await page.content();
    await delay(5000);

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const priceSw = $(textSelectorSw).text().trim();
      console.log("Safeway " + priceSw.substring(0, 10));
      return priceSw;
    }

    const SafewayMilkPrice = scrapePrice(htmlCodeSw);
    console.log("Safeway " + SafewayMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();

//NoFrills
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.nofrills.ca/milk-1-mf/p/20657990_EA");

  try {
    const textSelectorNf =
      ".price__value selling-price-list__item__price selling-price-list__item__price--now-price__value";
    //await page.waitForSelector(textSelectorNf);
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    //const htmlCodeNf = await page.content();
    await delay(5000);

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const priceNf = $(textSelectorNf).text().trim();

      return priceNf;
    }

    const noFrillsMilkPrice = scrapePrice(htmlCodeNf);
    console.log("NoFrills " + noFrillsMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();

// t and t
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://www.tntsupermarket.com/eng/76380101-dairyland-1-milk-jug.html"
  );

  try {
    const textSelectorTt = ".productFullDetail-productPrice-Aod";
    //await page.waitForSelector(textSelectorTt);
    //await page.waitForNavigation({ waitUntil: "networkidle2" });
    await delay(5000);

    const htmlCodeTt = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const priceTt = $(textSelectorTt).text().trim();

      return priceTt;
    }

    const tandtMilkPrice = scrapePrice(htmlCodeTt);
    console.log("T and T " + tandtMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
