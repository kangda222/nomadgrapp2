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

const LikesScreen = props => (  
  <View style={styles.container}>
    {props.likes.length === 0 ? (
      <Text style={styles.notFound}>
        No likes yet! Come back soon!
      </Text>
    ) : (
      <FlatList
        data={props.likes}
        keyExtractor={(item)=>(item.id.toString())}
        refreshing={props.isFetching}
        onRefresh={props.refresh}
        renderItem={({item})=>(
          <Notification  {...item} />          
        )}
      />      
    //<Text>likes!!!!!!!!!!!!!!!!</Text>
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

LikesScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  likes: PropTypes.array.isRequired  
};

export default LikesScreen;