import React, {Component} from 'react'
import MapsDelivery from "./MapsDelivery";
import {PermissionsAndroid} from 'react-native';

export default class MapsContainerDelivery extends Component {
    constructor(props) {
        super(props);
        const userCoordinates = {
            latitude: 12.974963,
            longitude: 77.609139
        };
        const destCord = {
            latitude: 12.970400,
            longitude: 77.637398
        };
        this.state = {
            currentSourceCord: userCoordinates,
            destCord: destCord,
            markers: [{
                key: 1,
                coordinates: userCoordinates,
                title: "Source",
                imagePath: require("./../../assets/restaurant.png")
            }, {
                key: 2,
                coordinates: destCord,
                title: "Destination",
                imagePath: require("./../../assets/home.png")
            }],
            initialMap: {
                latitude: userCoordinates.latitude,
                longitude: userCoordinates.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            driverCoordinates: userCoordinates,
            traveledPathCoordinates: []
        }
    }


    async componentDidMount() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {},
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.intervalId = setInterval(this.updateDriverCoordinates, 5000);

            } else {
                console.log("Give location permission and  turn on gps");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    updateDriverCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let coords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                this.state.traveledPathCoordinates.push(coords);
                this.setState({driverCoordinates: coords});
            }, (error) => {
                console.log(error)
            },
            {enableHighAccuracy: false, timeout: 10000, maximumAge: 1000},);
    };

    render() {
        return (
            <MapsDelivery markers={this.state.markers} driverCoordinates={this.state.driverCoordinates}
                          initalMap={this.state.initialMap}
                          sourceCoordinates={this.state.currentSourceCord} destinationCoordinates={this.state.destCord}/>
        )
    }

}