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
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity style={styles.button}
                                      onPress={this.handleUserClick}><Text style={{color: 'white'}}>User</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                                      onPress={this.handleDeliveryClick}><Text style={{color: 'white'}}>Driver</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        color: 'red',
        backgroundColor:'#04528a',
        padding: 20,
        marginRight: 20
    }
})