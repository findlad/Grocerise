"use strict";

const output = document.querySelector(".output");

const localJsonFile = "priceHistory.json";

function jsonList(line) {
  // Create a new div element dynamically
  const gridId = document.getElementById(line.shop + line.item);
  // get the required details from the local.json file to the div element using innerHTML
  let revisedArray = [];
  for (let i = 0; i < line.length; i++) {
    if (line[i].cost != "") {
      revisedArray.push(line[i]);
    }
  }
  div.innerHTML = `
        ${revisedArray.item} at ${revisedArray.shop} costs ${revisedArray.cost} as of ${revisedArray.day},`;
  // attach the newly created div element to the original div element, in this case to the class '.output'
  output.append(div);
  // Add styling to the displayed content
  div.classList.add("active");
}
