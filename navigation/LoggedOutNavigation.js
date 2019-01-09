import { createStackNavigator } from "react-navigation";
import LogInScreen from "../screens/LogInScreen";

const LoggedOutNavigation = createStackNavigator({
  LogIn: {
    screen: LogInScreen,
    navigationOptions:{
        title:"Log In"
    }
  }
});

export default LoggedOutNavigation;