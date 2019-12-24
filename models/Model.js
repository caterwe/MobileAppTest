import {AsyncStorage} from 'react-native';
import Config from '../common/config';
import PersistenceHelper from '../common/LocalPersistenceHelper';
import Helper from '../common/Helper';

class Model {
    ToJSON (text) {
        try {
            return JSON.parse(text);
        } catch(ex) {
            throw {
                result:'error',
                msg:"server error, please try again .."
            }
        }
    }

    getPostUrl(){
		return Config.dataSourceUrl+"dbactions.php?t="+this.getTableName();
	}
	
	getTableName() {
        return "model";
	}
    
    getLocalJAT() {
        return PersistenceHelper.getUser().then(user=>{
            if (user!==null) {
                return {jat:{username:user.Username,password:user.Password}};
            }  else{
                return null;
            }
        });
    }

    getOnlineModelAttributes() {
        var attrs= Object.keys(this).filter(key=>!key.startsWith("LOCAL_")).reduce((obj,key)=>{
            if(this[key]){
                obj[key]=this[key];
            } else {
                obj[key]="";
            } 
            return obj;
        },{});        
        return attrs;
    }

    getLocalModelAttributes() {
        return Object.keys(this).filter(key=>key.startsWith("LOCAL_")).reduce((obj,key)=>{obj[key]=this[key]; return obj;},{});        
    }

    getModelAttributesWithoutUndefinedValues() {
        var attrs= Object.keys(this).reduce((obj,key)=>{
            if (typeof this[key]==='undefined') {
                obj[key]="";
            } else {
                obj[key]=this[key]; 
            }
            return obj;
        },{});        
        return attrs;
    }

	getAll() {
        var postUrl = this.getPostUrl() + "&type=ga";
        return this.getLocalJAT().then(u=>{
            return Helper.postUrl(postUrl,{...this.getOnlineModelAttributes(),...u}).then(res=>{
                let s1=this.ToJSON(res._bodyText);
                let s2={result:s1.result,
                    data:this.ToJSON(s1.data)};
                return s2;
            }).catch(err=>{
                return {result:false,msg:err};});
        });
    }
    
    getAllBy(params,orderBy={}) {
        var postUrl = this.getPostUrl() + "&type=gab";
        return this.getLocalJAT().then(u=>{
            return Helper.postUrl(postUrl,{params:params,...this.getOnlineModelAttributes(),...u,orderBy:orderBy}).then(res=>{
                try {
                    let s=this.ToJSON(res._bodyText);
                    if (s.result==="ok") {
                        //create instance and retun it to map it and be able to use model functions such as update.
                        var instances=[];
                        this.ToJSON(s.data).forEach(en => {
                            let instance = this.createInstanceByParameter(en);
                            instances.push(instance);
                        });
                        return {result:true,data:instances};
                    } else {
                        return {result:false,msg:s.msg};
                    }
                } catch (ex){
                    return {result:false,msg:'server error, please try again'};
                }
            }).catch(err=>{
                 return {result:false,msg:err};
            });
        });
    }

    sendEmail(to,subject,message) {
        var postUrl = this.getPostUrl() + "&type=se";
        return this.getLocalJAT().then(u=>{
            return Helper.postUrl(postUrl,{emailTo:to,subject:subject,message:message,...u}).then(res=>{
                    try {
                        let s=this.ToJSON(res._bodyText);
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
	
	insert() {
        var postUrl = this.getPostUrl() + "&type=i";
        return this.getLocalJAT().then(u=>{
            return Helper.postUrl(postUrl,{...this.getOnlineModelAttributes(),...u}).then(res=>{
                    try {
                        let s=this.ToJSON(res._bodyText);
                        if (s.result==="ok") {
                            return {result:true,data:this.ToJSON(s.data)};
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

    update(params) {
        var postUrl = this.getPostUrl() + "&type=u";
        return this.getLocalJAT().then(u=>{
            return Helper.postUrl(postUrl,{params:params,...this.getOnlineModelAttributes(),...u}).then(res=>{
                    try {
                        let s=this.ToJSON(res._bodyText);
                        if (s.result==="ok") {
                            return {result:true,data:this.ToJSON(s.data)};
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

    updateList(params,values) {
        var postUrl = this.getPostUrl() + "&type=u";
        return this.getLocalJAT().then(u=>{
            return Helper.postUrl(postUrl,{params:params,...values,...u}).then(res=>{
                    try {
                        let s=this.ToJSON(res._bodyText);
                        if (s.result==="ok") {
                            return {result:true,data:this.ToJSON(s.data)};
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

    delete(params) {
        var postUrl = this.getPostUrl()+"&type=d";
        return this.getLocalJAT().then(u=>{
            var header={params:params,...this.getOnlineModelAttributes(),...u};
            return Helper.postUrl(postUrl,header).then(res=>{
                    try {
                        let s=this.ToJSON(res._bodyText);
                        if (s.result==="ok") {
                            return {result:true,data:this.ToJSON(s.data)};
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

    createInstanceByParameter(en) {
        let instance = new this.constructor();
        for(var key in en) {
            if(key in instance) {
                instance[key]=en[key];
            }
        }        
        return instance;
    }

    async getLocalObject() {
        try {
            var name = this.getTableName();
            try { 
                const valueStr = await AsyncStorage.getItem(name);
                const en = await JSON.parse(valueStr);
                if (en) {
                    let instance = this.createInstanceByParameter(en);
                    if (instance !== null) { 7
                      return instance;
                    }
                } else {
                    throw null;
                }
            } catch (error) {
                return null; 
            }
        } catch (ex) {
            return null;
        }
    }

    async setLocalObject(){
        try {
            var name = this.getTableName();
            await AsyncStorage.setItem(name, JSON.stringify(this.getModelAttributesWithoutUndefinedValues()));
        } catch (error) {
            return null;
        }
        return this;
    }

    async removeLocalObject() {
        try {
            var name = this.getTableName();
            await AsyncStorage.removeItem(name);
        } catch (error) {
            return null;
        }
        return this;
    }

    clone() {
        var constParams=[];
        for(var key in en) {
            var value = en[key];
            constParams.push(value);
        }
        let instance = new this.constructor(...constParams);
        return instance;
    }
}



export default Model;