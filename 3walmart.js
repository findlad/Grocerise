import { getPrice, delay } from "./function.js";

let wmTarget = '[itemprop="price"]';

let wmEggPrice;
let wmEggPage =
  "https://www.walmart.ca/en/ip/goldegg-free-run-large-eggs/6000196823370";
let wmTowelPrice;
let wmTowelPage =
  "https://www.walmart.ca/en/ip/bounty-select-a-size-paper-towels-6-double-rolls-white-90-sheets-per-roll/6000205967050";
let wmMilkPrice;
let wmMilkPage =
  "https://www.walmart.ca/en/ip/Dairyland-1-Partly-skimmed-milk/6000079800122";
let wmCokeZeroPrice;
let wmCokeZeroPage =
  "https://www.walmart.ca/en/ip/Coca-Cola-Zero-Sugar-2L-Bottle/10214488";
let wmChickenPrice;
let wmChickenPage =
  "https://www.walmart.ca/en/ip/prime-boneless-skinless-chicken-breast-raised-without-antibiotics/6000203053980?from=/search";
let wmRicePrice;
let wmRicePage =
  "https://www.walmart.ca/en/ip/Minute-Rice-Premium-Instant-Long-Grain-White-Rice-1-4-kg/10299508?from=/search";
let wmBranPrice;
let wmBranPage =
  "https://www.walmart.ca/en/ip/Kellogg-s-Two-Scoops-Raisin-Bran-Cereal-Family-Size-625g/6000204516210";
let wmPizzaPrice;
let wmPizzaPage =
  "https://www.walmart.ca/en/ip/Dr-Oetker-Giuseppe-Pizzeria-Rising-Crust-Pepperoni-Pizza/6000198536763";
let wmChipsPrice;
let wmChipsPage =
  "https://www.walmart.ca/en/ip/Lay-s-Oven-Baked-Potato-Chips-BBQ/5HYMR7FOVBPG";
let wmCoffeePrice;
let wmCoffeePage =
  "https://www.walmart.ca/en/ip/Tim-Hortons-Fine-Grind-Coffee/6000187769641";
let wmButterPrice;
let wmButterPage =
  "https://www.walmart.ca/en/ip/Great-Value-Unsalted-Butter/10054933";

wmMilkPrice = getPrice(wmMilkPage, wmTarget, "Walmart", "milk");
delay(10000);
wmEggPrice = getPrice(wmEggPage, wmTarget, "Walmart", "egg");
delay(10000);
wmTowelPrice = getPrice(wmTowelPage, wmTarget, "Walmart", "towel");
delay(10000);
wmRicePrice = getPrice(wmRicePage, wmTarget, "Walmart", "rice");
delay(10000);
wmChickenPrice = getPrice(wmChickenPage, wmTarget, "Walmart", "chicken");
delay(10000);
wmCokeZeroPrice = getPrice(wmCokeZeroPage, wmTarget, "Walmart", "coke");
delay(10000);
wmChipsPrice = getPrice(wmChipsPage, wmTarget, "Walmart", "chips");
delay(10000);
wmPizzaPrice = getPrice(wmPizzaPage, wmTarget, "Walmart", "pizza");
delay(10000);
wmBranPrice = getPrice(wmBranPage, wmTarget, "Walmart", "bran");
delay(10000);
wmCoffeePrice = getPrice(wmCoffeePage, wmTarget, "Walmart", "coffee");
delay(10000);
wmButterPrice = getPrice(wmButterPage, wmTarget, "Walmart", "butter");
