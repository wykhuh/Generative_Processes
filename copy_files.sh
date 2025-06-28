#!/bin/bash

# 1. copy "template" into a new directory
cp -r $1 $2

# 2. update vite.config.js and app.js with new directory
# https://unix.stackexchange.com/questions/121161/how-to-insert-text-after-a-certain-string-in-a-file
# https://stackoverflow.com/questions/7573368/in-place-edits-with-sed-on-os-x

sed -i '' "/insert text -->/i\\
        \"$2\": resolve(__dirname, \"$2/index.html\"),
" vite.config.js

sed -i '' "/insert text -->/i\\
  \"$2\",
" assets/scripts/app.js

