import { createAppContainer, createStackNavigator } from "react-navigation";
import HomeScreen from "./HomeScreen";
import MapsContainerDelivery from "./DelieveryPerson/MapsContainerDelivery";
import MapsContainerUser from "./User/MapsContainerUser";

const RootStack = createStackNavigator(
    {
        HomeScreen: HomeScreen,
        MapsContainerDelivery: MapsContainerDelivery,
        MapsContainerUser: MapsContainerUser
    },
    {
        initialRouteName: "HomeScreen"
    }
);

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;
