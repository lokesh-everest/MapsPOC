import React, {Component} from 'react'
import MapsUser from "./MapsUser";

export default class MapsContainerUser extends Component {
    constructor(props) {
        super(props);
        const sourceCord = {
            latitude: 12.974963,
            longitude: 77.609139
        };
        const destCord = {
            latitude: 12.970400,
            longitude: 77.637398
        };
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
            traveledPathCoordinates: []
        }
    }

    getDelieveryPersonCoordinates = () => {

    };

    render() {
        return (
            <MapsUser markers={this.state.markers} driverCoordinates={this.state.driverCoordinates}
                      initalMap={this.state.initialMap}
                      sourceCoordinates={this.state.currentSourceCord} destinationCoordinates={this.state.destCord}/>
        )
    }

}