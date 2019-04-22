/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button
} from "react-native";
import wifi from "react-native-android-wifi";
import styles from "./HomeScreenStyleSheet";
import PrimaryButton from "../../components/PrimaryButton";
import ConnectedModal from "../../components/ConnectedModal";

export default class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: "Home"
  };
  constructor(props) {
    super(props);
    this.state = {
      isWifiEnable: null,
      wifiList: [],
      modalVisible: false,
      currentWifi: null,
      ssid: null
    };
  }
  async componentDidMount() {
    console.log(wifi);
    await this.askForUserPermissions();
    this.serviceCheckOnPress();
  }

  async askForUserPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Wifi networks",
          message: "We need your permission in order to find wifi networks"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you for your permission! :)");
      } else {
        console.log(
          "You will not able to retrieve wifi available networks list"
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  serviceCheckOnPress = () => {
    wifi.isEnabled(isEnabled => {
      this.setState({ isWifiEnable: isEnabled });
    });
  };

  serviceSetEnableOnPress = enabled => {
    wifi.setEnabled(enabled);
    this.setState({ isWifiEnable: enabled, wifiList: [] });
  };

  getWifiNetworksOnPress() {
    wifi.loadWifiList(
      wifiStringList => {
        let wifiList = JSON.parse(wifiStringList);
        console.log("wifiList", wifiList);
        this.setState({
          wifiList: wifiList
        });
      },
      error => {
        console.log("error", error);
      }
    );
  }

  renderWifiList = () => {
    return this.state.wifiList.map((wifi, i) => {
      return (
        <TouchableOpacity
          key={i}
          onPress={this.openModal.bind(this, wifi)}
          style={styles.mb20}
        >
          <Text style={styles.instructionsTitle}>{wifi.SSID}</Text>
          <Text>BSSID: {wifi.BSSID}</Text>
          <Text>Capabilities: {wifi.capabilities}</Text>
          <Text>Frequency: {wifi.frequency}</Text>
          <Text>Level: {wifi.level}</Text>
          <Text>Timestamp: {wifi.timestamp}</Text>
        </TouchableOpacity>
      );
    });
  };

  openModal = wifi => {
    this.setState({
      modalVisible: true,
      currentWifi: wifi,
      ssid: wifi.SSID
    });
  };

  onConnected = () => {
    wifi.findAndConnect(this.state.ssid, this.state.pass, found => {
      console.log("found", found);
      this.setState({ ssidExist: found });
    });
  };

  render() {
    const { isWifiEnable, currentWifi } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>React Native Android Wifi</Text>
          <View style={[styles.row, styles.mb20]}>
            <PrimaryButton onPress={this.serviceCheckOnPress} btnText="Check" />
            <Text>
              {isWifiEnable ? "Your wifi is enabled" : "Your wifi is Disabled"}
            </Text>
          </View>
          <View style={styles.mb20}>
            {!this.state.isWifiEnable && (
              <PrimaryButton
                onPress={this.serviceSetEnableOnPress.bind(this, true)}
                btnText="Enable"
              />
            )}
            {this.state.isWifiEnable && (
              <PrimaryButton
                onPress={this.serviceSetEnableOnPress.bind(this, false)}
                btnText="Disable"
              />
            )}
          </View>
          <PrimaryButton
            style={styles.mb20}
            onPress={() => this.props.navigation.navigate("HiddenWifi")}
            btnText="Connect Hidden Wifi"
          />

          <PrimaryButton
            onPress={this.getWifiNetworksOnPress.bind(this)}
            btnText="Show wifi List"
          />
          <ScrollView>{this.renderWifiList()}</ScrollView>
        </View>
        <ConnectedModal
          modalVisible={this.state.modalVisible}
          onClose={() => this.setState({ modalVisible: false })}
          currentWifi={currentWifi}
        />
      </ScrollView>
    );
  }
}
