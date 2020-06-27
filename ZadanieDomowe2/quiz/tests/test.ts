import {Builder, Capabilities} from 'selenium-webdriver';
import { expect } from 'chai';
import { driver } from 'mocha-webdriver';
import "mocha";
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

describe('test', function() {
  const indexPage = 'http://localhost:3000';
  console.log("XD");
  this.beforeEach(async function() {
    await driver.get(indexPage);
  })

  it('should say something', async function() {
      this.timeout(2000);

      expect(await driver.find('input[name="action"]').getText()).to.equal('login');
      await driver.find('input[name="login"]').sendKeys('user1');
      await driver.find('input[name="password"]').sendKeys('user1');
      await driver.find('input[type="submit"').doClick();
  });
})
