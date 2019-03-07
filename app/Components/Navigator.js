import {createAppContainer, createStackNavigator} from "react-navigation";
import HomeScreen from "./HomeScreen";
import MapsContainer from "./MapsContainer";

const RootStack = createStackNavigator(
    {
        HomeScreen: HomeScreen,
        MapsContainer:MapsContainer,
    },
    {
        initialRouteName: 'HomeScreen',
    }
);

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;