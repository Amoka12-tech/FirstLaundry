import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../apis/auth';
import { END_PROCESS, SIGN_IN, START_PROCESS } from '../reducers/types';
//This function take you to home page
let headers = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

};

export const getUser = () => async dispatch => {
    try {
        dispatch({type: START_PROCESS});
        const saveData = await AsyncStorage.getItem("@user");
        const userData = saveData !== null ? JSON.parse(saveData) : null;
        if(!!userData){
            dispatch({type: SIGN_IN, payload: userData});
        }
        dispatch({type: END_PROCESS});
    } catch (error) {
        dispatch({type: END_PROCESS});
        console.log(error);
    }
}; 