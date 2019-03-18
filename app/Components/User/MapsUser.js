import React from 'react'
import {Button, View, Image, StyleSheet, Dimensions,Text} from 'react-native';
import MapView, {Marker} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';
import Statistics from "../Statistics";

export default class MapsUser extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
        this.state = {
            distance: 0,
            duration: 0,
            sourceCoordinates: this.props.sourceCoordinates,
            destinationCoordinates: this.props.destinationCoordinates,
            driverCoordinates: this.props.sourceCoordinates,
            initialMap: this.props.initialMap
        };
        this.fitToMarkers = this.fitToMarkers.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({driverCoordinates: nextProps.driverCoordinates});
    }

    fitToMarkers() {
        this.mapRef.fitToCoordinates([this.state.driverCoordinates, this.state.destinationCoordinates], {
            edgePadding: {top: 50, right: 20, bottom: 20, left: 20},
            animated: true
        })
    }

    moveDriverSmoothly(updatedCoords, timeToTraverse) {
        if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(updatedCoords, timeToTraverse);
        }
    }

    _gotoCurrentLocation() {
        this.mapRef.animateToRegion({
            latitude: this.state.driverCoordinates.latitude,
            longitude: this.state.driverCoordinates.longitude,
            latitudeDelta: 0.0059397161733585335,
            longitudeDelta: 0.005845874547958374
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>User</Text>
                <MapView
                    ref={(ref) => {
                        this.mapRef = ref
                    }}
                    style={{flex: 1}}
                    initialRegion={this.state.initialMap}
                    showsUserLocation={false}
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
                        strokeColor={"#0F85BF"}
                        strokeWidth={7}
                        resetOnChange={false}
                        onReady={result => {
                            const duration = Math.ceil(result.duration);
                            const distance = Math.round(result.distance * 100) / 100;
                            let timeToTraverse = 2000;
                            const distanceMoved = Math.abs(this.state.distance - distance);
                            if (distanceMoved < 0.5) {
                                timeToTraverse = (distanceMoved / 0.2) * 1000;
                            }
                            this.moveDriverSmoothly(this.state.driverCoordinates, timeToTraverse);
                            distance > 1 ? this._gotoCurrentLocation() : this.fitToMarkers();
                            this.setState({duration: duration, distance: distance})
                        }}
                    />
                    <Marker.Animated
                        ref={marker => {
                        this.marker = marker;}}
                        coordinate={this.state.driverCoordinates} title={"Driver"}>
                        <Image style={{width: 30, height: 30}} source={require("./../../assets/delievery.png")}/>
                    </Marker.Animated>
                </MapView>
                <View style={styles.text}>
                    <Statistics duration={this.state.duration} distance={this.state.distance}/>
                </View>
                <Button title='Fit' onPress={this.fitToMarkers}/>
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