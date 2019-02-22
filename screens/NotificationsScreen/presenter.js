import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,  
  StyleSheet,
  Dimensions,
  FlatList
} from "react-native";
import Notification from "../../components/Notification";

const { width, height } = Dimensions.get("window");

const NotificationsScreen = props => (  
  <View style={styles.container}>
    {props.notifications.length === 0 && props.notifications.length > 1 ? (
      <Text style={styles.notFound}>
        No notifications yet! Come back soon!
      </Text>
    ) : (
      <FlatList
        data={props.notifications}
        keyExtractor={(item)=>(item.id.toString())}
        refreshing={props.isFetching}
        onRefresh={props.refresh}
        renderItem={({item})=>(
          <Notification  {...item} />          
        )}
      />      
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  notFound: {
    color: "#bbb",
    fontWeight: "600",
    alignSelf: "center",
    textAlign: "center",
    width,
    marginTop: 20
  }
});

NotificationsScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired  
};

export default NotificationsScreen;