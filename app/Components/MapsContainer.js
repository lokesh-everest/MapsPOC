import React, {Component} from 'react'
import Maps from "./Maps";

export default class MapsContainer extends Component {
    constructor(props) {
        super(props);
        const sourceCord = {
            latitude: 12.9703591,
            longitude: 77.6352114
        };
        const destCord = {
            latitude: 12.9729726,
            longitude: 77.6070906
        };
        this.state = {
            sourceCord: sourceCord,
            destCord: destCord,
            markers: [{
                key: 1,
                coordinates: sourceCord,
                title: "Source",
                imagePath: require("./restaurant.png")
            }, {
                key: 2,
                coordinates: destCord,
                title: "Destination",
                imagePath:require("./home.png")
            }],
            initialMap: {
                latitude: sourceCord.latitude,
                longitude: sourceCord.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        }
    }

    render() {
        return (
            <Maps markers={this.state.markers} initalMap={this.state.initialMap}
                  sourceCordinates={this.state.sourceCord} destinationCordinates={this.state.destCord}/>
        )
    }

}