import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/Home";
import HiddenWifiScreen from "../screens/HiddenWifi";
import AdminScreen from "../screens/Admin";

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  HiddenWifi: HiddenWifiScreen,
  Admin: AdminScreen
});
export default createAppContainer(AppNavigator);
