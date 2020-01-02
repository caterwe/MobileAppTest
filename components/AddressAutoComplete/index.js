import React from 'react';
import { View ,Image , Button,ScrollView,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import Layout from '../../common/Layout';
import { TextDisplay,TextInput, FloatingLabelInput } from '../Basics';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class extends React.Component {
    render() {
        return (
			<GoogleAutoComplete apiKey="AIzaSyDWb_4S_s0Ysn9mH_na2hDjsYcEExpYBNQ" debounce={300}>
			{({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
				<View>
			        <FloatingLabelInput 
						value={this.props.value}
						inputStyle={{fontSize:14}}
						onChangeText={text=>{this.props.setStateValue(text);handleTextChange(text);}}
						placeholder="Your Address"
						autoFocus={true}
					></FloatingLabelInput>


				{this.props.value!==null && this.props.value.length>1 && (
				<ScrollView style={{maxHeight:Layout.window.height}}>
					{locationResults.map((el, i) => (
					<TouchableOpacity onPress={()=>{this.props.handleLocationResultClick(el)}} key={String(i)}>
						<View style={{flexDirection:'column',padding:15, borderBottomWidth:1,borderColor:Colors.primaryBorderColor}}>
							<TextDisplay style={{fontSize:18,color:Colors.primaryTextColor2}}>{el.structured_formatting.main_text} </TextDisplay>
							<TextDisplay style={{fontSize:16,color:Colors.primaryTextColor3}}>{el.structured_formatting.secondary_text} </TextDisplay>
						</View>
					</TouchableOpacity> 
					))}
				</ScrollView>
				)}

				</View>
			)}
			</GoogleAutoComplete>
        );
    }
}
