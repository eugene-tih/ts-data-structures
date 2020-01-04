#!/bin/bash

mkdir -p ./build

# bundle styles
cat ./node_modules/normalize.css/normalize.css \
./assets/style.css > ./build/styles.css

# bundle support script
cat ./assets/script.js > ./build/script.js