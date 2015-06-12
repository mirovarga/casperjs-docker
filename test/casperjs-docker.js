var casper = require('../casperjs-docker');
var assert = require('assert');
var fs = require('fs');

var sourcesDir = '/tmp/';

describe('casperjs-docker', function () {
  describe('#runScript', function () {
    it('should set when the script was started', function (done) {
      getScriptSource('test/scripts/hello-world.js', function (source) {
        casper.runScript(source, function (err, script) {
          assert(script.startedAt);
          done();
        });
      });
    });

    it('should set when the script was finished', function (done) {
      getScriptSource('test/scripts/hello-world.js', function (source) {
        casper.runScript(source, function (err, script) {
          assert(script.finishedAt);
          done();
        });
      });
    });

    it('should run a script', function (done) {
      getScriptSource('test/scripts/hello-world.js', function (source) {
        casper.runScript(source, function (err, script) {
          assert.equal(script.output, 'Hello, world!\n');
          done();
        });
      });
    });

    it('should run a script with syntax errors', function (done) {
      getScriptSource('test/scripts/hello-world--syntax-error.js', function (source) {
        casper.runScript(source, function (err, script) {
          assert.equal(script.output, 'SyntaxError: Parse error\n\n');
          done();
        });
      });
    });

    it('should timeout an incomplete script ', function (done) {
      getScriptSource('test/scripts/hello-world--incomplete.js', function (source) {
        casper.runScript(source, function (err, script) {
          assert.equal(script.output, '');
          done();
        });
      });
    });

    it('should run a script that uses the test module', function (done) {
      getScriptSource('test/scripts/test-module.js', function (source) {
        casper.runScript(source, function (err, script) {
          assert(script.output.indexOf('Test file:') != -1);
          done();
        });
      });
    });
  });
});

function getScriptSource(sourcePath, callback) {
  fs.readFile(sourcePath, function (err, source) {
    callback(source.toString());
  });
}
