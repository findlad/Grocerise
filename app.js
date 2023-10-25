

let gridId;
document.getElementById("loadData").addEventListener("click", function()) {
    // Load the JSON file using Fetch API
    fetch("priceHistory.json")
    .then(response => response.json())
    .then(data => {
        // Filter the entries by category
        const category = "milk"; // Change this to the category you want
        const categoryEntries = data.filter(entry => entry.category === category);
        
        // Find the newest entry in the filtered category
        categoryEntries.sort((a, b) => new Date(b.day) - new Date(a.day));
        const newestEntry = categoryEntries[0];
        
        // Display the result
        let gridId = newestEntry.shop + newestEntry.item;
          document.getElementById(gridId).textContent = JSON.stringify(newestEntry, null, 2);
      })
      .catch(error => {
          console.error("Error loading JSON file:", error);
      });
};