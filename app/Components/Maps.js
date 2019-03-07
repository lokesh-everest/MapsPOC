import React from 'react'
import MapView, {Marker, Polyline} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';
import {Image} from 'react-native'

export default class Maps extends React.Component {
    constructor(props) {
        super(props);
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
            <MapView
                ref={(ref) => {this.mapRef = ref}}
                style={{flex: 1}}
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
                    strokeColor="blue"
                    strokeWidth={3}
                />
                <Marker coordinate={this.state.driverCordinates} title={"Driver"} pinColor={"yellow"}>
                    <Image style={{width: 30, height: 30}} source={require("./delievery.png")}/>
                </Marker>
            </MapView>
        )
    }
}