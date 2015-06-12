//==============================================================================
// Casper generated Tue Apr 22 2014 11:59:28 GMT+0200 (CEST)
//==============================================================================

var x = require('casper').selectXPath;
casper.options.viewportSize = {width: 1855, height: 995};
casper.on('page.error', function(msg, trace) {
   this.echo('Error: ' + msg, 'ERROR');
   for(var i=0; i<trace.length; i++) {
       var step = trace[i];
       this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
   }
});
casper.test.begin('Resurrectio test', function(test) {
   casper.start('http://stackoverflow.com/');
   casper.waitForSelector("form#search input[name='q']",
       function success() {
           test.assertExists("form#search input[name='q']");
           this.click("form#search input[name='q']");
       },
       function fail() {
           test.assertExists("form#search input[name='q']");
   });
   casper.waitForSelector("input[name='q']",
       function success() {
           this.sendKeys("input[name='q']", "plone\r");
       },
       function fail() {
           test.assertExists("input[name='q']");
   });
   // submit form
   casper.waitForSelector(".results-label",
       function success() {
           test.assertExists(".results-label");
           this.click(".results-label");
       },
       function fail() {
           test.assertExists(".results-label");
   });
   casper.waitForSelector(".results-label",
       function success() {
           test.assertExists(".results-label");
           this.click(".results-label");
       },
       function fail() {
           test.assertExists(".results-label");
   });
   casper.waitForSelector(x("//*[contains(text(), \'results\')]"),
       function success() {
           test.assertExists(x("//*[contains(text(), \'results\')]"));
         },
       function fail() {
           test.assertExists(x("//*[contains(text(), \'results\')]"));
   });

   casper.run(function() {test.done();});
});
