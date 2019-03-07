/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Config from 'react-native-config'

type Props = {};
export default class App extends Component<Props> {
    constructor() {
        super();
        this.state = {
            origin: { longitude: 77.609236, latitude: 12.973271 },
            destination: { longitude: 77.637401, latitude: 12.970359 },
            initialRegion: {
                longitude: 77.6198905,
                latitude: 12.9703533,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }
    render() {

        return (
            <MapView
                style={{ flex: 1 }}
                region={this.state.initialRegion}
            >
                <MapViewDirections
                    origin={this.state.origin}
                    destination={this.state.destination}
                    apikey={Config.GOOGLE_MAPS_API_KEY}
                    strokeColor="blue"
                    strokeWidth={3}
                />
            </MapView>
        );
    }
}

