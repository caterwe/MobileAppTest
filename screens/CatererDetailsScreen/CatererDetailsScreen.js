import React from 'react';
import { View ,Image , StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ButtonNormal,TextDisplay, ImageNormal, ButtonGroupNormal} from '../../components/Basics';
import Layout from '../../common/Layout';
import Colors from '../../styles/Colors';
import {Header,ButtonGroup,Rating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Caterer from '../../models/Caterer';
import Config from '../../common/Config';
import SelectedAddress from '../../components/misc/SelectedAddress';

class CatererDetailsScreen extends React.Component {

    state= {
        selectedCaterer:null,
        selectedTab:0,
    }

    componentDidMount() {
        this.setState({selectedCaterer:this.props.navigation.getParam("selectedCaterer")});
    }

    updateSelectedTab = (selectedIndex) => {
        this.setState({selectedTab:selectedIndex});
    }

    render() {
        const selectedAddress = this.state.selectedCaterer;
        return (
            <View style={{flex:1, justifyContent:'flex-start',alignItems:'stretch'}}>
                    <Header
                        placement="left"
                        backgroundColor={Colors.primaryHeaderColor}
                        leftComponent={{ icon: 'chevron-left',iconSize:20, color: Colors.primaryHeaderForeColor, onPress:()=>{this.props.navigation.goBack()} }}
                        centerComponent={{text:"Caterer's Details", style:{alignSelf:'center',color:Colors.primaryHeaderForeColor,fontSize:18,fontFamily:'BasicFont'}}}
                        rightComponent={{icon:'shopping-cart',color:Colors.primaryHeaderForeColor}}
                    />

                    {selectedAddress!=null && (
                        <View style={{backgroundColor:Colors.primaryTextInputColor, borderBottomWidth:2,borderTopWidth:0,borderColor:Colors.primaryBorderColor}}> 
                            <Image source={{uri: selectedAddress.MainImage}} style={{backgroundColor:'silver', alignSelf:'center',width: Layout.window.width, height: 150, resizeMode:'cover'}} />
                            <TextDisplay style={{fontSize:20,padding:10,color:Colors.primaryTextColor2,fontWeight:'bold',paddingBottom:0}}>
                                {selectedAddress.Name}
                            </TextDisplay>
                            <Rating
                            showRating={false}
                            imageSize={15}
                            readonly={true}
                            // onFinishRating={this.ratingCompleted}
                            style={{ alignSelf:'flex-start', padding:10,paddingTop:5,paddingBottom:5}}
                            />
                            <TextDisplay h5 style={{color:Colors.primaryTextColor3,paddingLeft:10,paddingBottom:15}}>
                                <TextDisplay>{selectedAddress.Description}</TextDisplay>
                                <TextDisplay> : </TextDisplay>
                                <TextDisplay>1.5 mi away</TextDisplay>
                            </TextDisplay>                            
                            <ButtonGroupNormal
                                onPress={this.updateSelectedTab}
                                selectedIndex={this.state.selectedTab}
                                buttons={['Menu','Reviews','Info']} /> 
                        </View>                      
                    )}

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
  
export default connect(mapStateToProps,mapDispatchToProp)(CatererDetailsScreen);
  