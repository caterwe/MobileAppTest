import React from 'react';
import {Button, Input , Text,Image} from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import Colors from '../styles/Colors';

const TextDisplay = ({text, style, children,...props})=> {
	return(
		<Text style={{fontFamily:'BasicFont',color:Colors.primaryTextColor,...style}} {...props}>{children}</Text>
	);
}

const ButtonNormal = ({title,onPress,icon,type,buttonStyle,titleStyle,...props})=> {
	return(
		<Button
			title={title}
			buttonStyle={{borderRadius:10,backgroundColor:type==='clear'?'transparent':Colors.primaryButtonColor,...buttonStyle}}
			titleStyle={{fontFamily:'BasicFont',fontSize:16,color:type==='clear'?Colors.primaryButtonTitleColor2:Colors.primaryButtonTitleColor,...titleStyle}} 
			onPress={onPress}
			icon={icon}
			type={type}
			{...props}
		/>
	);
}

const TextInput = ({containerStyle,inputStyle,...props}) => {
	return (
		<Input {...props} inputStyle={{fontFamily:'BasicFont',fontSize:16, color:Colors.primaryTextInputForeColor,...inputStyle}} containerStyle={{...containerStyle}} inputContainerStyle={{padding:5,backgroundColor:Colors.primaryTextInputColor,borderColor:Colors.primaryBorderColor,borderBottomWidth:1}}/>
	)
}

const TextInputRounded = ({containerStyle,inputStyle,...props}) => {
	return (
		<Input {...props} inputStyle={{fontFamily:'BasicFont',fontSize:16,color:Colors.primaryTextInputForeColor,...inputStyle}} containerStyle={{...containerStyle}} inputContainerStyle={{padding:5,backgroundColor:Colors.primaryTextInputColor,borderColor:Colors.primaryBorderColor,borderWidth:1, borderRadius:5}} />	);
}

const ImageNormal = ({image,width,height})=>{
	return (
		<Image
            source={{uri: image}}
			style={{ width: width, height: height}}
			PlaceholderContent={<ActivityIndicator />}
			/>
	);
}

export {TextDisplay,ButtonNormal, TextInput, ImageNormal,TextInputRounded};
