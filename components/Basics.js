import React from 'react';
import {Button, Input , Text,Image} from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import Colors from '../styles/Colors';

const TextDisplay = ({text, style, children,...props})=> {
	return(
		<Text style={{fontFamily:'BasicFont',color:Colors.primaryTextColor,...style}} {...props}>{children}</Text>
	);
}

const ButtonNormal = ({title,onPress,icon,loading,type,buttonStyle,...props})=> {
	return(
		<Button
			title={title}
			buttonStyle={{borderRadius:10,backgroundColor:type==='clear'?'transparent':Colors.primaryButtonColor,...buttonStyle,}}
			titleStyle={{fontFamily:'BasicFont',color:type==='clear'?Colors.primaryButtonTitleColor2:Colors.primaryButtonTitleColor}} 
			onPress={onPress}
			icon={icon}
			{...loading}
			type={type}
			{...props}
		/>
	);
}

const TextInput = ({containerStyle,...props}) => {
	return (
		<Input {...props} containerStyle={containerStyle!=null?containerStyle:{}}/>
	)
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

export {TextDisplay,ButtonNormal, TextInput, ImageNormal};
