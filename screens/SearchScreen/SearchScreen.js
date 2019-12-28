import React from 'react';
import { View ,Image , TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {ButtonNormal,TextDisplay, ImageNormal, TextInputRounded} from '../../components/Basics';
import Layout from '../../common/Layout';
import Colors from '../../styles/Colors';
import {Header,ButtonGroup,Rating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectYourAddressScreen from '../SelectYourAddressScreen';
import { FlatList } from 'react-native-gesture-handler';
import Caterer from '../../models/Caterer';
import { SearchBar } from 'react-native-elements';

class SearchScreen extends React.Component {

state={
    selectedSearchType:0,
    caterers:[],
    searchText:'',
    searching:false,
}

componentDidMount() {
    this.searchForCaterers();
}

searchForCaterers=()=>{
    this.setState({searching:true});
    Caterer.getByName(this.state.searchText).then(res=>{
        if (res.result) {
            this.setState({caterers:res.data});
            if (res.data.length===0) {
            }
        } else {
            throw(res.msg);
        }
        this.setState({searching:false});
    }).catch(err=>{
        var msg = err?err.message?err.message:err:"server error";
        this.setState({searching:false});
        alert(msg);                   
    });
}


updateSelectedSearchType = (selectedIndex)=> {
    this.setState({selectedSearchType:selectedIndex});
}


    SelectedAddressComponent=(address)=>{
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

    updateSearchText = text => {
        this.setState({searchText:text},()=>{
            this.searchForCaterers();
        });

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
                <SearchBar   
                    containerStyle={{backgroundColor:Colors.primaryBackGround,borderWidth:1,borderTopColor:Colors.primaryBorderColor,borderBottomColor:Colors.primaryBorderColor,borderColor:Colors.primaryBorderColor, borderRadius:5, padding:1,margin:5,marginBottom:0}}
                    inputStyle={{backgroundColor:Colors.primaryTextInputColor, fontFamily:'BasicFont'}}
                    inputContainerStyle={{backgroundColor:Colors.primaryTextInputColor}}
                    placeholderTextColor={Colors.primaryPlaceholderTextColor}
                    placeholder={this.state.selectedSearchType===0?"Search for your favourite caterers":"Search for your favourite dishes"}
                    onChangeText={this.updateSearchText}
                    value={this.state.searchText}
                    showCancel={true}
                    showLoading={this.state.searching}
                />

                    <ButtonGroup 
                    style={{padding:0,margin:0,backgroundColor:'yellow'}}
                    onPress={this.updateSelectedSearchType}
                    selectedIndex={this.state.selectedSearchType}
                    buttons={['Caterer','Dish']}
                    containerStyle={{margin:5,padding:0,marginLeft:5,marginRight:5}} 
                    selectedButtonStyle={{backgroundColor:Colors.primaryButtonColor}}
                    selectedTextStyle= {{color:Colors.primaryButtonFontColor,fontFamily:'BasicFont'}}
                    textStyle={{fontFamily:'BasicFont'}}
                    />  


                <FlatList
                    data={this.state.caterers}
                    keyExtractor={c => c.Id}
                    style={{marginBottom:350,margin:5, marginTop:0}}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={()=>{alert("Order from " + item.Name)}}>
                                <View style={{backgroundColor:Colors.primaryTextInputColor,marginBottom:15, borderBottomWidth:2,borderTopWidth:2,borderColor:Colors.primaryBorderColor}}> 
                                    <Image source={{uri: item.MainImage}} style={{backgroundColor:'silver', alignSelf:'center',width: Layout.window.width-10, height: 150, resizeMode:'cover'}} />
                                    <TextDisplay style={{fontSize:20,padding:10,color:Colors.primaryTextColor2,fontWeight:'bold',paddingBottom:0}}>
                                        {item.Name}
                                    </TextDisplay>
                                    <Rating
                                    showRating={false}
                                    imageSize={15}
                                    readonly={true}
                                    // onFinishRating={this.ratingCompleted}
                                    style={{ alignSelf:'flex-start', padding:10,paddingTop:5,paddingBottom:5}}
                                    />
                                    <TextDisplay h5 style={{color:Colors.primaryTextColor3,paddingLeft:10,paddingBottom:15}}>
                                        <TextDisplay>{item.Description}</TextDisplay>
                                        <TextDisplay> | </TextDisplay>
                                        <TextDisplay>1.5 mi away</TextDisplay>
                                    </TextDisplay>                            
                                </View>
                            </TouchableOpacity>
                        )} />
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
  