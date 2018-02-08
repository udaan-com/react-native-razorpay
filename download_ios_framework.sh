#!/bin/sh
## Run this script after installing the module

curl -O https://dl.dropboxusercontent.com/content_link/P0aWzGoCxvxMZnU3ednT3XjSuXFgJa29Az5tOi222HjvvJYJeiCn81xyoolVOLRw/file?dl=1 
unzip -o ./Razorpay.framework-0.15.1-bitcode.zip
rm -r ./ios/Razorpay.framework
cp -r ./Razorpay.framework ./ios/
rm -r Razorpay.framework
rm Razorpay.framework-0.15.1-bitcode.zip
