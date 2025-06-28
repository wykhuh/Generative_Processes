#!/bin/bash

# 1. copy "template" into a new directory
cp -r $1 $2

# 2. update vite.config.js and index.html with new directory
# https://unix.stackexchange.com/questions/121161/how-to-insert-text-after-a-certain-string-in-a-file
# https://stackoverflow.com/questions/7573368/in-place-edits-with-sed-on-os-x

sed -i '' "/insert text -->/i\\
        \"$2\": resolve(__dirname, \"$2/index.html\"),
" vite.config.js


text_with_spaces=${2//[_]/ }

sed -i '' "/insert text -->/i\\
      <li><a href=\"./$2/\"><img src=\"./assets/images/$2.png\" /><span>$text_with_spaces</span></a></li>
" index.html

