/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ToastAndroid
} from "react-native";
import wifi from "react-native-android-wifi";
import styles from "./ConnectedModalStyleSheet";
import PrimaryButton from "../PrimaryButton";

export default class ConnectedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ssid: null,
      pass: null,
      ssidExist: null,
      strength: null,
      frequency: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentWifi !== prevProps.currentWifi) {
      this.setState({
        ssid: this.props.currentWifi.SSID
      });
    }
  }

  onConnected = () => {
    wifi.findAndConnect(this.state.ssid, this.state.pass, found => {
      if (found) {
        ToastAndroid.show("Connected", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Failed", ToastAndroid.SHORT);
      }
      this.setState({ ssidExist: found });
    });
  };

  disconnectOnPress = () => {
    wifi.disconnect();
    this.setState({ ssidExist: null });
    ToastAndroid.show("Disconnected", ToastAndroid.SHORT);
  };

  getStrength = () => {
    wifi.getCurrentSignalStrength(level => {
      console.log(level);
      this.setState({ strength: level });
    });
  };

  getFrequency = () => {
    wifi.getFrequency(frequency => {
      console.log(frequency);
      this.setState({ frequency });
    });
  };
  render() {
    const { ssidExist, strength, frequency } = this.state;
    const { currentWifi } = this.props;
    return (
      <Modal visible={this.props.modalVisible} onRequestClose={() => {}}>
        <ScrollView>
          <View style={styles.container}>
            <PrimaryButton onPress={this.props.onClose} btnText="Close" />
            {currentWifi && (
              <View style={styles.mb20}>
                <Text style={styles.instructionsTitle}>{currentWifi.SSID}</Text>
                <Text>BSSID: {currentWifi.BSSID}</Text>
                <Text>Capabilities: {currentWifi.capabilities}</Text>
                <Text>Frequency: {currentWifi.frequency}</Text>
                <Text>Level: {currentWifi.level}</Text>
                <Text>Timestamp: {currentWifi.timestamp}</Text>

                <View style={styles.instructionsContainer}>
                  {!ssidExist ? (
                    <View>
                      <Text style={styles.instructionsTitle}>
                        Sign device into a specific network:
                      </Text>
                      <Text style={styles.instructions}>SSID</Text>
                      <TextInput
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        onChangeText={event => this.setState({ ssid: event })}
                        value={this.state.ssid}
                        placeholder={"ssid"}
                      />
                      <Text style={styles.instructions}>Password</Text>
                      <TextInput
                        style={styles.textInput}
                        // secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        value={this.state.pass}
                        onChangeText={event => this.setState({ pass: event })}
                        placeholder={"password"}
                      />
                      <PrimaryButton
                        onPress={this.onConnected}
                        btnText="Connect"
                      />
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
                {ssidExist && (
                  <View>
                    <View style={[styles.row, styles.mb20]}>
                      <PrimaryButton
                        onPress={this.getStrength}
                        btnText="Strength"
                      />
                      <Text style={styles.answer}>{strength}</Text>
                    </View>
                    <View style={[styles.row, styles.mb20]}>
                      <PrimaryButton
                        onPress={this.getFrequency}
                        btnText="Frequency"
                      />
                      <Text style={styles.answer}>{frequency}</Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </Modal>
    );
  }
}
