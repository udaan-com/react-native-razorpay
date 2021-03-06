'use strict';

import {NativeEventEmitter, NativeModules, Platform} from 'react-native';

const razorpayEvents = (Platform.OS === 'ios') ?
    (NativeModules !== undefined &&
        NativeModules !== null &&
        NativeModules.RazorpayEventEmitter !== undefined &&
        NativeModules.RazorpayEventEmitter !== null) ? new NativeEventEmitter(NativeModules.RazorpayEventEmitter) : undefined
    : new NativeEventEmitter(NativeModules.RazorpayEventEmitter);

const removeSubscriptions = () => {
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
            return Promise.reject("Native Modules is null hence cannot proceed");
        }
    }

    static onExternalWalletSelection(externalWalletCallback) {
        if (razorpayEvents) {
            razorpayEvents.addListener('Razorpay::EXTERNAL_WALLET_SELECTED', (data) => {
                externalWalletCallback(data);
                removeSubscriptions();
            });
        } else {
            return Promise.reject("Native Modules is null hence cannot proceed");
        }
    }
}

export default RazorpayCheckout;
