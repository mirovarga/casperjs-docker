# casperjs-docker

A Node.js module that runs [CasperJS](http://casperjs.org) scripts in Docker
containers.

It is a slightly modified version of the one used by the *casperbox.com* service
(now shut down).


## Installation

> Tested on Ubuntu 14.04.

1. Install [Docker](https://docs.docker.com/installation/#installation)
2. Build the Docker image used to run CasperJS scripts in:

    ```
    $ sudo docker build -t ubuntu/14.04:casperbox .
    ```

3. Edit the `run-script-in-docker--password.sh` file to update the sudo password


## Usage

```javascript
var casper = require('./casperjs-docker');
casper.runScript(
  "var casper = require('casper').create();\
  casper.start('http://casperjs.org', function() {\
    casper.echo('Hello, world!');\
  });\
  casper.run();",
  function(err, script) {
    console.log(script);
  }
);
```

```javascript
{
  source: 'var casper = require(\'casper\').create();\ncasper.start(\'http://casperjs.org\', function() {\n  casper.echo(\'Hello, world!\');\n});\ncasper.run();\n',
  startedAt: 1434145107992,
  output: 'Hello, world!\n',
  finishedAt: 1434145111563
}

```

> Scripts are run with CasperJS `1.1-beta3` and PhantomJS `1.9.7`. If you'd
like to use other versions feel free to modify the Dockerfile and rebuild
the image.

> Every script is automatically terminated after 30 seconds. If it's not enough
for you feel free to modify the timeout in the `casperjs-docker.js` file (look
for the `maxScriptRunTime` variable).


## Testing

There are a couple of [Mocha](http://mochajs.org) tests. If you're curious you
can run them like this (the `-t` option is the test case timeout):

```
$ mocha -t 35000
```


> There's also a
[blog post](http://www.mirovarga.com/running-casperjs-scripts-in-docker-containers)
on my blog.
