import React from 'react';
import { View ,Image , Button} from 'react-native';
import {connect} from 'react-redux';
import {ButtonNormal,TextDisplay, ImageNormal, TextInputRounded} from '../../components/Basics';
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



    SelectedAddressComponent=(address)=>{
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
                    centerComponent={this.SelectedAddressComponent(this.props.selectedShortAddress)}
                    rightComponent={{icon:'shopping-cart',color:'#fff'}}
                />

                <TextInputRounded placeholder="Cterer, dish ..etc" containerStyle={{marginTop:10,}}
                    rightIcon={
                        <Icon
                            name="search"
                            size={20}
                            style={{marginRight:5,}}
                            color={Colors.primaryTextColor3}
                            onPress={()=>{this.props.setStateValue(null)}}
                            />
                    }
                />
            </View>
        </View>        
        );
    }
}

  
  function mapStateToProps(state) {
    return {
        loggedInUser:state.loggedInUser,
        selectedAddress:state.selectedAddress,
        selectedShortAddress:state.selectedShortAddress,
    }
}

function mapDispatchToProp(dispatch) {
    return {
        setLoggedinUser: (user) => dispatch({type:SET_LOGGEDIN_USER,payload:user}),  
    }
}
  
export default connect(mapStateToProps,mapDispatchToProp)(SearchScreen);
  