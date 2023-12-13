const puppeteer = require("puppeteer");
require("events").EventEmitter.prototype._maxListeners = 100;

const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

let swTarget = ".cnwOeN";

let swEggPrice;
let swEggPage = "https://voila.ca/products/150353EA/details";
let swTowelPrice;
let swTowelPage = "https://voila.ca/products/5026EA/details";
let swMilkPrice;
let swMilkPage = "https://voila.ca/products/490731EA/details";
let swCokeZeroPrice;
let swCokeZeroPage = "https://voila.ca/products/450610EA/details";
let swChickenPrice;
let swChickenPage = "https://voila.ca/products/340841KG/details";
let swRicePrice;
let swRicePage = "https://voila.ca/products/160395EA/details";

swMilkPrice = getPrice(swMilkPage, swTarget, "Safeway", "milk");
swEggPrice = getPrice(swEggPage, swTarget, "Safeway", "egg");
swTowelPrice = getPrice(swTowelPage, swTarget, "Safeway", "towel");
swRicePrice = getPrice(swRicePage, swTarget, "Safeway", "rice");
swChickenPrice = getPrice(swChickenPage, swTarget, "Safeway", "chicken");
swCokeZeroPrice = getPrice(swCokeZeroPage, swTarget, "Safeway", "coke");
swChipsPrice = getPrice(swChipsPage, swTarget, "Safeway", "chips");
swPizzaPrice = getPrice(swPizzaPage, swTarget, "Safeway", "pizza");
swBranPrice = getPrice(swBranPage, swTarget, "Safeway", "bran");
