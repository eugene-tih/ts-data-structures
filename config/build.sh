#!/bin/bash

mkdir -p ./build
rm -r ./compiled

# bundle styles
cat ./node_modules/normalize.css/normalize.css \
./assets/style.css > ./build/styles.css

# bundle support script
cat ./assets/script.js > ./build/script.js

# bundle image
cp ./assets/*.jpg ./build

npm run build:tsc
npm run build:rollup
