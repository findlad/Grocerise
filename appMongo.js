// import mongoose from "mongoose";
import dotenv from "dotenv";
// const dotenv = require("dotenv");
dotenv.config();

// console.log(process.env.MONGO_URL);

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const connectionString = process.env.MONGO_URL;

async function fetchPricesJSON(thing, store) {
  const db = await mongoose.connect(connectionString);

  const dataStructure = new mongoose.Schema({
    item: String,
    shop: String,
    cost: Number,
    day: Date,
  });

  const data = db.model("Grocerise", dataStructure);
  let priceArray = data.find();

  // const response = await fetch("priceHistory.json");
  // priceArray = await response.json();
  const categoryPrices = priceArray.filter((entry) => entry.item === thing);
  //console.log(store);
  const categoryPricesStore = categoryPrices.filter(
    (entry) => entry.shop === store
  );
  categoryPricesStore.sort((a, b) => new Date(b.day) - new Date(a.day));
  //console.log(categoryPricesStore);
  const newestEntry = categoryPricesStore[0];
  //console.log(newestEntry);
  let gridId = newestEntry.shop + newestEntry.item;
  //console.log(gridId);
  document.getElementById(gridId).innerHTML = "$" + newestEntry.cost;
}

let globalArray = [];
let shopArray = [];
let itemArray = [];

async function loadJSON() {
  const response = await fetch("priceHistory.json");
  let jsonArray = await response.json();
  globalArray = jsonArray;
}

async function loading() {
  await loadJSON();

  //console.log(globalArray);
  shopArray = [...new Set(globalArray.map((item) => item.shop))];
  itemArray = [...new Set(globalArray.map((item) => item.item))];
  await itemArray.forEach(async (item) => {
    await shopArray.forEach(async (shop) => {
      await fetchPricesJSON(item, shop);
    });
  });
  await calculateAndDisplayTotal(itemArray);
}
loading();

// Calculate the sum and update the total
// calculateAndDisplayTotal();

function getNumber(store, item) {
  return Number(
    document.getElementById(store + item).textContent.replace("$", "")
  );
}

async function calculateAndDisplayTotal(itemArray) {
  await delay(500);

  let superstoreSum = 0;
  let safewaySum = 0;
  let walmartSum = 0;
  let nofrillsSum = 0;
  let coopSum = 0;

  function storeSummation(store, itemArray) {
    let sum = 0;
    itemArray.forEach((item) => {
      sum += getNumber(store, item);
    });
    document.getElementById(store + "Total").innerHTML = "$ " + sum.toFixed(2);
    switch (store) {
      case "Superstore":
        superstoreSum = sum;
        break;
      case "Safeway":
        safewaySum = sum;
        break;
      case "Walmart":
        walmartSum = sum;
        break;
      case "NoFrills":
        nofrillsSum = sum;
        break;
      case "Coop":
        coopSum = sum;
        break;
    }
  }

  storeSummation("Superstore", itemArray);
  storeSummation("Walmart", itemArray);
  storeSummation("Safeway", itemArray);
  storeSummation("NoFrills", itemArray);
  storeSummation("Coop", itemArray);

  const minimum = Math.min(
    ...[nofrillsSum, walmartSum, safewaySum, superstoreSum, coopSum]
  );
  console.log("minimum");
  console.log(minimum);

  if (minimum === nofrillsSum) {
    document.getElementById("NoFrillsTotal").classList.add("cheapest");
  }
  if (minimum === safewaySum) {
    document.getElementById("SafewayTotal").classList.add("cheapest");
  }
  if (minimum === walmartSum) {
    document.getElementById("WalmartTotal").classList.add("cheapest");
  }
  if (minimum === coopSum) {
    document.getElementById("CoopTotal").classList.add("cheapest");
  }
  if (minimum === superstoreSum) {
    document.getElementById("SuperstoreTotal").classList.add("cheapest");
  }
}

// Your JavaScript code for creating the chart
async function fetchChartJSON(thing, store) {
  const response = await fetch("priceHistory.json");
  const priceArray = await response.json();

  const categoryPrices = priceArray.filter((entry) => entry.item === thing);
  const categoryPricesStore = categoryPrices.filter(
    (entry) => entry.shop === store
  );
  categoryPricesStore.sort((a, b) => new Date(a.day) - new Date(b.day));

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Extract the x and y values for the chart
  const x = categoryPricesStore.map((entry) => formatDate(entry.day));
  const y = categoryPricesStore.map((entry) => parseFloat(entry.cost));

  // Create the Chart.js chart
  const ctx = document.getElementById("graph").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: x,
      datasets: [
        {
          label: `Price History for ${thing} at ${store}`,
          data: y,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: "day",

              displayFormats: {
                day: "DD MMM YY",
              },
            },
          },
        ],
      },
      // Add any chart options you need here
      responsive: true, // Make the chart responsive
      maintainAspectRatio: false, // Allow the aspect ratio to change
      // Add any other chart options you need here
    },
  });
}

// // JavaScript code for opening and closing the modal

const gridItems = document.querySelectorAll(".grid-item");
const closeModalButton = document.getElementById("closeModalButton");
const modal = document.getElementById("modalBox");

function closeModal() {
  modal.style.display = "none";
}

gridItems.forEach((gridItem) => {
  gridItem.addEventListener("click", () => {
    const thing = gridItem.dataset.item;
    const store = gridItem.dataset.store;

    modal.style.display = "flex";

    // Clear the previous chart, if any
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = '<canvas id="graph"></canvas>';

    // Add your chart creation code here based on the thing and store
    fetchChartJSON(thing, store);
  });
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});
closeModalButton.addEventListener("touchend", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
window.addEventListener("touchend", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
