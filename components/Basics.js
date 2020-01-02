import React from 'react';
import {Button, Input , Text,Image, ButtonGroup} from 'react-native-elements';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';
import FloatingLabel from 'react-native-floating-labels'

const TextDisplay = ({style, children,...props})=> {
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

const ButtonGroupNormal = ({onPress,selectedIndex,buttons}) => (
	<ButtonGroup 
	onPress={onPress}
	selectedIndex={selectedIndex}
	buttons={buttons}
	containerStyle={styles.buttonGroupContainerStyle}
	selectedTextStyle= {styles.buttonGroupSelectedTextStyle}
	textStyle={styles.buttonGroupTextStyle}
	selectedButtonStyle={styles.buttonGroupSelectedButtonStyle}
	innerBorderStyle={{width:1,color:'#D6D6D6'}}
	/> 
)

const TextInput = ({containerStyle,inputContainerStyle,inputStyle,...props}) => {
	return (
		<Input {...props} inputStyle={{fontFamily:'BasicFont',fontSize:16, color:Colors.primaryTextInputForeColor,...inputStyle}} containerStyle={{...containerStyle}} inputContainerStyle={{padding:5,backgroundColor:Colors.primaryTextInputColor,borderColor:Colors.primaryBorderColor,borderBottomWidth:1,...inputContainerStyle}}/>
	)
}

const TextInputRounded = ({containerStyle,inputStyle,...props}) => {
	return (
		<Input {...props} inputStyle={{fontFamily:'BasicFont',fontSize:16,color:Colors.primaryTextInputForeColor,...inputStyle}} containerStyle={{...containerStyle}} inputContainerStyle={{padding:5,backgroundColor:Colors.primaryTextInputColor,borderColor:Colors.primaryBorderColor,borderWidth:1, borderRadius:5,height:40}} />	);
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

const FloatingLabelInput = ({placeholder,inputStyle,style,...props}) => {
	return (
		<FloatingLabel 
		labelStyle={{fontSize:14,fontFamily:'BasicFont'}} 
		inputStyle={{padding:0, borderWidth: 0,fontSize:14,fontFamily:'BasicFont',...inputStyle}}
		style={{paddingTop:0,backgroundColor: Colors.primaryTextInputColor,borderBottomWidth:1,borderBottomColor:Colors.primaryBorderColor,...style}}
		{...props}
	>{placeholder}</FloatingLabel>
	)
}

const styles = StyleSheet.create({
    buttonGroupContainerStyle: {
        margin:2,padding:0,marginLeft:5,marginRight:5,
        borderWidth:2,borderColor:Colors.buttonGroupBackGroundColor,borderRadius:10,
        backgroundColor:Colors.buttonGroupBackGroundColor,height:35,
    },
    buttonGroupTextStyle: {
        fontFamily:'BasicFont',
        fontSize:14,
        borderWidth:0,
    },
    buttonGroupSelectedTextStyle: {
        fontFamily:'BasicFont',
        fontSize:14,
        borderWidth:0,
    },    
    buttonGroupSelectedButtonStyle: {
        borderWidth:0,
    }
})

export {TextDisplay,ButtonNormal, TextInput, ImageNormal,TextInputRounded,FloatingLabelInput,ButtonGroupNormal};
