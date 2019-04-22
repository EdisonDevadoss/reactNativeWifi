/* @flow */

import React, { Component } from "react";
import { View, Text, TextInput, ToastAndroid } from "react-native";
import wifi from "react-native-android-wifi";
import PrimaryButton from "../../components/PrimaryButton";
import styles from "./HiddenWifiScreenStyleSheet";

export default class HiddenWifiScreen extends Component {
  static navigationOptions = {
    headerTitle: "Hidden Wifi"
  };

  constructor(props) {
    super(props);
    this.state = {
      ssid: null,
      pass: null,
      ssidExist: null
    };
  }
  onConnected = () => {
    const { ssid, pass } = this.state;
    wifi.connectToHiddenNetwork(ssid, pass, networkAdded => {
      console.log("networkAdded", networkAdded);
      if (networkAdded) {
        ToastAndroid.show("Connected", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Failed", ToastAndroid.SHORT);
      }
      this.setState({ ssidExist: networkAdded });
    });
  };
  render() {
    const { ssidExist } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.instructionsContainer}>
          {!ssidExist ? (
            <View>
              <Text style={styles.instructionsTitle}>
                Sign device into a specific network:
              </Text>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="transparent"
                onChangeText={event => this.setState({ ssid: event })}
                value={this.state.ssid}
                placeholder={"ssid"}
              />
              <TextInput
                style={styles.textInput}
                // secureTextEntry={true}
                underlineColorAndroid="transparent"
                value={this.state.pass}
                onChangeText={event => this.setState({ pass: event })}
                placeholder={"password"}
              />
              <PrimaryButton onPress={this.onConnected} btnText="Connect" />
            </View>
          ) : (
            <PrimaryButton
              style={styles.mb20}
              onPress={this.disconnectOnPress}
              btnText="Dis Connect"
            />
          )}
          <View style={styles.row}>
            <Text style={styles.answer}>
              {ssidExist == null
                ? ""
                : ssidExist
                ? "Network in range :)"
                : "Network out of range :("}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
