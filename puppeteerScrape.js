const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

(async () => {
  // Superstore
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const displaySs = document.getElementById("supMilk");
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
    displaySs.innerHTML = superstoreMilkPrice;
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
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
    const textSelectorWm = "span.inline-flex flex-column"; // Replace with the correct selector
    await page.waitForSelector(textSelectorWm);
    //await scrollPageToBottom(page);
    //await page.waitForNetworkIdle(page,3000,0);
    //await page.waitForNavigation({ waitUntil: "networkidle2" });
    //await page.waitFor(5000);
    //await scrollPageToBottom(page);
    //await autoScroll(page);

    const htmlCodeWm = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const priceWm = $(textSelectorWm).text().trim();
      console.log("Walmart " + priceWm.substring(0, 10));
      return priceWm;
    }
    //console.log(htmlCode);
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

    const htmlCodeSw = await page.content();

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
    const htmlCodeNf = await page.content();

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
    await page.waitForSelector(textSelectorTt);
    //await page.waitForNavigation({ waitUntil: "networkidle2" });

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
