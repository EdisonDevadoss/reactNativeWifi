import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableHighlight, View } from "react-native";
import styles from "./PrimaryButtonStyleSheet";
const PrimaryButton = props => {
  return (
    <View style={props.style}>
      <TouchableHighlight
        {...props}
        onPress={props.onPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{props.btnText}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default PrimaryButton;
