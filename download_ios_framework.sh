#!/bin/sh
## Run this script after installing the module

curl -O https://rzp-mobile.s3.amazonaws.com/ios/checkout/1.0.8/RazorpayBitcodeX9.framework.zip
unzip -o ./RazorpayBitcodeX9.framework.zip
rm -r ./ios/Razorpay.framework
cp -r ./Razorpay.framework ./ios/
rm -r Razorpay.framework
rm RazorpayBitcodeX9.framework.zip