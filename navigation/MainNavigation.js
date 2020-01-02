import {  createStackNavigator } from 'react-navigation-stack';
import { createTabNavigator  } from 'react-navigation-tabs';
import MainScreen from '../screens/MainScreen';
import LoginDetailsScreen from '../screens/LoginDetailsScreen'
import { createAppContainer } from 'react-navigation';
import SelectYourAddressScreen from '../screens/SelectYourAddressScreen';
import SearchScreen from '../screens/SearchScreen';
import CatererDetailsScreen from '../screens/CatererDetailsScreen';


const Stack1 = createStackNavigator (
    { 
        Main:{
            screen:MainScreen,
        },
        SelectYourAddress: {
            screen:SelectYourAddressScreen,
            navigationOptions: {
                gesturesEnabled: false,
            },            
        },
        Search: {
            screen:SearchScreen,
            navigationOptions: {
                gesturesEnabled: false,
            },    
        },
        CatererDetails: {
            screen:CatererDetailsScreen,
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
            tabBarVisible:false,
        }
    }
)

const loginStack = createStackNavigator (
    {
        LoginDetails:{
            screen:  LoginDetailsScreen, // ()=> (<RootScreen><LoginDetailsScreen /></RootScreen>),
            navigationOptions: {
                title:''
            }
        },
    }
    ,
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
            tabBarVisible:false
        }
    }
)

export const AppContainerMain=createAppContainer(Stack1);
export const AppContainerLogin = createAppContainer(loginStack);
