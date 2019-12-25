import React from 'react';
import { View ,Image } from 'react-native';
import {connect} from 'react-redux';
import {ButtonNormal,TextDisplay, ImageNormal} from '../../components/Basics';
import Layout from '../../common/Layout';
import Colors from '../../styles/Colors';
import SelectYourAddressScreen from '../SelectYourAddressScreen';
import SearchScreen from '../SearchScreen';
import * as Animatable  from 'react-native-animatable';


class MainScreen extends React.Component {

    state={
        currentScreen:null,
    }

    componentDidUpdate() {

    }    


    componentDidMount() {

    }

    startNewOrder = ()=>{
        //this.setState({currentScreen:"SelectYourAddressScreen"});
         this.props.navigation.navigate('SelectYourAddress')
    }

    getCurrentScreen() {
        if (this.state.currentScreen==="SelectYourAddressScreen")
        return (
            <SelectYourAddressScreen thisRef={this} />
        )
        if (this.state.currentScreen==="SearchScreen")
        return (
            <SearchScreen thisRef={this} />
        )
    }

    render() {
        if (this.state.currentScreen!==null) {
            return (
            <Animatable.View animation="zoomIn" useNativeDriver={true} duration={200}>
                <SelectYourAddressScreen thisRef={this} />
            </Animatable.View>
            );
        }
        return (
        <View style={{flex:1, flexDirection:'row',alignSelf:'center',marginTop:40}}>           
            <View style={{flex:1,justifyContent:'flex-start'}}>
                <Image source={require('../../assets/caterwemain.png')} style={{backgroundColor:'silver', alignSelf:'center',width: 177, height: 148, resizeMode:'contain'}} />
                <View style={{alignItems:'center',marginTop:20}}>
                    
                    <View style={{flexDirection:'row',margin:35}}> 
                        <TextDisplay style={{fontSize:24, textAlign:'center'}}>
                            <TextDisplay style={{color:Colors.primaryTextColor2,fontWeight:'bold'}}>Order </TextDisplay> 
                            <TextDisplay style={{fontWeight:'bold'}}>your traditional catering from chef’s around your area</TextDisplay>
                        </TextDisplay>
                        </View>
                    <ButtonNormal title="Start New Order" onPress={this.startNewOrder} style={{marginBottom:10,width:Layout.window.width/1.5}} />
                    <ButtonNormal title="Learn More" type="clear" />
                </View>
                <View style={{flex:1,marginBottom:15,justifyContent:'flex-end'}}>
                    <ButtonNormal title="Sign in or create an account" type="clear"/>
                </View>
            </View>
        </View>        
        );
    }
}

  
  function mapStateToProps(state) {
    return {
        loggedInUser:state.loggedInUser,
    }
}

function mapDispatchToProp(dispatch) {
    return {
        setLoggedinUser: (user) => dispatch({type:SET_LOGGEDIN_USER,payload:user}),  
    }
}
  
export default connect(mapStateToProps,mapDispatchToProp)(MainScreen);
  