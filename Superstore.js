const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

(async () => {
  // Superstore
  const browser = await puppeteer.launch({ headless: "New" });
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
  let ssmilktoday = [
    {
      item: "ssmilk",
      price: superstoreMilkPrice,
      day: new Date().toLocaleString(),
    },
  ];
  fs.readFile("ssMilkHistory.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let file;
      try {
        file = JSON.parse(data);
      } catch (error) {
        // Handle the case where the file is empty or invalid JSON.
        file = { events: [] };
      }
      file.events.push({
        item: "ssmilk",
        price: superstoreMilkPrice,
        day: new Date(),
      });
      const json = JSON.stringify(file);

      fs.writeFile("ssMilkHistory.json", json, "utf8", function (err) {
        if (err) {
          console.log(err);
        } else {
          // Everything went OK!
        }
      });
    }
  });
})();
