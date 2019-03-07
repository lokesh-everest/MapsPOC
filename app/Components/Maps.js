import React from 'react'
import MapView, {Marker, Polyline} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';

export default class Maps extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
        this.fitToMarkers = this.fitToMarkers.bind(this);
    }

    fitToMarkers() {
        console.log("Component is mounted");
        this.mapRef.fitToCoordinates([this.props.sourceCordinates, this.props.destinationCordinates], {
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
                        <Marker key={marker.key} coordinate={marker.coordinates} title={marker.title}/>
                    ))
                }
                <MapViewDirections
                    origin={this.props.sourceCordinates}
                    destination={this.props.destinationCordinates}
                    apikey={Config.GOOGLE_MAPS_API_KEY}
                    strokeColor="blue"
                    strokeWidth={3}
                />
            </MapView>
        )
    }
}