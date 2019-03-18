import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";

export default class FitButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.fitToMarkers}>
                <Text style={{ fontSize: 18 }}>Fit</Text>
            </TouchableOpacity>
        );
    }
}
