var casper = require('casper').create();
casper.start('http://casperjs.org', function() {
  casper.echo('Hello, world!');
});
casper.run(;
