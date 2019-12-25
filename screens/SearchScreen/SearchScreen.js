import React from 'react';
import { View ,Image , TextInput, Button} from 'react-native';
import {connect} from 'react-redux';
import {ButtonNormal,TextDisplay, ImageNormal} from '../../components/Basics';
import Layout from '../../common/Layout';
import Colors from '../../styles/Colors';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectYourAddressScreen from '../SelectYourAddressScreen';


class SearchScreen extends React.Component {

state={
}
    componentDidUpdate() {

    }    



    SelectedAddress=(address)=>{
        debugger;
        return (
            <ButtonNormal
                icon={
                    <Icon
                    name="arrow-down"
                    size={18}
                    color="white"
                    style={{marginLeft:5}}
                    />
                }
                iconRight
                title={address}
                containerStyle={{alignSelf:'center'}}
                titleStyle={{color:'white',fontSize:12}}
                onPress={()=>{this.props.navigation.goBack();}}
                />
        )
    }

    render() {
        return (
        <View>
            <View>
                <Header
                    placement="left"
                    backgroundColor={Colors.primaryHeaderColor}
                    leftComponent={{ icon: 'menu', color: '#fff',style:{ backgroundColor:'silver'}, onPress:()=>{this.props.thisRef.setState({currentScreen:null})}}}
                    centerComponent={this.SelectedAddress(this.props.selectedAddress)}
                />
            </View>
        </View>        
        );
    }
}

  
  function mapStateToProps(state) {
    return {
        loggedInUser:state.loggedInUser,
        selectedAddress:state.selectedAddress
    }
}

function mapDispatchToProp(dispatch) {
    return {
        setLoggedinUser: (user) => dispatch({type:SET_LOGGEDIN_USER,payload:user}),  
    }
}
  
export default connect(mapStateToProps,mapDispatchToProp)(SearchScreen);
  