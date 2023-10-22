const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

(async () => {
  const browser = await puppeteer.launch({ headless: "New" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 1000 });

  await page.goto("https://voila.ca/products/490731EA/details");
  const textSelectorsw = ".text__Text-sc-6l1yjp-0.sc-hmjpBu.bIGwoI.jromfo"; // Replace with the correct selector

  let pricesw; // Define pricesw here

  try {
    await delay(5000);

    const htmlCodesw = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      return $(textSelectorsw).text().trim(); // No need to store it in pricesw
    }

    pricesw = scrapePrice(htmlCodesw); // Assign the result to pricesw
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();

    //save swmilk price date to existing file somehow
  let ssmilktoday = [
    {
      item: "swmilk",
      price: pricesw,
      day: new Date().toLocaleString(),
    },
  ];
  fs.readFile("swMilkHistory.json", "utf8", function (err, data) {
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

      if (!Array.isArray(file.events)) {
        file.events = []; // Initialize as an empty array if it's not an array.
      }

      file.events.push({
        item: "ssmilk",
        price: pricesw,
        day: new Date(),
      });
      const json = JSON.stringify(file);
      console.log("Data to be written to the file:", json);
      fs.writeFile("swMilkHistory.json", json, "utf8", function (err) {
        if (err) {
          console.log(err);
        } else {
          // Everything went OK!
        }
      });
    }
  });
});
