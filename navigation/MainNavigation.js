import {  createStackNavigator } from 'react-navigation-stack';
import { createTabNavigator  } from 'react-navigation-tabs';
import MainScreen from '../screens/MainScreen';
import LoginDetailsScreen from '../screens/LoginDetailsScreen'
import { createAppContainer } from 'react-navigation';

const Stack1 = createStackNavigator (
    { 
        Main:{
            screen:MainScreen,
        },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
            tabBarVisible:false
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
