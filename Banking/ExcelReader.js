
var XLSX=require('xlsx');
var workbook=XLSX.readFile('TestData.xlsx');

var first_sheet_name = workbook.SheetNames[0];
var address_of_cell1 = 'B1';
var address_of_cell2 = 'B2';
var address_of_cell3 = 'B3';
var address_of_cell4 = 'B4';
var address_of_cell5 = 'B5';
var address_of_cell6 = 'B6';
 
/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];
 
/* Find desired cell */
var desired_cell1 = worksheet[address_of_cell1];
var desired_cell2 = worksheet[address_of_cell2];
var desired_cell3 = worksheet[address_of_cell3];
var desired_cell4 = worksheet[address_of_cell4];
var desired_cell5 = worksheet[address_of_cell5];
var desired_cell6 = worksheet[address_of_cell6];
 
/* Get the value */
var desired_value1 = desired_cell1.v;
var desired_value2 = desired_cell2.v;
var desired_value3 = desired_cell3.v;
var desired_value4 = desired_cell4.v;
var desired_value5 = desired_cell5.v;
var desired_value6 = desired_cell6.v;

describe('Banking Application Login Test--AS a Customer', function() {
    it('Login as Customer', function() {
     browser.get(desired_value1);
     browser.driver.manage().window().maximize(); 

      element(by.buttonText(desired_value2)).click();
      element(by.model(desired_value3)).click();

      element(by.xpath(desired_value4)).click();
      element(by.buttonText(desired_value5)).click();

      var name=element(by.className(desired_value6)).click();
      expect(name.getText()).toEqual('Harry Potter');
    });
});

