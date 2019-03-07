import React from 'react';
import {View, Button,StyleSheet} from 'react-native'

export default class HomeScreen extends React.Component {

    handleUserClick=()=>{
        this.props.navigation.navigate('MapsContainer')
    }
    handleDelieveryClick=()=>{
        this.props.navigation.navigate('MapsContainer')
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button title={"User"} onPress={this.handleUserClick}/>
                <Button title={"Driver"} onPress={this.handleDelieveryClick}/>
            </View>
        )
    }
}