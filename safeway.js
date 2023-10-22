const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// safeway

(async () => {
  const browser = await puppeteer.launch({ headless: "New" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 1000 });

  await page.goto("https://voila.ca/products/490731EA/details");

  try {
    const textSelectorsw = ".text__Text-sc-6l1yjp-0.sc-hmjpBu.bIGwoI.jromfo"; // Replace with the correct selector

    await delay(5000);

    const htmlCodesw = await page.content();
    //console.log(htmlCodesw);
    /*fs.writeFile(
      "swhtml.txt",
      htmlCodesw,
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
      const pricesw = $(textSelectorsw).text().trim();
      console.log("Safeway " + pricesw.substring(0, 10));
      return pricesw;
    }

    const safewayMilkPrice = scrapePrice(htmlCodesw);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
