import React from 'react';
import {TabMain,TabLogin} from '../navigation/MainNavigation';
import Helper from '../common/Helper';
import {connect} from 'react-redux';
import {SET_LOGGEDIN_USER} from '../redux/ActionTypes';
import Config from '../common/Config';
import {AppContainerMain,AppContainerLogin} from '../navigation/MainNavigation';


class AppLanding extends React.Component {
    state = {
        userName:'',
        password:'',
        logged:false,
    }

    register() {
        let data = {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify({
                username:'haroon'
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            }
            }

        Helper.timeout(fetch(config.dataSourceUrl+"users/create_user.php",data)).then((data)=>{
            alert(data);
        })  
    }



    componentDidMount() {
        //this.checkFingerprint();
    }




    render() {
            return (
                <AppContainerMain />
            )
    }
}




function mapStateToProps(state) {
    return {
        loggedInUser:state.loggedInUser
    }
}

function mapDispatchToProp(dispatch) {
    return {
        setLoggedinUser: (user) => dispatch({type:SET_LOGGEDIN_USER,payload:user}),    }
}
  
export default connect(mapStateToProps,mapDispatchToProp)(AppLanding);


