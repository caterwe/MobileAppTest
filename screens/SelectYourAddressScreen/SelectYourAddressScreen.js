import React from 'react';
import { View , TextInput, Text,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {ButtonNormal} from '../../components/Basics';
import Colors from '../../styles/Colors';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Geocode from "react-geocode";
import {SET_SELECTED_ADDRESS,SET_SELECTED_SHORT_ADDRESS} from '../../redux/ActionTypes';
import AddressAutoComplete from '../../components/AddressAutoComplete';

class SelectYourAddressScreen extends React.Component {

state={
    location:null,
    locationAddress:null,
    locationProcessing:null
}
    componentDidUpdate() {

    }    



    getLocation=()=>{
        this.setState({locationProcessing:true});
        this.getLocationAsync();
    }
   getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('permission not granted');
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    debugger;
    //get location address from google
    // Get address from latidude & longitude.
    Geocode.setApiKey("AIzaSyDWb_4S_s0Ysn9mH_na2hDjsYcEExpYBNQ");
    Geocode.fromLatLng(location.coords.latitude, location.coords.longitude).then(
    response => {
        const address = response.results[0].formatted_address;
        const shortAddredss = response.results[0].address_components[0].long_name + " " + response.results[0].address_components[1].long_name;
        this.setState({locationAddress:address,locationProcessing:false});
        this.props.setSelectedAddress(address);
        this.props.setSelectedShortAddress(shortAddredss);
        //this.props.thisRef.setState({currentScreen:"SearchScreen"});
        this.props.navigation.navigate("Search");

    },
    error => {
        this.setState({locationProcessing:false});
    }
    );
  };


  locationResultClick = (el)=> {
      debugger;
      this.setState({locationAddress:el.description},()=>{
        this.props.setSelectedAddress(el.description);
        this.props.setSelectedShortAddress(el.structured_formatting.main_text);
        this.props.navigation.navigate("Search");
      });

  }

    render() {
        return (
        <View>
            <View>
                <Header
                    placement="left"
                    backgroundColor={Colors.primaryHeaderColor}
                    leftComponent={{ icon: 'close', color: Colors.primaryHeaderForeColor, onPress:()=>{this.props.navigation.goBack()}}}
                    centerComponent={{ text: 'Select Your Address', style: { color: Colors.primaryHeaderForeColor, fontSize:18, alignSelf:'center', fontFamily:'BasicFont'} }}
                    rightComponent={{ icon: 'close', color: Colors.primaryHeaderColor}}                    
                />
            </View>
            
            {/* <TextInput value={this.state.locationAddress} 
                placeholder="Type in your address" style={{padding:10,backgroundColor:'white', height:60,borderColor:'#DDDDDD',borderBottomWidth:1}}
                onChangeText={text=>{
                    this.setState({locationAddress:text});
                }}
                /> */}
                <AddressAutoComplete placeholder="Type in your address" value={this.state.locationAddress} handleLocationResultClick={this.locationResultClick} setStateValue={text=>{this.setState({locationAddress:text})}}/>

            <ButtonNormal title="Select Current Address" type="clear" buttonStyle={{alignSelf:'flex-start', }}
                icon={
                    <Icon
                    name="map-marker"
                    size={20}
                    style={{marginRight:5,}}
                    color={Colors.primaryButtonTitleColor2}
                    />}
                loading={this.state.locationProcessing}
                onPress={this.getLocation} 
                        
            /> 
        </View>        
        );
    }
}

  
  function mapStateToProps(state) {
    return {
        loggedInUser:state.loggedInUser,
        selectedAddress:state.selectedAddress,
        setSelectedShortAddress:state.setSelectedShortAddress,
    }
}

function mapDispatchToProp(dispatch) {
    return {
        setLoggedinUser: (user) => dispatch({type:SET_LOGGEDIN_USER,payload:user}),
        setSelectedAddress: (address) => dispatch({type:SET_SELECTED_ADDRESS,payload:address}),
        setSelectedShortAddress: (shortAddredss) => dispatch({type:SET_SELECTED_SHORT_ADDRESS,payload:shortAddredss}),   
   
    }
}
  
export default connect(mapStateToProps,mapDispatchToProp)(SelectYourAddressScreen);
  