const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
let superstoreMilkPrice;
let walmartMilkPrice;
let safewayMilkPrice;
let nofrillsMilkPrice;



(async () => {
  // Superstore
  const browser = await puppeteer.launch({ headless: "New" });
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

    let superstoreMilkPrice = scrapePrice(htmlCodeSs);
    console.log("Superstore " + superstoreMilkPrice);
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

      if (!Array.isArray(file.events)) {
        file.events = []; // Initialize as an empty array if it's not an array.
      }

      file.events.push({
        item: "ssmilk",
        price: superstoreMilkPrice,
        day: new Date(),
      });
      const json = JSON.stringify(file);
      console.log("Data to be written to the file:", json);
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
      return priceWm;
    }
    
    console.log("Walmart " + priceWm.substring(0, 10));
    let walmartMilkPrice = scrapePrice(htmlCodeWm);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
  fs.readFile("wmMilkHistory.json", "utf8", function (err, data) {
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
        item: "wmmilk",
        price: walmartMilkPrice,
        day: new Date(),
      });
      const json = JSON.stringify(file);
      console.log("Data to be written to the file:", json);
      fs.writeFile("wmMilkHistory.json", json, "utf8", function (err) {
        if (err) {
          console.log(err);
        } else {
          // Everything went OK!
        }
      });
    }
  });
})();

// Safeway

(async () => {
  const browser = await puppeteer.launch({ headless: "New" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 1000 });

  await page.goto("https://voila.ca/products/490731EA/details");
  const textSelectorsw = ".text__Text-sc-6l1yjp-0.sc-hmjpBu.bIGwoI.jromfo"; // Replace with the correct selector
  
  const htmlCodesw = await page.content();
  function scrapePrice(html) {
    const $ = cheerio.load(html);
    const priceWm = $(textSelectorss).text().trim();
    return pricess;
  }

  const safewayMilkPrice = scrapePrice(htmlCodesw);

  console.log("Safeway " + safewayMilkPrice);
} catch (error) {
  console.error("Error: ", error);
} finally {
  await browser.close();
}
})();
    // Read the existing JSON file
    fs.readFile("swMilkHistory.json", "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        try {
          file = JSON.parse(data);
        } catch (error) {
          // Handle the case where the file is empty or invalid JSON.
          file = { events: [] };
        }

        if (!Array.isArray(file.events)) {
          file.events = []; // Initialize as an empty array if it's not an array.
        }

        // Create the data object to be appended
        const newData = {
          item: "swmilk",
          price: safewayMilkPrice,
          day: new Date().toLocaleString(),
        };
        console.log(newData);
        // Push the new data into the events array
        file.events.push(newData);
        console.log(file.events);
        // Convert the updated data to JSON
        const json = JSON.stringify(file);

        // Write the updated JSON back to the file
        fs.writeFile("swMilkHistory.json", json, "utf8", function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Data appended to the file successfully!");
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

//NoFrills
(async () => {
  const browser = await puppeteer.launch({ headless: "New" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 1000 });

  await page.goto("https://voila.ca/products/490731EA/details");
  const textSelectornf = ".text__Text-sc-6l1yjp-0.sc-hmjpBu.bIGwoI.jromfo"; // Replace with the correct selector

   
    const htmlCodenf = await page.content();

    function scrapePrice(html) {
      const $ = cheerio.load(html);
      const pricenf = $(textSelectornf).text().trim();
      return pricenf;
    }

    const nofrillsMilkPrice = scrapePrice(htmlCodenf);

    console.log("NoFrills " + nofrillsMilkPrice);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await browser.close();
  }
})();
