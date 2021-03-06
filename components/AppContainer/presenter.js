import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";
import RootNavigation from "../../navigation/RootNavigation";

class AppContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    initApp: PropTypes.func.isRequired
  };
  componentDidMount() {
    const { isLoggedIn, initApp } = this.props;
    if (isLoggedIn) {
      initApp();
    }
  }
  render() {
    const { isLoggedIn, profile } = this.props;
    console.log("appContainer isLoggedIn :: "+isLoggedIn);
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        {isLoggedIn && profile ? <RootNavigation screenProps={{ username: profile.username }}/> : <LoggedOutNavigation/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center"
  }
});

export default AppContainer;