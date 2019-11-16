#!/bin/bash

mkdir -p ./examples

# bundle styles
cat ./node_modules/normalize.css/normalize.css \
./assets/styles/settings/*.css \
./assets/styles/generic/*.css \
./assets/styles/objects/*.css \
./assets/styles/elements/*.css \
./assets/styles/components/*.css \
./assets/styles/utilities/*.css > ./examples/styles.css

# bundle html
cp ./assets/pages/index.html ./examples/index.html
