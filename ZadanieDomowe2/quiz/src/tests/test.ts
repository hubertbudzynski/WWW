import {Builder, Capabilities, By} from 'selenium-webdriver';
import { expect } from 'chai';
import { driver } from 'mocha-webdriver';
import "mocha";

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function loginUser1() {
    await driver.find('input[name="login"]').sendKeys('user1');
    await driver.find('input[name="password"]').sendKeys('user1');
    await driver.find('input[type="submit"]').doClick();
    await sleep(800);
}
async function loginUser2() {
  await driver.find('input[name="login"]').sendKeys('user2');
  await driver.find('input[name="password"]').sendKeys('user2');
  await driver.find('input[type="submit"]').doClick();
  await sleep(800);
}
const indexPage = 'http://localhost:3000';

async function logout() {
  await driver.get(indexPage);
  await driver.find('input[value="Wyloguj"]').doClick();
  await sleep(800);
}
describe('test', function() {


  this.beforeEach(async function () {
    this.timeout(5000);
    await driver.get(indexPage);
    await sleep(1000);
  })

  it('session logout', async function() {
    this.timeout(20000);

    // Login
    expect(await (await driver.find('input[name="action"]')).getAttribute('value')).to.equal('login');
    await loginUser1();
    // Get and delete cookies
    const cookies = await driver.manage().getCookies();
    await driver.manage().deleteAllCookies();

    // New session
    await driver.get(indexPage);
    await sleep(300);
    // Login again
    await loginUser1();
    await sleep(800);
    // Change password
    await driver.find('input[name="new_password"]').sendKeys('new_pass');
    await driver.find('input[value="Zmień hasło"]').doClick();
    await sleep(800);
    // Load old cookies.
    for (var cookie of cookies) {
      await driver.manage().addCookie({name: cookie.name, value: cookie.value});
    }
    await driver.navigate().refresh();

    // Check if still logged out.
    expect(await (await driver.find('input[name="action"]')).getAttribute('value')).to.equal('login');
  });

  it('quiz percentage', async function () {
    this.timeout(30000);
    await loginUser2();
    await (await driver.findElement(By.className("button"))).doClick();
    await sleep(2000);

    const sleepTimes = [4, 4, 6, 7];
    const timeOnQuestion = 500;
    for (var i = 0; i < 4; i++) {
      await driver.findElement(By.id("answer_box")).sendKeys(1);
      await sleep(timeOnQuestion * (sleepTimes[i] - 1));
      sleep(200);
      await (await driver.findElement(By.xpath("//*[contains(text(), 'Następne')]"))).doClick();
      await sleep(timeOnQuestion);
    }
    await (await driver.findElement(By.xpath("//*[contains(text(), 'Zakończ')]"))).doClick();
    await sleep(1000);

    let resultTimes: number[] = [];
    for (var id = 1; id <= 4; id++) {
      const time : number = +await (await driver.findElement(By.id(id.toString()))).getText();
      await sleep(200);
      resultTimes.push(time);
    }

    for (var i = 0; i < 3; i++) {
      const vari = Math.pow(sleepTimes[i] / sleepTimes[i + 1] - resultTimes[i] / resultTimes[i + 1], 2) / (sleepTimes[i] / sleepTimes[i + 1]);
      expect(vari).within(-0.1, 0.1);
    }
  })

})
