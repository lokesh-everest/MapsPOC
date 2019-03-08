import React from 'react';
import {View, Button, StyleSheet, Dimensions, TouchableOpacity, Text,Image} from 'react-native'

export default class HomeScreen extends React.Component {

    handleUserClick =()=>{
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
                    <TouchableOpacity style={styles.button} onPress={this.handleUserClick}>
                        <Image style={{width:50,height:50}} source={require('./../assets/home.png')} />
                            <Text style={{color: 'black'}}>User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}  onPress={this.handleDeliveryClick}>
                        <Image style={{width:50,height:50}} source={require('./../assets/delievery.png')} />
                            <Text style={{color: 'black'}}>Delivery Person</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: 'red',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        marginRight: 20
    }
})