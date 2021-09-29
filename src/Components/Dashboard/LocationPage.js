import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { reverseLocationLatLng, setDeliveryLocation, setDraggedDeliveryLocation, setDraggedPickupLocation, setPickuptLocation, setPickupToCurrentLocation, setSameAsPickup } from '../../actions/location';
import pickupIcon from '../../Theme/icons/pickupIcon.png';
import deliveryIcon from '../../Theme/icons/deliveryIcon.png';
import locationIcon from '../../Theme/icons/addressIcon.png';
import styles from '../../Theme/styles/user';
import { APPCURRENCY, GOOGLE_MAP_API_KEY } from '../../../config';
import { black, primaryColor } from '../../Theme/color';
import { CheckBox, Icon, Image } from 'react-native-elements';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { TouchableOpacity } from 'react-native';

export default function LocationPage({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const locationData = useSelector(state => state.location);

    const initialRegion ={
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        latitudeDelta: locationData.latitudeDelta,
        longitudeDelta: locationData.longitudeDelta,
      };

    const pickupLatLng ={
        latitude: locationData.pickupLat,
        longitude: locationData.pickupLng,
      };

    const deliveryLatLng ={
        latitude: locationData.deliveryLat,
        longitude: locationData.deliveryLng,
    };

    const pickupAddress = locationData?.pickupAddressName;
    const deliveryAddress = locationData?.deliveryAddressName;

    const [valuePAddress, setValuePAddress] = useState(pickupAddress);
    const [valueDAddress, setValueDAddress] = useState(deliveryAddress);

    useEffect(() => {
        setValuePAddress(pickupAddress);
        setValueDAddress(deliveryAddress);
    }, [pickupAddress, deliveryAddress]);

    //UseEffect to get current location
    useEffect(() => {
        if(pickupAddress === null){(async () => {
            setIsLoading(true);
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied');
            setIsLoading(false);
            return;
          }
    
          try {
            let location = await Location.getLastKnownPositionAsync({ maxAge: 5000, requiredAccuracy: 10 });
            if(location === null){
                location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.BestForNavigation });
            }
            const cordinates = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            };//construt cordinate data for current position marker
            dispatch(setDraggedPickupLocation(cordinates, setIsLoading));
            setIsLoading(false);
          } catch (error) {
              setIsLoading(false);
          }
        })();}
      }, []);

      const [sameLocation, setSameLocation] = useState(false);

      const margeLocation = (checked) => {
          if(checked){
            const payload = {
                latitude: locationData.pickupLat,
                longitude: locationData.pickupLng,
                deliveryAddressName: locationData?.pickupAddressName,
            };
            dispatch(setSameAsPickup(payload));
            setSameLocation(checked);
          }else{
            setSameLocation(checked);
          }
      };

    const navigationData = {
        pickupLatLng : pickupLatLng,
        pickupAddress : pickupAddress,
        deliveryLatLng : deliveryLatLng,
        deliveryAddress : deliveryAddress
    };//to send back to confrim page

    const MapHolder = () => {
        return(
            <MapView style={styles.mapViewStyle}
                    mapType="mutedStandard"
                    initialRegion={initialRegion}
                    provider={PROVIDER_GOOGLE}
                >
                    {pickupLatLng.latitude !== null && <Marker 
                        draggable={true}
                        key={'1'}
                        coordinate={pickupLatLng}
                        image={pickupIcon}
                        title={'pickup'}
                        description={'drag to pickup point'}
                        onDragEnd={(e) => dispatch(setDraggedPickupLocation(e.nativeEvent.coordinate, setIsLoading))}
                    />}
                    
                    {deliveryLatLng.latitude !== null && <Marker 
                        draggable={true}
                        key={'2'}
                        coordinate={deliveryLatLng}
                        image={deliveryIcon}
                        title={'delivery'}
                        description={'drag to delivery point'}
                        onDragEnd={(e) => dispatch(setDraggedDeliveryLocation(e.nativeEvent.coordinate, setIsLoading))}
                    />
                    }

                </MapView>
        );
    }; //MapView Holder Component

  return (
    <View style={styles.locationModal}>
                <Spinner 
                    visible={isLoading}
                    textContent={'Please wait...'}
                    textStyle={styles.loadingText}
                    color={primaryColor}
                />
                {/* Top Nav  */}
                <View style={styles.locationTopNav}>
                    <Icon
                        type="antdesign"
                        name="left"
                        size={25}
                        color={black}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            
                {/* Location Input holder */}
                <View style={styles.locationInputHolder}>
                    <Image source={locationIcon} resizeMethod='resize' resizeMode='contain' containerStyle={styles.locationInputIcon} />
                    
                    <View style={styles.locationInputFormHolder}>
                        <GooglePlacesAutocomplete
                            styles={{ container: {
                                flex: 0,
                                padding: 0,
                                margin: 0,
                            },
                            textInput: { fontSize: 18, },
                            textInputContainer: { margin: 0, }
                        }}
                            placeholder={'Pickup from Where'}
                            textInputProps={{ value: valuePAddress, onChangeText: (text) => setValuePAddress(text) }}
                            minLength={2}
                            autoFocus={true}
                            fetchDetails={true}
                            listViewDisplayed={false}
                            onPress={(data, details = null) => {
                                dispatch(setPickuptLocation(data, details));
                                margeLocation(false);
                            }}
                            query={{
                                key: GOOGLE_MAP_API_KEY,
                                language: 'en',
                            }}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            debounce={400}
                        />
                        <View style={styles.addressDivider} />

                        <GooglePlacesAutocomplete
                            styles={{ container: {
                                flex: 0,
                            },
                            textInput: { fontSize: 18, },
                            textInputContainer: { margin: 0, padding: 0, }
                        }}
                            placeholder={'Delivery to Where'}
                            textInputProps={{ value: valueDAddress, onChangeText: (text) => setValueDAddress(text) }}
                            minLength={2}
                            autoFocus={true}
                            fetchDetails={true}
                            listViewDisplayed={false}
                            onPress={(data, details = null) => {
                                dispatch(setDeliveryLocation(data, details));
                            }}
                            query={{
                                key: GOOGLE_MAP_API_KEY,
                                language: 'en',
                            }}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            debounce={400}
                        />

                        <CheckBox 
                            title="Delivery same as pickup location"
                            checked={sameLocation}
                            onPress={() => margeLocation(!sameLocation)}
                        />
                    </View>
                </View>
            
                <MapHolder />

                <Icon 
                    type="material"
                    name="my-location"
                    size={30}
                    color={primaryColor}
                    containerStyle={styles.currentLocation}
                    onPress={() => dispatch(setPickupToCurrentLocation(setIsLoading))}
                />

                <View style={styles.bottomSheet}>
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        style={styles.standardButton}>
                        <Text style={styles.standardButtonText}>
                            {'Continue'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
  );
}
