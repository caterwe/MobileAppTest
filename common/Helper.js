import Config from '../common/Config';
import {LocalAuthentication} from 'expo'
import {Platform} from 'react-native';
import CryptoJS from "react-native-crypto-js";
import sha512 from 'js-sha512';


export default {
    getCurrentDate: ()=>{
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; 
        let yyyy = today.getFullYear();
        let hh = today.getHours();
        let mi = today.getMinutes();

        if(dd<10) 
        {
            dd='0'+dd;
        } 
        
        if(mm<10) 
        {
            mm='0'+mm;
        } 
        today = mm+'/'+dd+'/'+yyyy+'-'+hh+':'+mi;
        return today;
    },
    encryptText: (text,key=Config.encryptionKey)=>{
        let ciphertext = CryptoJS.AES.encrypt(text, key).toString();
        return ciphertext;
    },
    decryptText: (ciphertext,key=Config.encryptionKey)=> {
        // Decrypt
        let bytes  = CryptoJS.AES.decrypt(ciphertext, key);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    },
    hashText512: (text) => {
        var x=sha512(text);
        return x;
    },
    timeout: (promise)=> {
        return new Promise((resolve,reject)=> {
          setTimeout(()=> {
            reject("Server is not responding.. Please try again");
          }, Config.urlFetchWaitingTime)
          promise.then(resolve, reject)
        })
      },
    validation: {
        email: (text) => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if(reg.test(text) === false) {
                return false;
            }
            else {
                return true;
            }
        }
    },
    isTouchSupported: ()=>{
        var p = new Promise((resolve,reject)=>{
             LocalAuthentication.hasHardwareAsync().then(hardware=>{
                 if(hardware) {
                     LocalAuthentication.isEnrolledAsync().then(enrolled=>{
                         if(enrolled) {
                             resolve(true);
                         }
                     })
                 } 
             });
        });
        return p;
     },

     getFont: ()=>{
         if (Platform.OS==='ios') {
             return ""
         } else {
             return ""
         }
     }
}