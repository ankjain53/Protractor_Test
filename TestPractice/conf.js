
var HtmlReporter = require('protractor-beautiful-reporter');
directConnect: true

exports.config = {
  framework: 'jasmine2',
  
  onPrepare: function () {
    browser.manage().timeouts().implicitlyWait(15000);
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
        allureReport: {
            resultsDir: 'allure-results'
        }
    }));
    jasmine.getEnv().afterEach(function (done) {
        browser.takeScreenshot().then(function (png) {
            allure.createAttachment('Screenshot', function () {
                return new Buffer(png, 'base64');
            }, 'image/png')();
            done();
        });
    });
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'Report/screenshots'
   }).getJasmine2Reporter());
},
 // seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['HomePage.js']

  

};