const puppeteer = require("puppeteer");
require("events").EventEmitter.prototype._maxListeners = 100;

const scrollPageToBottom = require("puppeteer-autoscroll-down");
const cheerio = require("cheerio");
const fs = require("fs");
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

let nfTarget = ".price__value";

let nfEggPrice;
let nfEggPage =
  "https://www.nofrills.ca/free-run-brown-eggs-large/p/20813628001_EA";
let nfTowelPrice;
let nfTowelPage = "https://www.nofrills.ca/paper-towel-6-12/p/21515966_EA";
let nfMilkPrice;
let nfMilkPage = "https://www.nofrills.ca/milk-1-mf/p/20657990_EA";
let nfCokeZeroPrice;
let nfCokeZeroPage =
  "https://www.nofrills.ca/zero-sugar-bottle/p/20316026005_EA";
let nfChickenPrice;
let nfChickenPage =
  "https://www.nofrills.ca/chicken-breast-boneless-skinless-3-pack/p/21340952_EA";
let nfRicePrice;
let nfRicePage =
  "https://www.nofrills.ca/premium-long-grain-rice/p/20074783001_EA";
let nfBranPrice;
let nfBranPage =
  "https://www.nofrills.ca/raisin-bran-family-size-cereal/p/21430755_EA";
let nfPizzaPrice;
let nfPizzaPage =
  "https://www.nofrills.ca/giuseppe-pizzeria-rising-crust-pepperoni-pizza/p/21106361_EA";
let nfChipsPrice;
let nfChipsPage =
  "https://www.nofrills.ca/oven-baked-bar-b-q-flavoured-potato-chips/p/21434125_EA";

nfMilkPrice = getPrice(nfMilkPage, nfTarget, "NoFrills", "milk");
nfEggPrice = getPrice(nfEggPage, nfTarget, "NoFrills", "egg");
nfTowelPrice = getPrice(nfTowelPage, nfTarget, "NoFrills", "towel");
nfRicePrice = getPrice(nfRicePage, nfTarget, "NoFrills", "rice");
nfChickenPrice = getPrice(nfChickenPage, nfTarget, "NoFrills", "chicken");
nfCokeZeroPrice = getPrice(nfCokeZeroPage, nfTarget, "NoFrills", "coke");
nfChipsPrice = getPrice(nfChipsPage, nfTarget, "NoFrills", "chips");
nfPizzaPrice = getPrice(nfPizzaPage, nfTarget, "NoFrills", "pizza");
nfBranPrice = getPrice(nfBranPage, nfTarget, "NoFrills", "bran");
