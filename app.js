const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchPricesJSON(thing, store) {
  const response = await fetch("priceHistory.json");
  priceArray = await response.json();
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
  itemArray.forEach((item) => {
    shopArray.forEach((shop) => {
      fetchPricesJSON(item, shop);
    });
  });
}
loading();

// Calculate the sum and update the total
calculateAndDisplayTotal();

function getNumber(store, item) {
  return Number(
    document.getElementById(store + item).textContent.replace("$", "")
  );
}

async function calculateAndDisplayTotal() {
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
  }

  storeSummation("Superstore", itemArray);
  storeSummation("Walmart", itemArray);
  storeSummation("Safeway", itemArray);
  storeSummation("NoFrills", itemArray);
  storeSummation("Coop", itemArray);

  if (
    nofrillsSum <= walmartSum &&
    nofrillsSum <= safewaySum &&
    nofrillsSum <= superstoreSum &&
    nofrillsSum <= coopSum
  ) {
    document.getElementById("NoFrillsTotal").classList.add("cheapest");
  } else if (
    safewaySum <= walmartSum &&
    safewaySum <= noFrillsSum &&
    safewaySum <= superstoreSum &&
    safewaySum <= coopSum
  ) {
    document.getElementById("SafewayTotal").classList.add("cheapest");
  } else if (
    walmartSum <= safewaySum &&
    walmartSum <= noFrillsSum &&
    walmartSum <= superstoreSum &&
    walmartSum <= superstoreSum
  ) {
    document.getElementById("WalmartTotal").classList.add("cheapest");
  } else {
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

  // Extract the x and y values for the chart
  const x = categoryPricesStore.map((entry) => entry.day);
  const y = categoryPricesStore.map((entry) => entry.cost);

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

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
