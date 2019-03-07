import React from 'react';
import {View, Button, StyleSheet, Dimensions, TouchableOpacity, Text} from 'react-native'

export default class HomeScreen extends React.Component {

    handleUserClick=()=>{
        this.props.navigation.navigate('MapsContainerUser')
    }
    handleDeliveryClick=()=>{
        this.props.navigation.navigate('MapsContainerDelivery')
    }
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.button}
                                  onPress={this.handleUserClick}><Text>User</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                  onPress={this.handleDeliveryClick}><Text>Driver</Text></TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        color: '#ffffff',
        backgroundColor:'#1E6738',
        paddingTop:10,
        paddingBottom:10,
    }
})