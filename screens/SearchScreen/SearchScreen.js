import React from 'react';
import { View ,Image , TouchableOpacity, RefreshControl, ActivityIndicator ,ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ButtonGroupNormal,TextDisplay, ImageNormal, TextInputRounded, TextInput, FloatingLabelInput} from '../../components/Basics';
import Layout from '../../common/Layout';
import Colors from '../../styles/Colors';
import {Header,ButtonGroup,Rating,SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Caterer from '../../models/Caterer';
import Config from '../../common/Config';
import SelectedAddress from '../../components/misc/SelectedAddress';
import * as Animatable  from 'react-native-animatable';
import DateTimePicker from "react-native-modal-datetime-picker";
import SelectedAddressChange from '../../components/misc/SelectedAddressChange';
import { SET_TMP_SELECTED_ADDRESS,SET_SELECTED_ADDRESS,SET_SELECTED_SHORT_ADDRESS, SET_TMP_SELECTED_SHORT_ADDRESS,SET_PICKUP_DATE,SET_PICKUP_TIME,SET_PICKUP_PREFERENCE } from '../../redux/ActionTypes';

class SearchScreen extends React.Component {

state={
    selectedSearchType:0,
    caterers:[],
    searchText:'',
    searching:false,
    resultStartIndex:0,
    onEndReachedCalledDuringMomentum: false,
    selectAddressAndPickupDateTime:false,
    selectedPickupDateTimePrefernce:0,
    selectedPickupDate:null,
    selectedPickupTime:null,
}

componentDidMount() {
    this.searchForCaterers();
}

searchForCaterers= () => {
    debugger; 
    if(!this.state.onEndReachedCalledDuringMomentum){
        this.setState({searching:true});
        
        Caterer.getByName(this.state.searchText,this.state.resultStartIndex).then(res=>{
            if (res.result) {
                var newResult = this.state.caterers.concat(res.data);
                this.setState({caterers:newResult});
                if (res.data.length===0) {
                }
            } else {
                throw(res.msg);
            }
            let curIndex = this.state.resultStartIndex+Config.basicFlatListResultSize;
            this.setState({searching:false,resultStartIndex:curIndex,onEndReachedCalledDuringMomentum:true});
        }).catch(err=>{
            var msg = err?err.message?err.message:err:"server error";
            this.setState({searching:false,onEndReachedCalledDuringMomentum:true});
            alert(msg);                   
        });
    }


}


updateSelectedSearchType = (selectedIndex)=> {
    this.setState({selectedSearchType:selectedIndex});
}


 

    updateSearchText = text => {
        this.setState({caterers:[],resultStartIndex:0,searchText:text,onEndReachedCalledDuringMomentum:false},()=>{
            this.searchForCaterers();
        });

    }

    clickSearchResult(item) {
        this.props.navigation.navigate("CatererDetails",{selectedCaterer:item})
    }

    handleChangeAddressPickupDateTime = (selectedPickupDateTimePrefernce, selectedPickupDate, selectedPickupTime) => {
        if (this.props.tmpSelectedAddress) {
            this.props.setSelectedAddress(this.props.tmpSelectedAddress);
            this.props.setSelectedShortAddress(this.props.tmpSelectedShortAddress);
        }
        this.props.setPickupDate(selectedPickupDate);
        this.props.setPickupTime(selectedPickupTime);console.log(selectedPickupDateTimePrefernce);
        this.props.setPickupPreference(selectedPickupDateTimePrefernce);
        this.setState({selectAddressAndPickupDateTime:false});
    }

    render() {
        return (
            <View style={{flex:1, justifyContent:'flex-start',alignItems:'stretch'}}>
                <View style={{}}>
                    <Header
                        placement="left"
                        backgroundColor={Colors.primaryHeaderColor}
                        leftComponent={{ icon: 'close', color: Colors.primaryHeaderIconColor,onPress:()=>{this.props.navigation.navigate("Main")}}}
                        centerComponent={
                            <SelectedAddress address={this.props.selectedShortAddress} 
                                             onPress={()=>{this.setState({selectAddressAndPickupDateTime:!this.state.selectAddressAndPickupDateTime});this.props.setTmpSelectedAddress(null);}} 
                                             arrowDown={!this.state.selectAddressAndPickupDateTime}
                                             selectedPickupPreference={this.props.selectedPickupPreference}
                                             selectedPickupDate= {this.props.selectedPickupDate} />}
                        rightComponent={{icon:'shopping-cart',color:Colors.primaryHeaderIconColor}}
                    />
                </View>
                {this.state.selectAddressAndPickupDateTime && (
                    <Animatable.View animation="slideInUp" duration={250}>
                        <SelectedAddressChange 
                            selectedPickupPreference={this.props.selectedPickupPreference}
                            selectedPickupDate= {this.props.selectedPickupDate} 
                            selectedPickupTime={this.props.selectedPickupTime}
                            handleUpdate={this.handleChangeAddressPickupDateTime}
                            address={this.props.tmpSelectedAddress?this.props.tmpSelectedAddress:this.props.selectedAddress}
                            onAddrsesClick={()=>{this.props.navigation.push("SelectYourAddress",{'route':'changeAddressPickupDateTime','address':this.props.tmpSelectedAddress?this.props.tmpSelectedAddress:this.props.selectedAddress})}}
                        /> 
                    </Animatable.View>
                )}

                    <View style={{display:(this.state.selectAddressAndPickupDateTime?'none':'flex')}}>
                        <View style={{}}>                
                            <SearchBar   
                                containerStyle={{backgroundColor:Colors.primaryBackGround,borderWidth:1,borderTopColor:Colors.primaryBorderColor,borderBottomColor:Colors.primaryBorderColor,borderColor:Colors.primaryBorderColor, borderRadius:5, padding:0,margin:5,marginBottom:0,}}
                                inputStyle={{backgroundColor:Colors.primaryTextInputColor, fontFamily:'BasicFont',fontSize:14}}
                                inputContainerStyle={{backgroundColor:Colors.primaryTextInputColor,paddingBottom:0,margin:0}}
                                placeholderTextColor={Colors.primaryPlaceholderTextColor}
                                placeholder={this.state.selectedSearchType===0?"Search for your favourite caterers":"Search for your favourite dishes"}
                                onChangeText={this.updateSearchText}
                                value={this.state.searchText}
                                showCancel={true}
                                showLoading={this.state.searching}
                            />
                        </View>
                        <View style={{borderBottomColor:Colors.primaryBorderColor,borderBottomWidth:1,marginBottom:5}}> 
                            <ButtonGroupNormal
                                onPress={this.updateSelectedSearchType}
                                selectedIndex={this.state.selectedSearchType}
                                buttons={['Caterer','Dish']}
                            />  
                        </View>
                        <View style={{}}>
                            <FlatList
                                data={this.state.caterers}
                                onEndReached={()=>{this.searchForCaterers()}}                    
                                onEndReachedThreshold={0.5}             
                                onMomentumScrollBegin={() => { this.setState({onEndReachedCalledDuringMomentum :false}); }}                    
                                keyExtractor={c => c.Id+''}
                                style={{marginBottom:150,margin:5, marginTop:0}} 
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={()=>{this.clickSearchResult(item)}} delayPressIn={100} key={item.Id}>
                                        <View style={styles.cardView}> 
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
                                )}
                                ListFooterComponent={
                                    <View style={{height:50}}>
                                        <ActivityIndicator size='small' color={this.state.searching?Colors.primaryActivityIndicatorColor:Colors.primaryBackGround} />                         
                                    </View>}
                                />
                            </View>                        
                    </View>

            </View>     
        );
    }
}

const styles = StyleSheet.create({
    cardView: {
        backgroundColor:Colors.primaryTextInputColor,
        marginBottom:15, 
        borderBottomWidth:0,
        borderWidth:0,
        borderColor:Colors.primaryBorderColor,

        shadowColor: Colors.primaryShadowColor,
        shadowOffset: { 
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 2,
    }
})


  function mapStateToProps(state) {
    return {
        loggedInUser:state.loggedInUser,
        selectedAddress:state.selectedAddress,
        selectedShortAddress:state.selectedShortAddress,
        tmpSelectedAddress:state.tmpSelectedAddress,
        tmpSelectedShortAddress:state.tmpSelectedShortAddress,
        selectedPickupTime:state.selectedPickupTime,
        selectedPickupDate:state.selectedPickupDate,
        selectedPickupPreference:state.selectedPickupPreference,
    }
}

function mapDispatchToProp(dispatch) {
    return {
        setLoggedinUser: (user) => dispatch({type:SET_LOGGEDIN_USER,payload:user}),  
        setSelectedAddress: (address) => dispatch({type:SET_SELECTED_ADDRESS,payload:address}),
        setSelectedShortAddress: (shortAddredss) => dispatch({type:SET_SELECTED_SHORT_ADDRESS,payload:shortAddredss}),
        setTmpSelectedAddress: (address) => dispatch({type:SET_TMP_SELECTED_ADDRESS,payload:address}),
        setTmpSelectedShortAddress: (shortAddredss) => dispatch({type:SET_TMP_SELECTED_SHORT_ADDRESS,payload:shortAddredss}),
        setPickupDate: (date) => dispatch({type:SET_PICKUP_DATE,payload:date}),
        setPickupTime: (time) => dispatch({type:SET_PICKUP_TIME,payload:time}),
        setPickupPreference: (pref) => dispatch({type:SET_PICKUP_PREFERENCE,payload:pref}),
    }
}
  
export default connect(mapStateToProps,mapDispatchToProp)(SearchScreen);
  