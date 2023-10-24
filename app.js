
const localJsonFile = "priceHistory.json";
const gridId;
let gridId = document.getElementById(line.shop + line.item);

document.getElementById("loadData").addEventListener("click", function() {
  // Load the JSON file using Fetch API
  fetch("priceHistory.json")
      .then(response => response.json())
      .then(data => {
          // Filter the entries by category
          const category = "Milk"; // Change this to the category you want
          const categoryEntries = data.filter(entry => entry.category === category);

          // Find the newest entry in the filtered category
          categoryEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          const newestEntry = categoryEntries[0];

          // Display the result
          document.getElementById("result").textContent = JSON.stringify(newestEntry, null, 2);
      })
      .catch(error => {
          console.error("Error loading JSON file:", error);
      });
});