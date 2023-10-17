const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  // Superstore
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://www.realcanadiansuperstore.ca/milk-1-mf/p/20657990_EA"
  );

  try {
    const textSelector =
      ".price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value";
    await page.waitForSelector(textSelector);

    const htmlCode = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelector).text().trim();

      return price;
    }

    const superstoreMilkPrice = scrapePrice(htmlCode);
    console.log("Superstore " + superstoreMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();

// T and T

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://www.tntsupermarket.com/eng/76380101-dairyland-1-milk-jug.html"
  );

  try {
    const textSelector = ".inline-flex flex-column"; // Replace with the correct selector
    await page.waitForSelector(textSelector);

    const htmlCode = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelector).text().trim();
      console.log("Walmart " + price.substring(0, 10));
      return price;
    }

    const walmartMilkPrice = scrapePrice(htmlCode);
    console.log("walmart " + walmartMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();

(async () => {
  // Safeway
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://voila.ca/products/490731EA/details");

  try {
    const textSelector = ".text__Text-sc-6l1yjp-0 sc-jOxuqd bIGwoI gJweLJ"; // Replace with the correct selector
    await page.waitForSelector(textSelector);

    const htmlCode = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelector).text().trim();
      console.log("Safeway " + price.substring(0, 10));
      return price;
    }

    const SafewayMilkPrice = scrapePrice(htmlCode);
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
    const textSelector =
      ".price__value selling-price-list__item__price selling-price-list__item__price--now-price__value";
    await page.waitForSelector(textSelector);

    const htmlCode = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelector).text().trim();

      return price;
    }

    const noFrillsMilkPrice = scrapePrice(htmlCode);
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
    const textSelector = ".productFullDetail-productPrice-Aod";
    await page.waitForSelector(textSelector);

    const htmlCode = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const price = $(textSelector).text().trim();

      return price;
    }

    const tandtMilkPrice = scrapePrice(htmlCode);
    console.log("T and T " + tandtMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
