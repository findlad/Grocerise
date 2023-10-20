const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

(async () => {
  // Superstore
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
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

    // Read the existing JSON file
    fs.readFile("ssMilkHistory.json", "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const file = JSON.parse(data);

        // Add today's price to the history
        file.push({
          item: "ssmilk",
          price: superstoreMilkPrice,
          day: new Date(),
        });

        // Write the updated JSON back to the file
        const json = JSON.stringify(file);

        fs.writeFile("ssMilkHistory.json", json, "utf8", function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Price history updated successfully!");
          }
        });
      }
    });
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
