import puppeteer from "puppeteer";

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto(
    "https://www.saveonfoods.com/sm/pickup/rsid/1982/product/dairyland-1-skim-milk-id-00068700011030",
    {
      waitUntil: "domcontentloaded",
    }
  );

  // Get page data
  const quotes = await page.evaluate(() => {
    // Fetch the element with class "whatever-the-price-of-milk-is"
    const price = document.querySelector(".PdpMainPrice--4c0ljm kLdUIn");
    console.log(price);
    return { price };
  });

  // Display the quotes
  console.log(quotes);

  // Close the browser
  await browser.close();
};

// Start the scraping
getQuotes();
