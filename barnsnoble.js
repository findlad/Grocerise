const productPage =
  "https://www.barnesandnoble.com/w/salt-fat-acid-heat-samin-nosrat/1124286605?ean=9781476753836";
const safewayMilk = "";
// selector is the class (or whatever) of the data youre interested in. This will be different for each website
const selector = ".price current-price ml-0";

const axios = require("axios");

/* ... */
async function getHTML(url) {
  const { data: html } = await axios.get(url).catch((err) => {
    console.log("Couldn't get the page ☹️");
    //console.log(err);
  });

  console.log("it worked");
  //console.log(html);
  return html;
}

const cheerio = require("cheerio");
/* ... */
function scrapPrice(html) {
  const $ = cheerio.load(html); //First you need to load in the HTML
  const price = $(selector)
    .text() // we get the text
    .trim();
  console.log("it worked too");
  //console.log(price);
  console.log(price.substring(0, 10));
  return price;
}

async function init() {
  const html = await getHTML(productPage);
  scrapPrice(html);
}

init();
