import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default class ReachedMessage extends Component {
    render() {
        return (
            <View style={styles.reachedView}>
                <Text style={{ color: "blue", fontSize: 20 }}>
                    {this.props.text}
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    reachedView: {
        bottom: 200,
        left: Dimensions.get("window").width / 2 - 65,
        position: "absolute",
        backgroundColor: "#eff1f4"
    }
});
