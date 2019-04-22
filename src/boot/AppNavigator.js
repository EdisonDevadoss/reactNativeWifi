import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/Home";
import HiddenWifiScreen from "../screens/HiddenWifi";

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  HiddenWifi: HiddenWifiScreen
});
export default createAppContainer(AppNavigator);
