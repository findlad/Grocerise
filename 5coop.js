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

coopEggPrice = getPrice(coopEggPage, coopTarget, "Coop", "egg");
delay(10000);
coopMilkPrice = getPrice(coopMilkPage, coopTarget, "Coop", "milk");
delay(10000);
coopTowelPrice = getPrice(coopTowelPage, coopTarget, "Coop", "towel");
delay(10000);
coopRicePrice = getPrice(coopRicePage, coopTarget, "Coop", "rice");
delay(10000);
coopChickenPrice = getPrice(coopChickenPage, coopTarget, "Coop", "chicken");
delay(10000);
coopCokeZeroPrice = getPrice(coopCokeZeroPage, coopTarget, "Coop", "coke");
delay(10000);
coopChipsPrice = getPrice(coopChipsPage, coopTarget, "Coop", "chips");
delay(10000);
coopPizzaPrice = getPrice(coopPizzaPage, coopTarget, "Coop", "pizza");
delay(10000);
coopBranPrice = getPrice(coopBranPage, coopTarget, "Coop", "bran");
delay(10000);
coopCoffeePrice = getPrice(coopCoffeePage, coopTarget, "Coop", "coffee");
delay(10000);
coopButterPrice = getPrice(coopButterPage, coopTarget, "Coop", "butter");
