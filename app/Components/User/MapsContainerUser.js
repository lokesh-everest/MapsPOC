import React, { Component } from "react";
import MapsUser from "./MapsUser";
import {fetchRoute} from '../functions';
import SocketIOClient from "socket.io-client";
import Config from "react-native-config";

export default class MapsContainerUser extends Component {
    constructor(props) {
        super(props);
        const sourceCord = {
            latitude: 12.974963,
            longitude: 77.609139
        };
        const destCord = {
            latitude: 12.9704,
            longitude: 77.637398
        };
        this.socket = SocketIOClient("http://13.232.206.133:3000");
        this.state = {
            currentSourceCord: sourceCord,
            destCord: destCord,
            markers: [{
                key: 1,
                coordinates: sourceCord,
                title: "Source",
                imagePath: require("./../../assets/restaurant.png")
            }, {
                key: 2,
                coordinates: destCord,
                title: "Destination",
                imagePath: require("./../../assets/home.png")
            }],
            initialMap: {
                latitude: sourceCord.latitude,
                longitude: sourceCord.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            driverCoordinates: sourceCord,
            angle: 0,
            traveledPathCoordinates: []
        };
    }

    componentDidMount() {
        fetchRoute(this.state.currentSourceCord,this.state.destCord,Config.GOOGLE_MAPS_API_KEY).then(
            (result) => {
                this.setState({
                    destCord:result.coordinates[result.coordinates.length-1]
                })
            }
        )
        this.socket.on('customerEvent', (message) => {
            this.setState({driverCoordinates:message.coords, angle: message.angle});
        });
    }
    static navigationOptions = ({}) => {
        return {
            headerTitle: "User"
        };
    };
    render() {
        return (
            <MapsUser markers={this.state.markers}
                      driverCoordinates={this.state.driverCoordinates}
                      angle={this.state.angle}
                      initalMap={this.state.initialMap}
                      sourceCoordinates={this.state.currentSourceCord}
                      destinationCoordinates={this.state.destCord}/>
        )
    }
}