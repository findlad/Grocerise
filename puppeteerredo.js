const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.realcanadiansuperstore.ca/milk-1-mf/p/20657990_EA"
  );

  headings = await page.evaluate(() => {
    headings_elements = document.querySelector(
      "price__value selling-price-list__item__price selling-price-list__item__price--now-price__value"
    );
    headings_array = Array.from(headings_elements);
    return headings_array.map((heading) => heading.textContent);
  });
  console.log(headings);
  await browser.close();
})();
