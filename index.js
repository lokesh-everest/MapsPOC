/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

let getCurrentLocation=async (data)=>{
    //blah
};

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('getCurrentLocation', () => getCurrentLocation);