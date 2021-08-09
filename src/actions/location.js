import { DRAG_DELIVERY, DRAG_PICKUP, SET_DELIVERY, SET_PICKUP } from "../reducers/types";
import * as Location from 'expo-location';
import { GOOGLE_MAP_API_KEY } from "../../config";

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

export const setDraggedPickupLocation = (body) => dispatch => {
    try {
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
    } catch (error) {
        alert('failed request please try again.');
    }
};

export const setDraggedDeliveryLocation = (body) => dispatch => {
    
    try {
        const cordinates = {
            latitude: body.latitude,
            longitude: body.longitude,
        };
        const addressName = await reverseLocationLatLng(cordinates);
        const pickupAddressName = `${addressName.name} ${addressName.district} ${addressName.city}`;
        const payload = {
            latitude: body.latitude,
            longitude: body.longitude,
            deliveryAddressName: pickupAddressName,
        };
        dispatch({type: DRAG_DELIVERY, payload: payload});
    } catch (error) {
        alert('failed request try again');
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