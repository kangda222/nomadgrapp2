import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeRoute from "../routes/HomeRoute";
import SearchRoute from "../routes/SearchRoute";
import NotificationsRoute from "../routes/NotificationsRoute";
import ProfileRoute from "../routes/ProfileRoute";
import { Ionicons } from "@expo/vector-icons";

const defaultScreen = () => <Text>defaultScreen</Text>;
const TabsNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "ios-home" : "md-home"}
            size={30}
            color={"black"}
          />
        )
      }
    },
    Search: {
      screen: SearchRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "ios-search" : "md-search"}
            size={30}
            color={"black"}
          />
        )
      }
    },
    AddPhoto: {
      screen: defaultScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <Ionicons name={"ios-add-circle-outline"} size={30} color={"black"} />
        ),
        //tabBarVisible : false,
        tabBarOnPress: () => {
          // Works!
          navigation.navigate("TakePhoto");
        },
      })
    },
    Notifications: {
      screen: NotificationsRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "ios-heart" : "ios-heart-empty"}
            size={30}
            color={"black"}
          />
        )
      }
    },
    Profile: {
      screen: ProfileRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "ios-person" : "md-person"}
            size={30}
            color={"black"}
          />
        )
      }
    },
  },
  {     
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#FBFBFB",
        height: 45
      }
    }
  }
);

export default createAppContainer(TabsNavigation);