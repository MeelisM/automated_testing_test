const { By, Key, Builder } = require('selenium-webdriver');
require('chromedriver');
//give console.log different colors
const chalk = require('chalk');

async function test() {
  //launches browser
  let driver = await new Builder().forBrowser('chrome').build();

  //opens the webpage
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

  await driver.findElement(By.xpath('//*[@id="amasty-shopby-product-list"]/div[3]/ol/li[2]/div/div[3]/div/div/a'));
}

test();
