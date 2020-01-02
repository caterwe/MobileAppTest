import React from 'react';
import {View,Keyboard,StyleSheet,BackHandler,ActivityIndicator} from 'react-native';
import Layout from '../common/Layout';
import * as Font from 'expo-font';
import Helper from '../common/Helper';
import Colors from '../styles/Colors';
import { TextDisplay } from '../components/Basics'; 
import * as Animatable  from 'react-native-animatable';


class RootScreen extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted=true;
    }

        state = {
        errorVisible:false,
        errorType:'INFO',
        errorText:'',
        errorCallBack:()=>{},
        errorSecondButtonCallBack:()=>{},
        errorThirdButtonCallBack:()=>{},
        errorFirstButtonTitle:null,
        errorSecondButtonTitle:null,
        errorThirdButtonTitle:null,
        loadingMainData:false,
        buttonPressed:false,
        _isMounted:false,
        displayToast:false,
        toastText:"", 
        toastIcon:null,
        taostIconColor:null,
        fontLoaded:false, 
        validationErrors:new Map(),
        promptVisible:false,
        promptFirstButtonCallBack:null,
        promptFirstButtonTitle:null,
        promptSecondButtonCallBack:null,
        promptSecondButtonTitle:null,
        promptThirdButtonCallBack:null,
        promptThirdButtonTitle:null,
        promptTitle:"",
        promptText:"",
        promptSecureTextEntry:false,
        promptTextEntryLeftIcon:null,
        promptTextEntryRightIcon:null,
        promptPlaceHolderText:null,
        promptFirstButtonCallBackValidation:true,
        promptSecondButtonCallBackValidation:false,
        promptThirdButtonCallBackValidation:false,
        promptMaskNum:0,
        promptViewPassword:false,
        promptKeyboardType:'default',
        overlayVisible:false,
        overlayComponent:null,
    }

    addValidationError(errKey,errText) {
        const validationErrors=this.state.validationErrors.set(errKey,errText);
        this.setState({validationErrors:validationErrors})
    }

    removeValidationErrors(errKey) {
        const validationErrors=this.state.validationErrors;
        validationErrors.delete(errKey);
        this.setState({validationErrors:validationErrors});
    }

    componentDidMount() {
         Font.loadAsync({
            'BasicFont':  require('../assets/fonts/Lato-Regular.ttf')
          }).then(()=>{
              this.setState({
                fontLoaded:{$set:true}
              })
          });
    }
    


    runPromise(promise) {
        promise().catch(ex=>{
            this.showError(ex);
        })
    }

    isLoadingMainData() {
        return this.state.loadingMainData;
    }

    componentDidCatch(err, errInfo) {
        this.showError(err+'\n'+errInfo);
      }

    showError(errText,callBackFunction=null,errorSecondButtonCallBack=null,errorThirdButtonCallBack=null,errorFirstButtonTitle=null,errorSecondButtonTitle=null,errorThirdButtonTitle=null) {
        this.setState({
             errorVisible:true,
             errorText:errText?errText.message?errText.message:errText:"error occured!",
             errorCallBack:callBackFunction?callBackFunction:()=>{},
             errorSecondButtonCallBack:errorSecondButtonCallBack?errorSecondButtonCallBack:()=>{},
             errorThirdButtonCallBack:errorThirdButtonCallBack?errorThirdButtonCallBack:()=>{},
             errorFirstButtonTitle:errorFirstButtonTitle?errorFirstButtonTitle:"Ok",
             errorSecondButtonTitle:errorSecondButtonTitle?errorSecondButtonTitle:null,
             errorThirdButtonTitle:errorThirdButtonTitle?errorThirdButtonTitle:null,
             errorType:"ERROR",
             isLoadingMainData:false
            }
        );
    }


    showAlert(errText,callBackFunction=null,errorSecondButtonCallBack=null,errorThirdButtonCallBack=null,errorFirstButtonTitle=null,errorSecondButtonTitle=null,errorThirdButtonTitle=null) {
        this.setState({
            errorVisible:true,
            errorText:errText?errText.message?errText.message:errText:"INFO!",
            errorCallBack:callBackFunction?callBackFunction:()=>{},
            errorSecondButtonCallBack:errorSecondButtonCallBack?errorSecondButtonCallBack:()=>{},
            errorThirdButtonCallBack:errorThirdButtonCallBack?errorThirdButtonCallBack:()=>{},
            errorFirstButtonTitle:errorFirstButtonTitle?errorFirstButtonTitle:"Ok",
            errorSecondButtonTitle:errorSecondButtonTitle?errorSecondButtonTitle:null,
            errorThirdButtonTitle:errorThirdButtonTitle?errorThirdButtonTitle:null,
            errorType:"INFO",
            isLoadingMainData:false
            }
        );
    }

    showMainLoading(show) {
        this.setState({
            loadingMainData:show
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        //this.backHandlerRoot.remove();
    }

    oneTimeClick(code) {        
        if (!this.state.buttonPressed) {  
            this.setState({
                buttonPressed:true
            },()=>{code();});
            setTimeout(()=>{
                if (this._isMounted) {
                    this.setState({
                        buttonPressed:false
                    });
                }
            },1000);
        } else {
            //alert('button is presed');
        }
    } 

    showToastGood(text) {
        this.showToast(text,"checkmark-circle","#00B200");
    }

    showToastBad(text) {
        this.showToast(text,"remove-circle","#B20000");
    }

    showToast(text,icon=null,iconcolor=null) {
        if(this.state.displayToast) {
            this.setState({
                displayToast:false
            }).then(()=>{
                this.setState({
                    displayToast:true,
                    toastText:text,
                    toastIcon:icon,
                    taostIconColor:iconcolor
                })
            })
        } else {
            this.setState({
                displayToast:true,
                toastText:text,
                toastIcon:icon,
                taostIconColor:iconcolor
            })
        };
    }

    navigate(toScreen,params) {
        this.props.navigation.navigate(toScreen,params);
    }

    showPromptPassword(title,text,firstButtonCallBack=null,firstButtonTitle=null,secondButtonCallBack=null,
        secondButtonTitle=null,thirdButtonCallBack=null,thirdButtonTitle=null,secureTextEntry=false,textEntryLeftIcon=null,
        textEntryRightIcon=null,placeHolderText=null,firstButtonCallBackValidation=true,secondButtonCallBackValidation=false,thirdButtonCallBackValidation=false,maskNum=0,viewPassword=false) {
        this.showPrompt(title,text,firstButtonCallBack,firstButtonTitle,secondButtonCallBack,secondButtonTitle,thirdButtonCallBack,thirdButtonTitle,true,textEntryLeftIcon,textEntryRightIcon,placeHolderText,firstButtonCallBackValidation,secondButtonCallBackValidation,thirdButtonCallBackValidation,maskNum,viewPassword);
    }

    showPromptEmail(title,text,firstButtonCallBack=null,firstButtonTitle=null,secondButtonCallBack=null,
        secondButtonTitle=null,thirdButtonCallBack=null,thirdButtonTitle=null,secureTextEntry=false,textEntryLeftIcon=null,
        textEntryRightIcon=null,placeHolderText=null,firstButtonCallBackValidation=true,secondButtonCallBackValidation=false,thirdButtonCallBackValidation=false,maskNum=0,viewPassword=false) {
        this.showPrompt(title,text,firstButtonCallBack,firstButtonTitle,secondButtonCallBack,secondButtonTitle,thirdButtonCallBack,thirdButtonTitle,false,textEntryLeftIcon,textEntryRightIcon,placeHolderText,firstButtonCallBackValidation,secondButtonCallBackValidation,thirdButtonCallBackValidation,maskNum,viewPassword,"email-address");
    }

    showPromptNumpad(title,text,firstButtonCallBack=null,firstButtonTitle=null,secondButtonCallBack=null,
        secondButtonTitle=null,thirdButtonCallBack=null,thirdButtonTitle=null,secureTextEntry=false,textEntryLeftIcon=null,
        textEntryRightIcon=null,placeHolderText=null,firstButtonCallBackValidation=true,secondButtonCallBackValidation=false,thirdButtonCallBackValidation=false,maskNum=0,viewPassword=false) {
        this.showPrompt(title,text,firstButtonCallBack,firstButtonTitle,secondButtonCallBack,secondButtonTitle,thirdButtonCallBack,thirdButtonTitle,false,textEntryLeftIcon,textEntryRightIcon,placeHolderText,firstButtonCallBackValidation,secondButtonCallBackValidation,thirdButtonCallBackValidation,maskNum,viewPassword,"number-pad");
    }

    showPrompt(title,text,firstButtonCallBack=null,firstButtonTitle=null,secondButtonCallBack=null,
        secondButtonTitle=null,thirdButtonCallBack=null,thirdButtonTitle=null,secureTextEntry=false,textEntryLeftIcon=null,
        textEntryRightIcon=null,placeHolderText=null,firstButtonCallBackValidation=true,secondButtonCallBackValidation=false,thirdButtonCallBackValidation=false,maskNum=0,viewPassword=false,keyboardType='default') {
        this.setState({
            promptVisible:true,
            promptFirstButtonCallBack:firstButtonCallBack,
            promptFirstButtonTitle:firstButtonTitle,
            promptSecondButtonCallBack:secondButtonCallBack,
            promptSecondButtonTitle:secondButtonTitle,
            promptSecondButtonTitle:thirdButtonCallBack,
            promptThirdButtonTitle:thirdButtonTitle,
            promptTitle:title,
            promptText:text,
            promptSecureTextEntry:secureTextEntry,
            promptTextEntryLeftIcon:textEntryLeftIcon,
            promptTextEntryRightIcon:textEntryRightIcon,
            promptPlaceHolderText:placeHolderText,
            promptFirstButtonCallBackValidation:firstButtonCallBackValidation,
            promptSecondButtonCallBackValidation:secondButtonCallBackValidation,
            promptThirdButtonCallBackValidation:thirdButtonCallBackValidation,
            keyboardAvoidingViewEnabled:true,
            promptMaskNum:maskNum,
            promptViewPassword:viewPassword,
            promptKeyboardType:keyboardType,
        })
    }

    showOverlay(isVisible,component) {
        this.setState({overlayVisible:isVisible,overlayComponent:component});
    }

    render() {
            const children = React.Children.map(this.props.children, child => {
                return React.cloneElement(child, {
                  showError:this.showError.bind(this),
                  showAlert:this.showAlert.bind(this),
                  isLoadingMainData:this.isLoadingMainData.bind(this),
                  showMainLoading:this.showMainLoading.bind(this),
                  oneTimeClick:this.oneTimeClick.bind(this),
                  showToastGood:this.showToastGood.bind(this),
                  showToastBad:this.showToastBad.bind(this),
                  showToast:this.showToast.bind(this),
                  navigate:this.navigate.bind(this),
                  addValidationError:this.addValidationError.bind(this),
                  removeValidationErrors:this.removeValidationErrors.bind(this),
                  validationErrors:this.state.validationErrors,
                  showPrompt:this.showPrompt.bind(this),
                  promptVisible:this.state.promptVisible,
                  showPromptPassword:this.showPromptPassword.bind(this),
                  showPromptEmail:this.showPromptEmail.bind(this),
                  showPromptNumpad:this.showPromptNumpad.bind(this),
                  showOverlay:this.showOverlay.bind(this),
                });
              });
              
            return (
                    <View style={{...styles.container}}>
                    {this.state.fontLoaded && (
                        children
                    )}

                    {this.state.fontLoaded && (this.state.errorVisible || this.state.promptVisible) && (
                        <View /* onTouchStart={()=>{Helper.updateLocalStatePromise(this,{[this.state.errorVisible?"errorVisible":"promptVisible"]:{$set:false}})}} */ style={{position:'absolute',width:Layout.window.width,height:Layout.window.height, backgroundColor:Colors.primaryTextInputBorderBottomColor,opacity:0.7}}>

                        </View>
                    )}
                    {this.state.fontLoaded && this.state.errorVisible && (
                                <Text>Error visible</Text>
                    )}

                    {((this.state.loadingMainData && !this.state.errorVisible) || !this.state.fontLoaded) && (
                        <View style={{position:'absolute',width:Layout.window.width,height:Layout.window.height}}>
                            <View style={{flex:1, justifyContent:'center',backgroundColor:Colors.primaryBackGround,opacity:0.7}}>
                                <ActivityIndicator size="large" color={Colors.primaryActivityIndicatorColor} />
                            </View>                        
                        </View>
                    )}

                    {this.state.fontLoaded && this.state.displayToast && (
                        <Text>Displaying Toast</Text>
                    )}

                    {this.state.fontLoaded && this.state.promptVisible && (
                        <Text>Prompt visible</Text>
                    )}

                    {this.state.fontLoaded && this.state.overlayVisible && (
                            <View style={{position:'absolute',width:Layout.window.width,height:Layout.window.height,alignItems:'center',justifyContent:'center',flexDirection:'column',}}>
                                <View style={{position:'absolute',width:Layout.window.width,height:Layout.window.height,alignItems:'center',justifyContent:'center',flexDirection:'column', backgroundColor:Colors.primaryTextColor2,opacity:0.7}}>
                                </View>
                                <Animatable.View duration={500} animation="bounceInUp" style={{position:'absolute',width:Layout.window.width,height:Layout.window.height,alignItems:'center',justifyContent:'center',flexDirection:'column',}} useNativeDriver={true}>
                                    <View style={{backgroundColor:Colors.primaryBackGround,width:Layout.window.width-50,height:Layout.window.height-50,borderWidth:1,borderRadius:10, borderColor:Colors.primaryBorderColor,
                                                shadowColor: Colors.primaryShadowColor,
                                                shadowOffset: { 
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,

                                                elevation: 5,
                                                
                                                }}>                                              
                                        {this.state.overlayComponent}
                                    </View>                        
                                </Animatable.View>
                            </View>        
                    )}                    
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'#F8F8F8'
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



export default RootScreen;

