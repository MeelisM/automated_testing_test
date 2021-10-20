const { By, Key, Builder } = require('selenium-webdriver');
require('chromedriver');
//give console.log different colors
const chalk = require('chalk');

//test itself
async function test() {
  const searchString = 'Jope';

  //launches browser
  const driver = await new Builder().forBrowser('chrome').build();
  driver.manage().window().maximize();

  //opens webpage
  await driver
    .get('https://www.weekendshoes.ee')
    .then(console.log(chalk.green('1. Opened front page')));

  //logs webpage's title
  const pageTitle = await driver.getTitle();
  console.log(chalk.cyan(`Webpage title: ${pageTitle}`));

  //opens up women's shoes
  await driver
    .get('https://www.weekendshoes.ee/naistele/saapad.html')
    .then(console.log(chalk.green("2. Opened women's shoes")));

  //adds item to wishlist
  await driver.manage().setTimeouts({ implicit: 10000 });
  const itemElement = await driver.findElement(
    By.xpath(
      '//*[@id="amasty-shopby-product-list"]/div[3]/ol/li[6]/div/div[3]/div/div/a'
    )
  );
  driver
    .executeScript('arguments[0].click();', itemElement)
    .then(console.log(chalk.green('3. Added item to wishlist')));

  loadingCheck();
  // finds wishlist
  await driver
    .findElement(By.id('wishlist-link'))
    .click()
    .then(console.log(chalk.green('4. Found wishlist')));

  // opens wishlist
  await driver.manage().setTimeouts({ implicit: 10000 });
  await driver
    .findElement(
      By.xpath('//*[@id="miniwishlist-content-wrapper"]/div/div/div/button')
    )
    .click()
    .then(console.log(chalk.green('5. Opened wishlist')));

  // opens up item page
  await driver.manage().setTimeouts({ implicit: 10000 });
  const wishlistItem = await driver.findElement(
    By.className('product-item-link')
  );
  driver
    .executeScript('arguments[0].click();', wishlistItem)
    .then(console.log(chalk.green('6. Opened item page')));

  // picks size from drop-down menu
  await driver.manage().setTimeouts({ implicit: 10000 });
  await driver
    .findElement(By.className('selectric-wrapper'))
    .click()
    .then(console.log(chalk.green('7. Opened drop-down menu')));

  await driver.manage().setTimeouts({ implicit: 10000 });
  await driver
    .findElement(
      By.xpath(
        '//*[@id="product-options-wrapper"]/div/div/div/div/div[3]/div/ul/li[3]'
      )
    )
    .click()
    .then(console.log(chalk.green('8. Picked drop-down menu value')));

  // adds to shopping cart
  await driver.manage().setTimeouts({ implicit: 10000 });
  await driver
    .findElement(By.id('product-addtocart-button'))
    .click()
    .then(console.log(chalk.green('9. Added to shopping cart')));

  // opens shopping cart
  await driver.manage().setTimeouts({ implicit: 10000 });
  const shoppingCart = await driver.findElement(
    By.xpath('//*[@id="minicart-content-wrapper"]/div[2]/div[4]/div/a')
  );
  driver
    .executeScript('arguments[0].click();', shoppingCart)
    .then(console.log(chalk.green('10. Opened shopping cart')));

  // increases quantity by 1
  await driver.manage().setTimeouts({ implicit: 10000 });
  await driver
    .findElement(By.className('increase-qty'))
    .click()
    .then(console.log(chalk.green('11. Increased quantity by 1')));

  loadingCheck();

  // removes item
  await driver.manage().setTimeouts({ implicit: 10000 });
  await driver
    .findElement(By.xpath('//*[@id="shopping-cart-table"]/tbody/tr[1]/td[6]/a'))
    .click()
    .then(console.log(chalk.green('12. Removed items')));

  // searches for searchString
  await driver.manage().setTimeouts({ implicit: 10000 });
  await driver
    .findElement(By.id('search'))
    .sendKeys(searchString, Key.RETURN)
    .then(console.log(chalk.green('13. Used search')));

  // sorts by popularity
  await driver.manage().setTimeouts({ implicit: 10000 });
  await driver
    .findElement(By.css('#sorter [value="bestsellers"]'))
    .click()
    .then(console.log(chalk.green('14. Sorted by popularity')));
  console.log(chalk.yellow('TEST COMPLETED'));

  // checks if page is loading
  async function loadingCheck() {
    const bodyElement = await driver.findElement(By.xpath('/html/body'));
    driver.wait(function () {
      return bodyElement.getAttribute('aria-busy').then(function (result) {
        return result === 'false';
      });
    }, 20000);
  }
}

test();

// Checks for wishlist confirmation

// async function wishlistConfirmation() {
//   const bodyElement = await driver.findElement(By.xpath('/html/body'));
//   driver.wait(function () {
//     return bodyElement.findElement(By.className('message-success')).then(function (result) {
//       return result == true;
//     });
//   }, 10000);
// }
