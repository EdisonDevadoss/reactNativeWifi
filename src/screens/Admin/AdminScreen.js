import React from "react";
import PropTypes from "prop-types";
import { WebView } from "react-native";

const AdminScreen = props => (
  <WebView source={{ uri: "http://192.168.0.1" }} style={{ marginTop: 20 }} />
);

export default AdminScreen;
