const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

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
