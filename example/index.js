/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeModules,
  NativeEventEmitter
} from 'react-native';

import { RZP } from 'react-native-razorpay';
const { RazorpayCheckout, RazorpayEventEmitter } = RZP;

const rzpEvents = new NativeEventEmitter(RazorpayEventEmitter);

class example extends Component {
  componentWillMount() {
    rzpEvents.addListener('onPaymentError', (data) => {
      alert("Error: " + data.code + " | " + data.description)
    });
    rzpEvents.addListener('onPaymentSuccess', (data) => {
      alert("Success: " + data.payment_id)
    });
  }

  render() {
    return (
      <View style={styles.container}>
       <TouchableHighlight onPress={() => {
        var options = {
          description: 'Credits towards consultation',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: 'rzp_test_1DP5mmOlF5G5ag',
          amount: '5000',
          name: 'foo',
          prefill: {email: 'pranav@razorpay.com', contact: '8879524924', name: 'Pranav Gupta'},
          theme: {color: '#F37254'}
        }
        RazorpayCheckout.open(options)
       }}>
      <Text style = {styles.text}>Pay</Text>
    </TouchableHighlight>
    </View>
    );
  }

  componentWillUnmount () {
    rzpEvents.remove();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

AppRegistry.registerComponent('example', () => example);