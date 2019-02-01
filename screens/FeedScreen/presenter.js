import React from "react";
import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const FeedScreen = props => (
    <ScrollView
        refreshControl={
        <RefreshControl
            refreshing={props.isFetching}
            onRefresh={props.refresh}
            tintColor={"black"}
        />
        }
        contentContainerStyle={styles.container}
    />
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white"
    }
});
  
FeedScreen.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired
};

export default FeedScreen;