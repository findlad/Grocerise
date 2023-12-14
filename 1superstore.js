import { getPrice, delay } from "./function.js";

let ssTarget = ".price__value";

let ssBranPrice;
let ssBranPage =
  "https://www.realcanadiansuperstore.ca/raisin-bran-family-size-cereal/p/21430755_EA";
let ssPizzaPrice;
let ssPizzaPage =
  "https://www.realcanadiansuperstore.ca/giuseppe-pizzeria-rising-crust-pepperoni-pizza/p/21106361_EA";

let ssChipsPrice;
let ssChipsPage =
  "https://www.realcanadiansuperstore.ca/oven-baked-bar-b-q-flavoured-potato-chips/p/21434125_EA";

let ssCokeZeroPrice;
let ssCokeZeroPage =
  "https://www.realcanadiansuperstore.ca/zero-sugar-bottle/p/20316026005_EA";

let ssChickenPrice;
let ssChickenPage =
  "https://www.realcanadiansuperstore.ca/chicken-breast-boneless-skinless-3-pack/p/21340952_EA";

let ssRicePrice;
let ssRicePage =
  "https://www.realcanadiansuperstore.ca/premium-long-grain-rice/p/20074783001_EA";

let ssEggPrice;
let ssEggPage =
  "https://www.realcanadiansuperstore.ca/free-range-large-eggs/p/20881824001_EA";

let ssTowelPrice;
let ssTowelPage =
  "https://www.realcanadiansuperstore.ca/paper-towel-6-12/p/21515966_EA";

let ssMilkPrice;
let ssMilkPage =
  "https://www.realcanadiansuperstore.ca/milk-1-mf/p/20657990_EA";
let ssCoffeePrice;
let ssCoffeePage =
  "https://www.realcanadiansuperstore.ca/original-fine-grind-coffee/p/20875767_EA";
let ssButterPrice;
let ssButterPage =
  "https://www.realcanadiansuperstore.ca/unsalted-butter/p/20316543002_EA";

ssMilkPrice = getPrice(ssMilkPage, ssTarget, "Superstore", "milk");
ssEggPrice = getPrice(ssEggPage, ssTarget, "Superstore", "egg");
ssTowelPrice = getPrice(ssTowelPage, ssTarget, "Superstore", "towel");
ssRicePrice = getPrice(ssRicePage, ssTarget, "Superstore", "rice");
ssChickenPrice = getPrice(ssChickenPage, ssTarget, "Superstore", "chicken");
delay(30000);
ssCokeZeroPrice = getPrice(ssCokeZeroPage, ssTarget, "Superstore", "coke");
ssChipsPrice = getPrice(ssChipsPage, ssTarget, "Superstore", "chips");
ssPizzaPrice = getPrice(ssPizzaPage, ssTarget, "Superstore", "pizza");
ssBranPrice = getPrice(ssBranPage, ssTarget, "Superstore", "bran");
ssCoffeePrice = getPrice(ssCoffeePage, ssTarget, "Superstore", "coffee");
ssButterPrice = getPrice(ssButterPage, ssTarget, "Superstore", "butter");
