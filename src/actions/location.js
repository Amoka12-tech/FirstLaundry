import { DRAG_DELIVERY, DRAG_PICKUP, RESET_LOCATION, SET_DELIVERY, SET_PICKUP } from "../reducers/types";
import * as Location from 'expo-location';
import { GOOGLE_MAP_API_KEY } from "../../config";
import { LocationAccuracy } from "expo-location";

//Function to set pictup
export const setPickuptLocation = (data, details) => dispatch => {
    const payload = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        pickupAddressName: data.description,
    };
    dispatch({type: SET_PICKUP, payload: payload});
};

export const setDeliveryLocation = (data, details) => dispatch => {
    const payload = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        deliveryAddressName: data.description,
    };
    dispatch({type: SET_DELIVERY, payload: payload});
};

export const setDraggedPickupLocation = (body, setIsLoading) => async dispatch => {
    try {
        setIsLoading(true);
        const cordinates = {
            latitude: body.latitude,
            longitude: body.longitude,
        };
        const addressName = await reverseLocationLatLng(cordinates);
        const pickupAddressName = `${addressName.name} ${addressName.district} ${addressName.city}`;
        const payload = {
            latitude: body.latitude,
            longitude: body.longitude,
            pickupAddressName: pickupAddressName,
        };
        dispatch({type: DRAG_PICKUP, payload: payload});
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        alert('failed request please try again.');
    }
};

export const setDraggedDeliveryLocation = (body, setIsLoading) => async dispatch => {
    
    try {
        setIsLoading(true);
        const cordinates = {
            latitude: body.latitude,
            longitude: body.longitude,
        };
        const addressName = await reverseLocationLatLng(cordinates);
        const deliveryAddressName = `${addressName.name} ${addressName.district} ${addressName.city}`;
        const payload = {
            latitude: body.latitude,
            longitude: body.longitude,
            deliveryAddressName: deliveryAddressName,
        };
        dispatch({type: DRAG_DELIVERY, payload: payload});
        setIsLoading(false);
    } catch (error) {
        alert('failed request try again');
        setIsLoading(false);
    }
};

export const setSameAsPickup = (body) => dispatch => {
    const payload = {
        latitude: body.latitude,
        longitude: body.longitude,
        deliveryAddressName: body.deliveryAddressName,
    };
    dispatch({type: SET_DELIVERY, payload: payload});
};

export const resetLocationLocation = () => dispatch => {
    dispatch({type: RESET_LOCATION});
};

//Dispatch on clicking get current location
export const setPickupToCurrentLocation = (setIsLoading) => async dispatch => {
    try {
        setIsLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw('Permission to access location was denied');
        }else{
            let location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.BestForNavigation });

            const cordinate = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };//constructed cordinate data for position marking
            dispatch(setDraggedPickupLocation(cordinate, setIsLoading));
        }
    } catch (error) {
        alert('Oops! check your location settings and make sure you allow app to use location service');
        setIsLoading(false);
    }
};

export const reverseLocationLatLng = async (body) => {
    // const latitude = body.latitude;
    // const longitude = body.longitude;
    
    try {
        Location.setGoogleApiKey(GOOGLE_MAP_API_KEY);
        const locationData = await Location.reverseGeocodeAsync(body, { useGoogleMaps: true });
        return locationData[0];
    } catch (error) {
        alert('network issue and address not retrive try again try again please');
        console.log(error.message);
    }
};