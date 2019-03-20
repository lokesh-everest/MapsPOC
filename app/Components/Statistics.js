import React, { Component } from "react";
import { View, StyleSheet, Text,Dimensions } from "react-native";

export default class Statitics extends Component {
    render() {
        return (
            <View style={[styles.stats, { backgroundColor: this.props.reachedText ? "" : "" }]}>
                <View>
                    <Text style={styles.duration}>{this.props.duration} min</Text>
                    <Text style={styles.distance}>{this.props.distance} Km</Text>
                </View>
                <View>
                    <Text numberOfLines={1} style={styles.reachedText}>{this.props.reachedText}</Text>
                </View>
            </View>
        );
    }
}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    stats: {
        flexDirection: "row",
        padding: 10
    },
    distance: {
        fontWeight: "400",
        fontSize: width*0.05,
        left: 11
    },
    reachedText: {
        fontSize: width*0.06,
        left: 25,
        top: 10
    },
    duration: {
        left: 10,
        fontWeight: "800",
        fontSize: width*0.06,
    }
});
