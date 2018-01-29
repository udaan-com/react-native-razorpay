#!/bin/sh
set -e
## Run this script after installing the module
echo "fetching Razorpay.framework-0.15.1-bitcode.zip"
curl -O https://github.com/razorpay/razorpay-ios-sample-app/releases/download/0.15.1/Razorpay.framework-0.15.1-bitcode.zip
unzip -o ./Razorpay.framework-0.15.1-bitcode.zip
rm -r ./ios/Razorpay.framework
cp -R ./Razorpay.framework ./ios/
