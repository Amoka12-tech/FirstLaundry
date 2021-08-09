import { DRAG_DELIVERY, DRAG_PICKUP, SET_DELIVERY, SET_PICKUP } from "./types";

let initialRegion ={
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
    pickupAddressName: null,
    deliveryAddressName: null,
    pickupLat: null,
    pickupLng: null,
    deliveryLat: null,
    deliveryLng: null,
  }

export default function(location = initialRegion, action){
    const { type, payload } = action;
    switch (type) {
        case SET_PICKUP:
            return{
                ...location,
                latitude: payload.latitude,
                longitude: payload.longitude,
                pickupAddressName: payload.pickupAddressName,
                pickupLat: payload.latitude,
                pickupLng: payload.longitude,
            };

        case SET_DELIVERY:
            return{
                ...location,
                latitude: payload.latitude,
                longitude: payload.longitude,
                deliveryAddressName: payload.deliveryAddressName,
                deliveryLat: payload.latitude,
                deliveryLng: payload.longitude,
            };

        case DRAG_PICKUP:
            return{
                ...location,
                latitude: payload.latitude,
                longitude: payload.longitude,
                pickupLat: payload.latitude,
                pickupLng: payload.longitude,
            };

        case DRAG_DELIVERY:
            return{
                ...location,
                latitude: payload.latitude,
                longitude: payload.longitude,
                deliveryLat: payload.latitude,
                deliveryLng: payload.longitude,
            };
    
        default:
            return {...location};
    }
};