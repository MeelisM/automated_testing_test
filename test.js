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
  await driver.get('https://www.weekendshoes.ee');
  console.log(chalk.green(`1. Opened front page`));

  //logs webpage's title
  const pageTitle = await driver.getTitle();
  console.log(chalk.cyan(`Webpage title: ${pageTitle}`));

  //opens up women's shoes
  await driver.get('https://www.weekendshoes.ee/naistele/saapad.html');
  console.log(chalk.green(`2. Opened women's shoes`));

  //adds product to wishlist
  const productElement = await driver.findElement(By.xpath('//*[@id="amasty-shopby-product-list"]/div[3]/ol/li[6]/div/div[3]/div/div/a'));
  driver.executeScript('arguments[0].click();', productElement);
  console.log(chalk.green('3. Add product to wishlist'));

  await driver.sleep(5000);
  // finds and opens up wishlist
  await driver.findElement(By.id('wishlist-link')).click();
  console.log(chalk.green('4. Found wishlist'));

  await driver.findElement(By.xpath('//*[@id="miniwishlist-content-wrapper"]/div/div/div/button')).click();
  console.log(chalk.green('5. Opened wishlist'));

  await driver.sleep(5000);
  // opens up product page
  const wishlistItem = await driver.findElement(By.className('product-item-link'));
  driver.executeScript('arguments[0].click();', wishlistItem);
  console.log(chalk.green('6. Opened item'));
  await driver.sleep(5000);
  // picks size from drop-down menu
  await driver.findElement(By.xpath('//*[@id="product-options-wrapper"]/div/div/div/div')).click();
  console.log(chalk.green('7. Opened drop-down menu'));

  await driver.findElement(By.xpath('//*[@id="product-options-wrapper"]/div/div/div/div/div[3]/div/ul/li[3]')).click();
  console.log(chalk.green('8. Picked drop-down menu value'));

  // adds to shopping cart
  await driver.findElement(By.id('product-addtocart-button')).click();
  console.log(chalk.green('9. Added to shopping cart'));

  await driver.sleep(5000);
  // opens shopping cart
  const shoppingCart = await driver.findElement(By.xpath('//*[@id="minicart-content-wrapper"]/div[2]/div[4]/div/a'));
  driver.executeScript('arguments[0].click();', shoppingCart);
  console.log(chalk.green('10. Opened shopping cart'));

  await driver.sleep(5000);
  // increases quantity by 1
  await driver.findElement(By.className('increase-qty')).click();
  console.log(chalk.green('11. Increased quantity by 1'));

  await driver.sleep(10000);
  // remove product
  await driver.findElement(By.xpath('//*[@id="shopping-cart-table"]/tbody/tr[1]/td[6]/a')).click();
  console.log(chalk.green('12. Removed all items'));

  // searches for searchString
  await driver.findElement(By.id('search')).sendKeys(searchString, Key.RETURN);
  console.log(chalk.green('13. Used search'));

  // sorts by popularity
  await driver.findElement(By.css('#sorter [value="bestsellers"]')).click();
  console.log(chalk.green('14. Sorted by popularity'));
  console.log(chalk.yellow('TEST COMPLETED'));
}

test();
