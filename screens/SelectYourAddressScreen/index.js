import React from 'react';
import SelectYourAddressScreen from './SelectYourAddressScreen';
import RootScreen from '../RootScreen';

export default class extends React.Component {
    render() {
        return (
        <RootScreen>
            <SelectYourAddressScreen navigation={this.props.navigation} />
        </RootScreen>
        );
    }
}