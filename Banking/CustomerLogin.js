var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'info';

describe('Banking Application Login Test--AS a Customer', function() {
    it('Login as Customer', function() {
     browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');
     logger.info("Browser launched"); 
     browser.driver.manage().window().maximize(); 

      element(by.buttonText('Customer Login')).click();
      element(by.model('custId')).click();

      element(by.xpath('//option[@value=2]')).click();
      element(by.buttonText('Login')).click();

      var name=element(by.className('fontBig ng-binding')).click();
      expect(name.getText()).toEqual('Harry Potter');
      logger.info("Customer Login Sucesfully");
    });


      it('Desposit Money To Account', function() {
      element(by.buttonText('Deposit')).click();
      element(by.model('amount')).sendKeys(1000);

      element(by.className('btn btn-default')).click();


      var Text=element(by.className('error ng-binding'));
      expect(Text.getText()).toEqual('Deposit Successful');

      logger.info("Customer Deposited Money Sucesfully");

          
      browser.sleep(1000);
         
      
    });

    it('WithDrawal Money from Account', function() {
        element(by.buttonText('Withdrawl')).click();
        element(by.model('amount')).sendKeys(1000);
        element(by.className('btn btn-default')).click();

        var Text=element(by.className('error ng-binding'));
        expect(Text.getText()).toEqual('Transaction successful');

        logger.info("Customer Transcation happened Sucesfully");

        browser.sleep(2000);


    });

    it('Transcations History from Account', function() {
        element(by.buttonText('Transactions')).click();
        element(by.xpath('//a[contains(text(),Date-Time)]')).click();
        element(by.buttonText('Reset')).click();
        element(by.buttonText('Back')).click();

        element(by.buttonText('Logout')).click();
        element(by.buttonText('Home')).click();

        logger.info('Logout Sucesfull from customer account');
        
        browser.sleep(2000);


    });
  });