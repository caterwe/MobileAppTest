import {FileSystem} from 'expo';
import Config from '../common/config';
import {AsyncStorage } from 'react-native';

export default {
    getUser : async ()=> {
        try { 
            const valueStr = await AsyncStorage.getItem('User');
            const valueObject = await JSON.parse(valueStr);
            
            if (valueObject !== null) { 
              return valueObject;
            }
        } catch (error) {
            // Error retrieving data
        }
        return null; 
    },
    setUser : async (user) => {
        try {
            await AsyncStorage.setItem('User', JSON.stringify(user));
        } catch (error) {
            return null;
        }
        return user;
    }
}
