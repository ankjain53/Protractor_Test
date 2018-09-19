describe('Protractor Demo App', function() {
    it('should have a title', function() {
      browser.get('http://juliemr.github.io/protractor-demo/');

      element(by.model('first')).sendKeys('8');
      element(by.model('first')).sendKeys('6');
      
  
      expect(browser.getTitle()).toEqual('Super Calculator');
    });
  });