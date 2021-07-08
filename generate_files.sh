#!/bin/bash

# 1. copy "template" into a new directory
cp -r ./template $1

# 2. update vite.config.js and index.html with new directory
# https://unix.stackexchange.com/questions/121161/how-to-insert-text-after-a-certain-string-in-a-file
# https://stackoverflow.com/questions/7573368/in-place-edits-with-sed-on-os-x

sed -i '' "/insert text -->/i\\
        \"$1\": resolve(__dirname, \"$1/index.html\"),
" vite.config.js

sed -i '' "/insert text -->/i\\
      <li><a href=\"./$1\">$1</a></li>
" index.html
