import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Config from "react-native-config";
import Statistics from "../Statistics";
import { distanceInKmBetweenEarthCoordinates } from "../functions";
import FitButton from "../FitButton";

export default class MapsDelivery extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
        this.state = {
            angle: 0,
            distance: 0,
            duration: 0,
            sourceCoordinates: this.props.sourceCoordinates,
            destinationCoordinates: this.props.destinationCoordinates,
            driverCoordinates: this.props.sourceCoordinates,
            initialMap: this.props.initialMap,
            driverMarker: this.props.driverCoordinates
        };
        this.fitToMarkers = this.fitToMarkers.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const rotationAngle = this.findRotationAngle(nextProps.driverCoordinates);
        this.setState({driverCoordinates: nextProps.driverCoordinates, angle: rotationAngle});
    }

    moveDriverSmoothly(updatedCoords, timeToTraverse) {
        if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(updatedCoords, timeToTraverse);
        }
    }

    findRotationAngle(newDriverCoordinates) {
        var angle = this.findAngle(this.state.driverCoordinates, newDriverCoordinates);
        const DOWN = 0, PI_ANGLE = 180;
        var rotationAngle = angle;
        var directionOfMovement = newDriverCoordinates.longitude - this.state.driverCoordinates.longitude;
        if (directionOfMovement < DOWN) {
            if (angle >= 0) {
                rotationAngle = PI_ANGLE + angle;
            }
        } else {
            if (angle < 0) {
                rotationAngle = PI_ANGLE + angle;
            }
        }
        return rotationAngle
    }

    fitToMarkers() {
        this.mapRef.fitToCoordinates([this.state.driverCoordinates, this.state.destinationCoordinates], {
            edgePadding: {top: 50, right: 20, bottom: 20, left: 20},
            animated: true
        });
    }

    findAngle(oldDriverCoordinates, newDriverCoordinates) {
        var longitudeDiff = newDriverCoordinates.longitude - oldDriverCoordinates.longitude;
        var latitudeDiff = newDriverCoordinates.latitude - oldDriverCoordinates.latitude;
        var radians = Math.atan(longitudeDiff / latitudeDiff);
        var degrees = radians * 180 / Math.PI;
        return degrees;
    }

    _gotoCurrentLocation() {
        this.mapRef.animateToRegion({
            latitude: this.state.driverCoordinates.latitude,
            longitude: this.state.driverCoordinates.longitude,
            latitudeDelta: 0.0059397161733585335,
            longitudeDelta: 0.005845874547958374
        });
    }
    isDriverNearToDestination = () => {
        const MINIMUM_DISTANCE = 0.015;
        const destinationLatitude = this.state.destinationCoordinates.latitude;
        const destinationLongitude = this.state.destinationCoordinates.longitude;
        const driverLatitude = this.state.driverCoordinates.latitude;
        const driverLongitude = this.state.driverCoordinates.longitude;
        const distance = distanceInKmBetweenEarthCoordinates(
            driverLatitude,
            driverLongitude,
            destinationLatitude,
            destinationLongitude
        );
        if (distance <= MINIMUM_DISTANCE && this.state.driverMarker.latitude !== driverLatitude) {
            this.setState({
                driverMarker: this.state.driverCoordinates,
                duration: 0,
                distance: Math.round(distance*10)/10
            });
        }
        return distance <= MINIMUM_DISTANCE;
    };
    getDirections = () => {
        return (
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
                    const coords = result.coordinates[0];
                    if (distance > 0.01) {
                        this.props.socket.emit("driverEvent", { coords: coords, angle: this.state.angle });
                    } else {
                        this.props.socket.emit("driverEvent", { coords: result.coordinates[result.coordinates.length - 1], angle: this.state.angle });
                    }
                    let timeToTraverse = 2000;
                    const distanceMoved = Math.abs(this.state.distance - distance);
                    if (distanceMoved < 0.5) {
                        timeToTraverse = (distanceMoved / 0.2) * 1000;
                    }
                    this.moveDriverSmoothly(coords, timeToTraverse);
                    distance > 1 ? this._gotoCurrentLocation() : this.fitToMarkers();
                    this.setState({
                        driverMarker: coords,
                        duration: duration,
                        distance: distance
                    });
                }}
            />
        );
    };
    render() {
        const isDriverNearToDestination = this.isDriverNearToDestination();
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    ref={ref => {
                        this.mapRef = ref;
                    }}
                    style={{ flex: 1 }}
                    initialRegion={this.state.initialMap}
                    showsUserLocation={false}
                    onMapReady={this.fitToMarkers}>
                    {this.props.markers.map(marker => (
                        <Marker key={marker.key} coordinate={marker.coordinates} title={marker.title}>
                            <Image style={{ width: 30, height: 30 }} source={marker.imagePath} />
                        </Marker>
                    ))}
                    {isDriverNearToDestination ? <></> : this.getDirections()}
                    <Marker.Animated
                        ref={marker => {
                            this.marker = marker;
                        }}
                        style={{transform: [{rotate: this.state.angle + 'deg'}]}}
                        coordinate={this.state.driverMarker} title={"Driver"}>
                        <Image style={{width: 20, height: 40}} source={require("./../../assets/delievery.png")}/>
                    </Marker.Animated>
                </MapView>
                <View>
                    <Statistics
                        duration={this.state.duration}
                        distance={this.state.distance}
                        reachedText={isDriverNearToDestination ? "You are at destination" : ""}
                    />
                </View>
                <View style={styles.button}>
                    <FitButton fitToMarkers={this.fitToMarkers} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    map: {
        flex: 1,
        zIndex: -1
    },
    button: {
        bottom: 80,
        width: 60,
        alignItems: "center",
        left: Dimensions.get("window").width - 100,
        position: "absolute",
        marginTop: 5,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "#00BCD4",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#fff"
    }
});
