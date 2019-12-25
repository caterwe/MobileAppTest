import React from 'react';
import SearchScreen from './SearchScreen';
import RootScreen from '../RootScreen';

export default class extends React.Component {
    render() {
        return (
        <RootScreen>
            <SearchScreen navigation={this.props.navigation} />
        </RootScreen>
        );
    }
}