import React from 'react';
import LoginDetailsScreen from './LoginDetailsScreen';
import RootScreen from '../RootScreen';

export default class extends React.Component {
    render() {
        return (
        <RootScreen>
            <LoginDetailsScreen navigation={this.props.navigation} />
        </RootScreen>
        );
    }
}