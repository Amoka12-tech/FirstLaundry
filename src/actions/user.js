import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../apis/auth';
import * as userApi from '../apis/user';
import { END_PROCESS, SIGN_IN, START_PROCESS, UPDATE_USER } from '../reducers/types';
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

export const updateUser = (body, toggle) => async dispatch => {
    const { userId, picture, name, base64 } = body;
    try {
        dispatch({type: START_PROCESS});
        if(picture !== ''){ //If user select picture let this function run
            let imageData = {
                "file": base64,
                "upload_preset": "sndsgfdf",
                "tags": [userId],
            }; //Incoming base64 image object
            const jsonImageData = JSON.stringify(imageData);
            const { data } = await userApi.uploadImage(jsonImageData, headers); //send image base64 to cloudinary rest api

            const newBody = {
                userId: userId,
                picture: data?.secure_url,
                name: name
            };// newBody with secure_url to upload image.
            await userApi.updateUser(newBody, headers); //Send to api
            const userData = await AsyncStorage.getItem("@user"); //get initial local storage
            const perserData = JSON.parse(userData); //convert initial local storage to json perser
            perserData.name = newBody?.name;
            perserData.picture = newBody?.picture; // append picture and name to initial local storage
            await AsyncStorage.setItem("@user", JSON.stringify(perserData)); //set update local storage
            dispatch({type: UPDATE_USER, payload: perserData});
            alert('You data is now updated');
            dispatch({type: END_PROCESS});
            toggle();
            
        }else{ //else this function run
            const newBody = {
                userId: userId,
                name: name
            }
            await userApi.updateUser(newBody, headers);
            const userData = await AsyncStorage.getItem("@user"); //get initial local storage
            const perserData = JSON.parse(userData); //convert initial local storage to json perser
            perserData.name = newBody?.name; // append name to initial local storage
            await AsyncStorage.setItem("@user", JSON.stringify(perserData)); //set update local storage
            dispatch({type: UPDATE_USER, payload: perserData});
            alert('You data is now updated');
            dispatch({type: END_PROCESS});
            toggle();
        }
    } catch (error) {
        console.log(error?.message);
        dispatch({type: END_PROCESS});
    }
};