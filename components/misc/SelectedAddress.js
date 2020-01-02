import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ButtonNormal,TextDisplay} from '../Basics';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class SelectedAddress extends React.Component {

	getSelectedPickupDateTimePreferenceText() {
		
		if (this.props.selectedPickupPreference!==null && this.props.selectedPickupPreference!==undefined) {
			switch(this.props.selectedPickupPreference) {
				case 0 :
						console.log(this.props.selectedPickupPreference);
						return "Pickup on " + this.props.selectedPickupDate;
				case 1:
					return "Pickup ASAP";
			}
		}
		return "Set Pickup Date/Time";
	}

	render() {
		return (
			<TouchableOpacity onPress={this.props.onPress} style={{alignSelf:'center'}}>
						<View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
							<TextDisplay style={{color:Colors.primaryHeaderForeColor,fontSize:16}}>{this.props.address}</TextDisplay>
							<Icon
								name={this.props.arrowDown?"arrow-down":"arrow-up"}
								size={12}
								color="white"
								style={{marginLeft:2,marginTop:2}}
								/>
						</View>
		<TextDisplay style={{color:Colors.primaryHeaderForeColor,fontSize:13,alignSelf:'center'}}>{this.getSelectedPickupDateTimePreferenceText()}</TextDisplay>				
			</TouchableOpacity>
		);
	}
}
