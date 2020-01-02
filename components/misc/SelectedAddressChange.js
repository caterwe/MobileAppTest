import React from 'react';
import { View , StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {TextDisplay,ButtonNormal,ButtonGroupNormal} from '../Basics';
import Colors from '../../styles/Colors';
import DateTimePicker from "react-native-modal-datetime-picker";
import Layout from '../../common/Layout';
import Helper from '../../common/Helper';

export default class SelectedAddressChange extends React.Component {

    state={
        selectedPickupDateTimePrefernce:0,
        displayDateTimePicker:0,
        selectedPickupDate:null,
        selectedPickupTime:null,
    }

    componentDidMount() {
        if (Helper.isNotNullOrUndefined(this.props.selectedPickupPreference)) {
            this.setState({selectedPickupDateTimePrefernce:this.props.selectedPickupPreference,selectedPickupDate:this.props.selectedPickupDate,selectedPickupTime:this.props.selectedPickupTime});
        }
    }

    handleDateTimePicked = date => {
        
        let fDate = new Date(date);
        if (this.state.displayDateTimePicker===1) {
            this.setState({displayDateTimePicker:0,selectedPickupDate:fDate.toLocaleDateString()});
        } else {
            this.setState({displayDateTimePicker:0,selectedPickupTime:fDate.toLocaleTimeString()});
        }
    };

    render() {
        return(
            <View style={{flexDirection:'column', justifyContent:'space-between',}}>
                    <View>
                        <View style={styles.inputViewStyle}>
                            <TouchableWithoutFeedback onPress={this.props.onAddrsesClick}>
                            <View style={{padding:0, }}  >
                                <TextDisplay style={{backgroundColor:Colors.primaryTextInputColor,padding:10,paddingBottom:0,color:Colors.primaryPlaceholderTextColor}}>
                                    Your Address - Click to change
                                </TextDisplay>
                                <TextDisplay style={{fontSize:16,padding:10,paddingTop:5,color:Colors.primaryTextColor2,backgroundColor:Colors.primaryCardColor}}>
                                    {this.props.address}
                                </TextDisplay>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <TextDisplay style={{padding:10,paddingBottom:0,paddingTop:20,color:Colors.primaryTextColor3}}>
                            Select your Pickup Date & Time Preference
                        </TextDisplay>

                        <ButtonGroupNormal
                            onPress={index=>{this.setState({selectedPickupDateTimePrefernce:index})}}
                            selectedIndex={this.state.selectedPickupDateTimePrefernce}
                            buttons={['Specific Date/Time','As soon as possible']} />


                        {this.state.selectedPickupDateTimePrefernce===0 && (
                            <View>
                                    <View style={styles.inputViewStyle}>
                                        <TouchableWithoutFeedback onPress={()=>{this.setState({displayDateTimePicker:1});}}>
                                        <View style={{padding:0, }}  >
                                            <TextDisplay style={{backgroundColor:Colors.primaryTextInputColor,padding:10,paddingBottom:0,color:Colors.primaryPlaceholderTextColor}}>
                                                Pickup Date
                                            </TextDisplay>
                                            <TextDisplay style={{fontSize:16,padding:10,paddingTop:5,color:Colors.primaryTextColor2,backgroundColor:Colors.primaryCardColor}}>
                                                {this.state.selectedPickupDate}
                                            </TextDisplay>
                                        </View>
                                        </TouchableWithoutFeedback>
                                    </View>

                                    <View style={styles.inputViewStyle}>
                                        <TouchableWithoutFeedback onPress={()=>{this.setState({displayDateTimePicker:2});}}>
                                        <View style={{padding:0, }}  >
                                            <TextDisplay style={{backgroundColor:Colors.primaryTextInputColor,padding:10,paddingBottom:0,color:Colors.primaryPlaceholderTextColor}}>
                                                Pickup Time
                                            </TextDisplay>
                                            <TextDisplay style={{fontSize:16,padding:10,paddingTop:5,color:Colors.primaryTextColor2,backgroundColor:Colors.primaryCardColor}}>
                                                {this.state.selectedPickupTime}
                                            </TextDisplay>
                                        </View>
                                        </TouchableWithoutFeedback>
                                    </View>


                                <DateTimePicker
                                    isVisible={this.state.displayDateTimePicker===1 || this.state.displayDateTimePicker===2}
                                    onConfirm={this.handleDateTimePicked}
                                    onCancel={()=>{this.setState({displayDateTimePicker:0});}}
                                    mode={this.state.displayDateTimePicker===1?"date":"time"}
                                    />                    
                            </View>
                        )}

                    </View>           
                    <View style={{justifyContent:'flex-end', width:Layout.window.width/2,marginTop:20,alignSelf:'center'}}>
                        <ButtonNormal title="UPDATE" onPress={()=>this.props.handleUpdate(this.state.selectedPickupDateTimePrefernce,this.state.selectedPickupDate,this.state.selectedPickupTime)} />
                    </View>   
                </View>  
        );
    }
}

const styles = StyleSheet.create({
    inputViewStyle:{
        padding:0,borderBottomWidth:1,borderColor:Colors.primaryBorderColor, backgroundColor:Colors.primaryTextInputColor,borderTopWidth:1,marginTop:5
    }
});
