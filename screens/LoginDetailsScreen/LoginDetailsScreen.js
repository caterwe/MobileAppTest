import React from 'react';
import {View,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {SET_LOGGEDIN_USER} from '../../redux/ActionTypes'
import {ButtonNormal,TextDisplay,TextInput} from '../../components/Basics';
import Layout from '../../common/Layout';

class LoginDetailsScreen extends React.Component {

    state = {
        username:'',
        password:'',
        logged:false,
        loggingIn:false,
        rememberMe:false,
        touchButton:false,
        evethingIsLoaded:false,
        group:"P",
        loggingAttemt:0,
        usePinpadNum:false,
        pinPadNum:0,
        showPassword:false,
    }




    render() {       
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center',flexDirection:'column', }}>
                <View style={{backgroundColor:'#f2eeed',padding:10, borderRadius:10, borderWidth:1, borderColor:'#d9d4d2',}}>
                    <TextDisplay h3>:: Login ::</TextDisplay>
                    <View style={{marginBottom:20,width:Layout.window.width-100}}>
                        <TextInput placeholder="Username" containerStyle={{marginBottom:10}} />
                        <TextInput placeholder = "Password" secureTextEntry={true} />
                    </View>
                    <ButtonNormal title="Fake Login" onPress={()=>{this.props.setLoggedinUser('John Smith')}} />
                </View>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column', 
        backgroundColor: '#363E72',
    },
    optionBoxLeft:{
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10
    },
    optionBoxRight: {
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        borderRightWidth:0,
    },
    optionBox:{
        flex:1,
        paddingTop:15, 
        paddingBottom:15,
        paddingLeft:5,
        paddingRight:5,
        borderRightColor:'#5C6283', 
        borderRightWidth:1,
        alignItems:'center'
    },
    optionBoxSelected: {
        backgroundColor:'white',
    },
    optionBoxText: {
        fontSize:12,
        color:'#BFC1D6',
    },
    optionBoxSelectedText: {
        color:'#353E72',
    }
})


function mapStateToProps(state) {
    return {
        loggedInUser:state.loggedInUser
    }
}

function mapDispatchToProp(dispatch) {
    return {
        setLoggedinUser: (user) => dispatch({type:SET_LOGGEDIN_USER,payload:user}),    }
}
  
export default connect(mapStateToProps,mapDispatchToProp)(LoginDetailsScreen);

