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

  await driver.findElement(By.xpath('//*[@id="amasty-shopby-product-list"]/div[3]/ol/li[1]/div/a')).click();
  console.log(chalk.green('4. Opened single shoe'));

  setTimeout(async function () {
    await driver.findElement(By.xpath('//*[@id="product-options-wrapper"]/div/div/div/div')).click();
    console.log(chalk.green('5. Open drop-down menu'));
  }, 3000);

  setTimeout(async function () {
    await driver.findElement(By.xpath('//*[@id="product-options-wrapper"]/div/div/div/div/div[3]/div/ul/li[2]/div[1]')).click();
    console.log(chalk.green('6. Picked from drop-down menu'));
  }, 3000);

  setTimeout(async function () {
    let testEle = await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/span'));

    driver.executeScript('arguments[0].scrollIntoView()', testEle);
  }, 3000);
}

test();
