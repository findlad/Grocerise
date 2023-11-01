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
    },
  });
}

fetchChartJSON("egg", "Walmart");
