import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Config from "react-native-config";
import Statistics from "../Statistics";
import { distanceInKmBetweenEarthCoordinates } from "../functions";
import ReachedMessage from "../ReachedMessage";
import FitButton from "../FitButton";

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
        this.setState({ driverCoordinates: nextProps.driverCoordinates });
    }

    fitToMarkers() {
        this.mapRef.fitToCoordinates([this.state.driverCoordinates, this.state.destinationCoordinates], {
            edgePadding: {top: 50, right: 20, bottom: 20, left: 20},
            animated: true
        });
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
    isDriverNearToDestination = () => {
        const destinationLatitude = this.state.destinationCoordinates.latitude;
        const destinationLongitude = this.state.destinationCoordinates
            .longitude;
        const driverLatitude = this.state.driverCoordinates.latitude;
        const driverLongitude = this.state.destinationCoordinates.longitude;
        return (
            distanceInKmBetweenEarthCoordinates(
                driverLatitude,
                driverLongitude,
                destinationLatitude,
                destinationLongitude
            ) <= 0.01
        );
    };
    getCompleted = () => {
        return <ReachedMessage text={"Delivery has arrived"} />;
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
                    let timeToTraverse = 2000;
                    const distanceMoved = Math.abs(
                        this.state.distance - distance
                    );
                    if (distanceMoved < 0.5) {
                        timeToTraverse = (distanceMoved / 0.2) * 1000;
                    }
                    this.moveDriverSmoothly(
                        this.state.driverCoordinates,
                        timeToTraverse
                    );
                    distance > 1
                        ? this._gotoCurrentLocation()
                        : this.fitToMarkers();
                    this.setState({ duration: duration, distance: distance });
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
                    onMapReady={this.fitToMarkers}
                >
                    {this.props.markers.map(marker => (
                        <Marker
                            key={marker.key}
                            coordinate={marker.coordinates}
                            title={marker.title}
                        >
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={marker.imagePath}
                            />
                        </Marker>
                    ))}
                    {isDriverNearToDestination ? <></> : this.getDirections()}
                    <Marker.Animated
                        ref={marker => {this.marker = marker;}}
                        style={{
                            transform: [{ rotate: '0deg' }]
                        }}
                        coordinate={this.state.driverCoordinates} title={"Driver"}>
                        <Image style={{width: 20, height: 40}} source={require("./../../assets/delievery.png")}/>
                    </Marker.Animated>
                </MapView>
                <View>
                    <Statistics
                        duration={this.state.duration}
                        distance={this.state.distance}
                        reachedText={
                            isDriverNearToDestination
                                ? "You are at destination"
                                : ""
                        }
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
