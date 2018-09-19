//var logger=require('./log.js');
var log4jsGen = require("./log.js");
//log4jsGen.getLogger().info("Testing Log4js");

describe('angularjs homepage Functionality Check', function() {
    it('Functionality Check', function() {
      
     // logger.info('Name entered');
      browser.get('https://angularjs.org');
      browser.driver.manage().window().maximize();  
    //  logger.info('Browser Maxmized');
      
      browser.driver.sleep(3000);   
      element(by.model('yourName')).sendKeys('write first protractor test');
      //logger.info('Name entered');
      browser.driver.sleep(3000);
     
      
  
      
    });
  });