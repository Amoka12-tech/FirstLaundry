import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as api from '../apis/auth';
import { END_PROCESS, SIGN_IN, SIGN_OUT, SIGN_UP, START_PROCESS } from '../reducers/types';
import { Platform } from 'react-native';
import { updateUserToken } from './user';

//This function take you to home page
let headers = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

}
export const login = (body, navigation, setIsloading) => async dispatch => {
    const bodyData = JSON.stringify(body);
    try {
        setIsloading(true);
        dispatch({type: START_PROCESS});
        // await api.login(bodyData, headers);
        const { data } = await api.login(bodyData, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            await AsyncStorage.setItem('@user', JSON.stringify(message));
            dispatch({type: SIGN_IN, payload: message});
            dispatch({type: END_PROCESS});
            setIsloading(false);
        }else if(success === 2){
            dispatch({type: SIGN_UP, payload: message});
            dispatch({type: END_PROCESS});
            setIsloading(false);
            navigation.navigate('Verify', {
                userId: message?.id,
                page: 'Login',
            });
        }else{
            throw(message);
        }
    } catch (error) {
        alert(error);
        dispatch({type: END_PROCESS});
        setIsloading(false);
    }
};

//This function on success navigate to otp page
export const register = (body, navigation, setIsloading) => async dispatch => {
    const bodyData = JSON.stringify(body);
    try {
        setIsloading(true);
        dispatch({type: START_PROCESS});
        // await api.login(bodyData, headers);
        const { data } = await api.register(bodyData, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            dispatch({type: SIGN_UP, payload: message});
            setIsloading(false)
            dispatch({type: END_PROCESS});
            alert('Registration completed');
            navigation.navigate('Verify', {
                userId: message.id,
                page: 'Register'
            });
        }else{
            throw(message);
        }
    } catch (error) {
        alert(error);
        setIsloading(false);
        dispatch({type: END_PROCESS});
    }
};

//send code and id return user data if coming page is recover go newPass
export const verify = (body, page, navigation, setIsVerifying) => async dispatch => {
    const bodyData = JSON.stringify(body);
    try {
        setIsVerifying(true);
        dispatch({type: START_PROCESS});
        const { data } = await api.verify(bodyData, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            if(page === "NewPass"){
                setIsVerifying(false);
                dispatch({type: END_PROCESS});
                navigation.navigate('NewPassword', {
                    id: message.id
                });
            }else{
                await AsyncStorage.setItem('@user', JSON.stringify(message));
                dispatch({type: SIGN_IN, payload: message});
                dispatch({type: END_PROCESS});
                setIsVerifying(false);
            }
        }else{
            throw(message);
        }
    } catch (error) {
        alert(error);
        setIsVerifying(false);
        dispatch({type: END_PROCESS});
    }
};

//Send phone and Id to return 'success' 'status' 'message' show alert
export const resendOtp = (body, setIsResending) => async dispatch => {
    const bodyData = JSON.stringify(body);
    try {
        setIsResending(true);
        dispatch({type: START_PROCESS});
        const { data } = await api.resendOtp(bodyData, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            dispatch({type: END_PROCESS});
            setIsResending(false);
            alert(message);
        }else{
            throw(message);
        };
    } catch (error) {
        setIsResending(false);
        dispatch({type: END_PROCESS});
        alert(error);
    }
};

//Search if phone numebr exist 'success' 'status' 'message': userData navigate to Otp
export const recover = (body, navigation, setIsloading) => async dispatch => {
    const bodyData = JSON.stringify(body);
    try {
        setIsloading(true);
        dispatch({type: START_PROCESS});
        const { data } = await api.recover(bodyData, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            dispatch({type: SIGN_UP, payload: message});
            setIsloading(false);
            dispatch({type: END_PROCESS});
            navigation.navigate('Verify', {
                userId: message.id,
                page: 'NewPass'
            });
        }else{
            throw(message);
        }
    } catch (error) {
        setIsloading(false);
        dispatch({type: END_PROCESS});
        alert(error);
    }
};

//Change Password action to return 'success' 'status' 'message' the show alert
export const changePassword = (body, navigation, setIsloading) => async dispatch => {
    const bodyData = JSON.stringify(body);
    try {
        setIsloading(true);
        dispatch({type: START_PROCESS});
        const { data } = await api.changePassword(bodyData, headers);
        const status = data?.status;
        const success = data?.success;
        const message = data?.message;
        if(success === 1){
            dispatch({type: END_PROCESS});
            setIsloading(false);
            alert(message);
            navigation.navigate('Login');
        }else{
            throw(message);
        }
    } catch (error) {
        setIsloading(false);
        dispatch({type: END_PROCESS});
        alert(error);
    }
};

export const logout = () => async dispatch => {
    try {
        await AsyncStorage.clear();
        dispatch({type: SIGN_OUT});
    } catch (error) {
        alert(error);
    }
};

export const registerForPushNotificationsAsync = async (userId) => {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if(existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if(finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        updateUserToken(userId, token);
    } else {
        alert('Must use physical device for Push Notification');
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
};