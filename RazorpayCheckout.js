'use strict';

import {NativeModules, NativeEventEmitter} from 'react-native';

const razorpayEvents = (NativeModules !== null) ? new NativeEventEmitter(NativeModules.RazorpayEventEmitter) : undefined;

const removeSubscriptions = () =
>
{
    razorpayEvents.removeAllListeners('Razorpay::PAYMENT_SUCCESS');
    razorpayEvents.removeAllListeners('Razorpay::PAYMENT_ERROR');
    razorpayEvents.removeAllListeners('Razorpay::EXTERNAL_WALLET_SELECTED');
}
;

class RazorpayCheckout {
    static open(options, successCallback, errorCallback) {
        if (razorpayEvents) {
            return new Promise(function (resolve, reject) {
                razorpayEvents.addListener('Razorpay::PAYMENT_SUCCESS', (data) => {
                    let resolveFn = successCallback || resolve;
                    resolveFn(data);
                    removeSubscriptions();
                });
                razorpayEvents.addListener('Razorpay::PAYMENT_ERROR', (data) => {
                    let rejectFn = errorCallback || reject;
                    rejectFn(data);
                    removeSubscriptions();
                });
                NativeModules.RazorpayCheckout.open(options);
            });
        } else {
            return undefined;
        }
    }

    static onExternalWalletSelection(externalWalletCallback) {
        if (razorpayEvents) {
            razorpayEvents.addListener('Razorpay::EXTERNAL_WALLET_SELECTED', (data) => {
                externalWalletCallback(data);
                removeSubscriptions();
            });
        }
    }
}

export default RazorpayCheckout;
