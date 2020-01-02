import React from 'react';
import CatererDetailsScreen from './CatererDetailsScreen';
import RootScreen from '../RootScreen';

export default class extends React.Component {
    render() {
        return (
        <RootScreen>
            <CatererDetailsScreen navigation={this.props.navigation} />
        </RootScreen>
        );
    }
}