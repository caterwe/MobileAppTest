import Model from './Model';
import Helper from '../common/Helper';

class User extends Model {
    constructor(username,password,email,info,localRememberMe=false,touchIdEnabled=false,usePinpadNum=false,pinPadNum=0,emailVerified=false) {
        super();
        this.Username=username;
        this.Password=Helper.hashText512(password?password:"");
        this.Email=email;
        this.Info=info;
        this.EmailVerified=emailVerified;

        //Local Additioanl Attributes
        this.LOCAL_RememberMe=localRememberMe;
        this.LOCAL_TouchIdEnabled=touchIdEnabled;
        this.LOCAL_UsePinpadNum=usePinpadNum;
        this.LOCAL_PinpadNum=pinPadNum;
    }

    getTableName() {
        return "User";
    }

    static login(username,password) {
        return new User().getAllBy([{name:"Username",value:username},{name:"Password",value:password}]);
    }

    static getByUsername(username) {
        return new User().getAllBy([{name:"Username",value:username}]);
    }

    static getByEmail(email) {
        return new User().getAllBy([{name:"Email",value:email}]);
    }

    updateUnique(username) {
        return this.update([{name:"Username",value:username}]);
    }

    sendEmailVerificationProcessForEmailUpdate(to,verificationCode) {
        return this.sendEmail(to,"Email Update Verification","<html><head><title>Email Verification</title></head><body><p>Dear "+this.Username+"</p><p>You are trying to update your email address, this is your verification code <b>"+verificationCode+"</b> . Please copy this number and paste it in the specified field in the APP.<p>Warm Regards<br \>Apps Data Center</p> </p></body></html>")
    }

    sendEmailWithForgottenUsername() {
        var html = "<html><head><title>Forgotten Email is here</title></head><body><p>Dear "+this.Username+"</p><p>We found your Username it's <b>"+this.Username+"</b></p><p>Warm Regards<br \>Apps Data Center</p></body></html>";
        return this.sendEmail(this.Email,"Forgotten Username is here",html);
    }

    sendEmailWithPasswordResetInstructions(verificationCode) {
        var html = "<html><head><title>Reset Password Instruction</title></head><body><p>Dear "+this.Username+"</p><p>You are trying to reset your password, please copy the following number <b>"+verificationCode+"</b> and paste it inside your App in the specified field, then you can enter new password.</p><p>Warm Regards<br \>Apps Data Center</p></body></html>";
        return this.sendEmail(this.Email,"Reset Password Instruction",html);
    }

    verifyEmailAddressForNewAccount() {
        var postUrl = this.getPostUrl() + "&type=vefna";

        return this.getLocalJAT().then(u=>{
            return Helper.postUrl(postUrl,{emailTo:this.Email,subject:this.Username,message:"",...u}).then(res=>{
                    try {
                        let s=res.data;
                        if (s.result==="ok") {
                            return {result:true,data:s.data};
                        } else {
                            return {result:false,msg:s.msg};
                        }
                    } catch (ex){
                        return {result:false,msg:'server error, please try again'};
                    }
            })
        }).catch(err=>{
            return {result:false,msg:err};
        });
    }

}

export default User;