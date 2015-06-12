//
// A Node.js module that runs CasperJS scripts in Docker containers.
//
// It uses the run-script-in-docker.sh script.
//

//
// Usage:
//
// var casper = require('./casperjs-docker');
// casper.runScript(
//   "var casper = require('casper').create();\
//   casper.start('http://casperjs.org', function() {\
//     casper.echo('Hello, world!');\
//   });\
//   casper.run();",
//   function(err, script) {
//     console.log(script);
//   }
// );
//
// {
//   source: 'var casper = require(\'casper\').create();\ncasper.start(\'http://casperjs.org\', function() {\n  casper.echo(\'Hello, world!\');\n});\ncasper.run();\n',
//   startedAt: 1434145107992,
//   output: 'Hello, world!\n',
//   finishedAt: 1434145111563
// }
//


//
// Exports
//

exports.runScript = runScript;


//
// Implementation
//

var fs = require('fs');
var ps = require('child_process');

var sourcesDir = '/tmp/';
var runScriptInDockerScriptPath = __dirname + '/run-script-in-docker.sh';
var maxScriptRunTime = 30000;


// Runs a script.
//
// The callback receives err and script argument.
function runScript(source, callback) {
  var script = {
    source: source
  };

  var sourcePath = sourcesDir + Date.now() + '.js';
  fs.writeFile(sourcePath, script.source, function (err) {
    if (err) return callback(err);

    var args = [sourcePath];
    if (usesTestModule(script)) args.push('test');

    script.startedAt = Date.now();

    ps.execFile(runScriptInDockerScriptPath, args, {
      timeout: maxScriptRunTime,
      killSignal: 'SIGKILL'
    }, function (err, stdout, stderr) {
      fs.unlink(sourcePath, function () {
        script.output = stdout;
        script.finishedAt = Date.now();
        callback(err, script);
      });
    });
  });
}

function usesTestModule(script) {
  return script.source.indexOf('casper.test.begin') != -1;
}
