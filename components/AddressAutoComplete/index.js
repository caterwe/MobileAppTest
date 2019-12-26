import React from 'react';
import { View ,Image , Button,ScrollView,TouchableOpacity,Text} from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import Layout from '../../common/Layout';
import { TextDisplay,TextInput } from '../Basics';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class extends React.Component {
    render() {
        return (
			<GoogleAutoComplete apiKey="AIzaSyDWb_4S_s0Ysn9mH_na2hDjsYcEExpYBNQ" debounce={300}>
			{({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
				<View>
				<TextInput 
					autoFocus={true}
					inputContainerStyle={{marginLeft:-10,marginRight:-10,padding:10,backgroundColor:'white', height:60,borderColor:'#DDDDDD',borderBottomWidth:1}}
					value={this.props.value}
					onChangeText={text=>{this.props.setStateValue(text);handleTextChange(text);}}
					placeholder={this.props.placeholder}
					rightIcon={()=>{
						if (this.props.value!==null && this.props.value.length>0)
							return (
								<Icon
								name="close"
								size={20}
								style={{marginRight:5,}}
								color={Colors.primaryTextColor3}
								onPress={()=>{this.props.setStateValue(null)}}
								/>
							);
					}
					}
				/>
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

	 
