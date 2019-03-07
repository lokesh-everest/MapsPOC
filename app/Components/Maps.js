import React from 'react'
import {View,Button,Text,StyleSheet,Dimensions,Image} from 'react-native';
import MapView, { Marker, Polyline,LocalTile } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';
import Statistics from "./Statistics";

export default class Maps extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
        this.state = {
            distance:0,
            duration:0,
            sourceCoordinates: this.props.sourceCoordinates,
            destinationCoordinates: this.props.destinationCoordinates,
            driverCoordinates: this.props.sourceCoordinates,
            initialMap: this.props.initialMap
        };
        this.fitToMarkers = this.fitToMarkers.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.updateDriverCoordinates(nextProps.driverCoordinates);
    }

    updateDriverCoordinates(updatedDriverCoordinates) {
        this.setState({driverCoordinates: updatedDriverCoordinates}, () => {
            this.fitToMarkers()
        });
    }
    fitToMarkers() {
        this.mapRef.fitToCoordinates([this.state.driverCoordinates, this.state.destinationCoordinates], {
            edgePadding: {top: 50, right: 20, bottom: 20, left: 20},
            animated: true
        })
    }
    render() {
        return (
            <View style={{flex:1}}>
            <MapView
                ref={(ref) => { this.mapRef = ref }}
                style={{ flex: 1 }}
                initialRegion={this.state.initialMap}
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
                    origin={this.state.driverCoordinates}
                    destination={this.state.destinationCoordinates}
                    apikey={Config.GOOGLE_MAPS_API_KEY}
                    waypoints={this.props.waypoints}
                    strokeColor="blue"
                    strokeWidth={3}
                    onReady={result => {
                        const duration = Math.ceil(result.duration);
                        const distance = Math.round(result.distance * 100) / 100;
                        this.setState({duration: duration, distance: distance})
                    }}
                />
                <Marker coordinate={this.state.driverCoordinates} title={"Driver"}>
                    <Image style={{width: 30, height: 30}} source={require("./../assets/delievery.png")}/>
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