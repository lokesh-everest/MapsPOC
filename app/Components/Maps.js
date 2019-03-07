import React from 'react'
import {View,Button,Text,StyleSheet,Dimensions,Image} from 'react-native';
import MapView, { Marker, Polyline,LocalTile } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';
import Statistics from "./Statistics";

export default class Maps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance:0,
            duration:0,
        }
        this.mapRef = null;
        this.fitToMarkers = this.fitToMarkers.bind(this);
        this.state = {
            sourceCordinates: this.props.sourceCordinates,
            destinationCordinates: this.props.destinationCordinates,
            driverCordinates: this.props.sourceCordinates
        }
    }

    fitToMarkers() {
        this.mapRef.fitToCoordinates([this.state.driverCordinates, this.state.destinationCordinates], {
            edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
            animated: false
        })
    }
    render() {
        return (
            <View style={{flex:1}}>
            <MapView
                ref={(ref) => { this.mapRef = ref }}
                style={{ flex: 1 }}
                initialRegion={this.props.coordinates}
                showsUserLocation={true}
                onMapReady={this.fitToMarkers}>
                {
                    this.props.markers.map(marker => (
                        <Marker key={marker.key} coordinate={marker.coordinates} title={marker.title}>
                            <Image style={{width: 30, height: 30}} source={marker.imagePath}/>
                        </Marker>
                    ))
                }
                <MapViewDirections
                    origin={this.props.sourceCordinates}
                    destination={this.props.destinationCordinates}
                    apikey={Config.GOOGLE_MAPS_API_KEY}
                    waypoints={this.props.waypoints}
                    strokeColor="blue"
                    strokeWidth={3}
                    onReady={result=>{this.setState({duration:result.duration,distance:result.distance})}}
                />
                <Marker coordinate={this.state.driverCordinates} title={"Driver"} pinColor={"yellow"}>
                    <Image style={{width: 30, height: 30}} source={require("./delievery.png")}/>
                </Marker>
            </MapView>
            <View style={styles.button}>
                <Button title="End" onPress={()=>{this.props.onEndButtonPress}} color="black"/>
            </View>
            <View style={styles.text}>
                <Statistics duration={this.state.duration} distance={this.state.distance}/>
            </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    text:{
        bottom: 100,
        left: Dimensions.get('window').width/2-35,
        position: "absolute",
        backgroundColor:"black",
    },
    map:{
        flex:1,
        zIndex: -1
    },
    button:{
        bottom:100,
        left:Dimensions.get('window').width/2-90,
        position:"absolute",
    }
})