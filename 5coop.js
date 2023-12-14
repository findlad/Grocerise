import { getPrice, delay } from "./function.js";

let coopTarget = ".product-price";

let coopEggPrice;
let coopEggPage = "https://shoponline.calgarycoop.com/crowfoot#/product/563";
let coopTowelPrice;
let coopTowelPage =
  "https://shoponline.calgarycoop.com/crowfoot#/product/17720";
let coopMilkPrice;
let coopMilkPage = "https://shoponline.calgarycoop.com/crowfoot#/product/211";
let coopCokeZeroPrice;
let coopCokeZeroPage =
  "https://shoponline.calgarycoop.com/Midtown#/product/3878";
let coopChickenPrice;
let coopChickenPage =
  "https://shoponline.calgarycoop.com/Midtown#/product/38061";
let coopRicePrice;
let coopRicePage = "https://shoponline.calgarycoop.com/Midtown#/product/119";
let coopBranPrice;
let coopBranPage = "https://shoponline.calgarycoop.com/Midtown#/product/32516";
let coopPizzaPrice;
let coopPizzaPage = "https://shoponline.calgarycoop.com/Midtown#/product/6001";
let coopChipsPrice;
let coopChipsPage = "https://shoponline.calgarycoop.com/Midtown#/product/32844";
let coopCoffeePrice;
let coopCoffeePage =
  "https://shoponline.calgarycoop.com/crowfoot#/product/9470";
let coopButterPrice;
let coopButterPage =
  "https://shoponline.calgarycoop.com/crowfoot#/product/2200";

// coopEggPrice = getPrice(coopEggPage, coopTarget, "Coop", "egg");
// coopMilkPrice = getPrice(coopMilkPage, coopTarget, "Coop", "milk");
// coopTowelPrice = getPrice(coopTowelPage, coopTarget, "Coop", "towel");
// coopRicePrice = getPrice(coopRicePage, coopTarget, "Coop", "rice");
// coopChickenPrice = getPrice(coopChickenPage, coopTarget, "Coop", "chicken");
// coopCokeZeroPrice = getPrice(coopCokeZeroPage, coopTarget, "Coop", "coke");
// coopChipsPrice = getPrice(coopChipsPage, coopTarget, "Coop", "chips");
// coopPizzaPrice = getPrice(coopPizzaPage, coopTarget, "Coop", "pizza");
// coopBranPrice = getPrice(coopBranPage, coopTarget, "Coop", "bran");
// coopCoffeePrice = getPrice(coopCoffeePage, coopTarget, "Coop", "coffee");
coopButterPrice = getPrice(coopButterPage, coopTarget, "Coop", "butter");
