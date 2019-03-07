import React,{Component} from 'react';
import { View,StyleSheet,Text } from 'react-native';

export default class Statitics extends Component{

    render(){
        return(
            <View>
                <Text style={styles.text}>Distance:{this.props.distance} Km</Text>
                <Text style={styles.text}>Duration:{this.props.duration} min</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create(
    {
        text:{
            color:"white"
        }
    }
)