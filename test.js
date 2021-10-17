const { By, Key, Builder } = require('selenium-webdriver');
require('chromedriver');
//give console.log different colors
const chalk = require('chalk');

//test itself
async function test() {
  //launches browser

  let driver = await new Builder().forBrowser('chrome').build();
  driver.manage().window().maximize();

  //opens webpage
  await driver.get('https://www.weekendshoes.ee');
  console.log(chalk.green(`1. Opened front page`));

  //logs webpage's title
  let pageTitle = await driver.getTitle();
  console.log(chalk.cyan(`Webpage title: ${pageTitle}`));

  //closes cookie popup
  await driver.findElement(By.id('btn-cookie-allow')).click();
  console.log(chalk.green(`2. Confirmed cookies`));

  //opens up women's shoes
  await driver.get('https://www.weekendshoes.ee/naistele/saapad.html');
  console.log(chalk.green(`3. Opened women's shoes`));

  //adds product to wishlist
  const productElement = await driver.findElement(By.className('action towishlist'));
  const executor = driver;
  executor.executeScript('arguments[0].click();', productElement);
  console.log(chalk.green('4. Add product to wishlist'));

  setTimeout(function () {
    driver.quit();
    console.log(chalk.yellow('########## TEST FINISHED ##########'));
  }, 5000);
}

test();
