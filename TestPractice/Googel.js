describe('Googel Login', function() {
    it('should have a title', function() {
      browser.ignoreSynchronization = true;
      browser.get('https://www.google.co.in/');
      element(by.id('lst-ib')).sendKeys('Hi');

      
      
  
      expect(browser.getTitle()).toEqual('Google');
    });
  });