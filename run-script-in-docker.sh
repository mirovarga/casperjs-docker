#!/bin/bash

#
# Runs a script in a Docker container.
#
# The first argument is the script's source path. The second (optional) argument
# is 'test' if the script should be run with the test module.
#
# It uses the run-script-in-docker--password.sh script to get the sudo password.
#


export SUDO_ASKPASS=`dirname $0`/run-script-in-docker--password.sh

sudo -A docker run -i -u casperbox -h casperbox -m 192m --rm=true ubuntu/14.04:casperbox bin/bash -c \
  "cat > /home/casperbox/script.js; \
  cd /home/casperbox; \
  PHANTOMJS_EXECUTABLE=./phantomjs/bin/phantomjs ./casperjs/bin/casperjs $2 script.js" \
< $1
