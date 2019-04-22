/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class HiddenWifiScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I am the HiddenWifiScreen component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flex: 1,
    padding: 15,
    backgroundColor: "#F5FCFF"
  }
});
