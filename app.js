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

async function calculateAndDisplayTotal() {
  await delay(500);
  let superstoreSum =
    Number(
      document.getElementById("Superstorechicken").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("Superstorerice").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("Superstoremilk").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("Superstoreegg").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("Superstoretowel").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("Superstorecoke").textContent.replace("$", "")
    );

  //console.log(superstoreSum.toFixed(2));

  document.getElementById("SuperstoreTotal").innerHTML =
    "$ " + superstoreSum.toFixed(2);

  let safewaySum =
    Number(
      document.getElementById("Safewaychicken").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("Safewayrice").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("Safewaymilk").textContent.replace("$", "")
    ) +
    Number(document.getElementById("Safewayegg").textContent.replace("$", "")) +
    Number(
      document.getElementById("Safewaytowel").textContent.replace("$", "")
    ) +
    Number(document.getElementById("Safewaycoke").textContent.replace("$", ""));

  //console.log(safewaySum.toFixed(2));

  document.getElementById("SafewayTotal").innerHTML =
    "$ " + safewaySum.toFixed(2);

  let walmartSum =
    Number(
      document.getElementById("Walmartchicken").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("Walmartrice").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("Walmartmilk").textContent.replace("$", "")
    ) +
    Number(document.getElementById("Walmartegg").textContent.replace("$", "")) +
    Number(
      document.getElementById("Walmarttowel").textContent.replace("$", "")
    ) +
    Number(document.getElementById("Walmartcoke").textContent.replace("$", ""));

  //console.log(walmartSum.toFixed(2));

  document.getElementById("WalmartTotal").innerHTML =
    "$ " + walmartSum.toFixed(2);

  let nofrillsSum =
    Number(
      document.getElementById("NoFrillschicken").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("NoFrillsrice").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("NoFrillsmilk").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("NoFrillsegg").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("NoFrillstowel").textContent.replace("$", "")
    ) +
    Number(
      document.getElementById("NoFrillscoke").textContent.replace("$", "")
    );

  //console.log(nofrillsSum.toFixed(2));

  document.getElementById("NoFrillsTotal").innerHTML =
    "$ " + nofrillsSum.toFixed(2);
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
          backgroundColor: "rgba(0, 0, 255, 0.2)",
          borderColor: "rgba(0, 0, 255, 1.0)",
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

    modal.style.display = "block";

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
