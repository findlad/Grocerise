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

export async function getPrice(targetPage, target, vendor, type) {
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
      await delay(5000);
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
