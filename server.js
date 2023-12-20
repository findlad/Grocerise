import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log("mongo url: ", process.env.MONGO_URL);
const app = express();
// app.all("*", (req, res, next) => {
//   console.log("path is ", req.path);
//   next();
// });

const connectionString = process.env.MONGO_URL;
const db = await mongoose.connect(connectionString);
const dataStructure = new mongoose.Schema({
  item: String,
  shop: String,
  cost: Number,
  day: Date,
});

const data = db.model("priceDatas", dataStructure);
app.use(express.static("./"));
app.get("/api", async (request, response) => {
  const allData = await data.find();
  response.send(allData);
});
app.listen(3000, () => {
  console.log("listening on port http://localhost:3000");
});
