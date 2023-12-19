import mongoose from "mongoose";
import dotenv from "dotenv";
import fs, { readFile, readFileSync } from "fs";

dotenv.config();

const connectionString = process.env.MONGO_URL;
const response = fs.readFileSync("priceHistory.json", "utf-8");
const priceArray = JSON.parse(response);
const db = await mongoose.connect(connectionString);

const dataStructure = new mongoose.Schema({
  item: String,
  shop: String,
  cost: Number,
  day: Date,
});

const record = db.model("priceData", dataStructure);

for (const element of priceArray) {
  try {
    // console.log(element);
    await record.create({
      item: element.item,
      shop: element.shop,
      cost: element.cost,
      day: element.day,
    });
  } catch (error) {
    console.error("Error creating record:", error);
  }
}

await mongoose.disconnect();
