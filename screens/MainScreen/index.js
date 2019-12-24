import React from 'react';
import MainScreen from './MainScreen';
import RootScreen from '../RootScreen';

export default class extends React.Component {
    render() {
        return (
        <RootScreen>
            <MainScreen navigation={this.props.navigation} />
        </RootScreen>
        );
    }
}