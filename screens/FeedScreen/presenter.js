import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Photo from "../../components/Photo";

const FeedScreen = props => (    
    <View style={styles.container}>
        <FlatList
            data={props.feed}
            keyExtractor={(item)=>(item.id.toString())}
            refreshing={props.isFetching}
            onRefresh={props.refresh}
            renderItem={({item})=>(
              <Photo  {...item} />          
            )}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white"
    }
});
  
FeedScreen.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    feed: PropTypes.array.isRequired
};

export default FeedScreen;