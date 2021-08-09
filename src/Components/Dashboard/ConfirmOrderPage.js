import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { CheckBox, Icon, Image, Input } from 'react-native-elements';
import { APPCURRENCY, GOOGLE_MAP_API_KEY } from '../../../config';
import { black, grey, primaryColor, secondaryColor } from '../../Theme/color';
import styles from '../../Theme/styles/user';
import 'intl'
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import creditCard from '../../Theme/icons/credit-card.png';
import bankIcon from '../../Theme/icons/bank.png';
import locationIcon from '../../Theme/icons/addressIcon.png';
import pickupIcon from '../../Theme/icons/pickupIcon.png';
import deliveryIcon from '../../Theme/icons/deliveryIcon.png';
import { ScrollView } from 'react-native';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDeliveryLocation, setPickuptLocation } from '../../actions/location';

export default function ConfirmOrderPage({ navigation, route }) {
    const dispatch = useDispatch();
    const locationData = useSelector(state => state.location);
    const {
        selectedItems,
        totalCount,
        totalPrice
    } = route.params;
    // console.log(totalCount," Items ",totalPrice," Cost");

    const [paymentMethod, setPaymentMethod] = useState('card');

    const currentDate = new Date();
    const currentPickupDate = currentDate.getDate();
    const currentPickupDay = currentDate.getDay()+1;
    const currentPickupMonth = currentDate.getMonth()+1;
    const currentPickupYear = currentDate.getFullYear();
    const currentPickupHour = currentDate.getHours();
    const currentPickupMinutes = currentDate.getMinutes();

    const currentPickupFullDate = getFormatedDate(currentDate, "YYYY/MM/DD hh:mm");
    const [pickupDateTime, setPickupDateTime] = useState(currentPickupFullDate);
    const [deliveryDateTime, setDeliveryDateTime] = useState('');
    const pickupDateSplit = pickupDateTime.split(' ');
    const deliveryDateSplit = deliveryDateTime?.split(' ');

    const [showPickupDate, setShowPickupDate] = useState(false);
    const toggleShowPickup = () => setShowPickupDate(!showPickupDate);

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2
    });

    const [viewMap, setViewMap] = useState(false);
    const toggleViewMap = () => setViewMap(!viewMap);

  return (
    <View style={styles.confirmPageMain}>
        <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
        
        <View style={styles.topNavHolder}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon 
                    type="antdesign"
                    name="arrowleft"
                    color={black}
                    size={30}
                />
            </TouchableOpacity>

            <Text style={styles.topNavText}>
                Schedule A Pickup
            </Text>

            <View />
        </View>

        {/* Start component holder */}
        <ScrollView contentContainerStyle={styles.confirmPageHolder}>
            <View style={styles.confirmPageComponent}>
                <Text style={styles.confirmPageHeaderText}>
                    Price Details
                </Text>
                <View style={styles.confirmPagePriceRow}>
                    <Text style={styles.confirmPriceHeader}>
                        Subtotal
                    </Text>
                    <Text style={styles.confirmPriceText}>
                        {`${APPCURRENCY}${formatter.format(totalPrice)}`}
                    </Text>
                </View>
                {/* End of sub total */}
                <View style={styles.confirmPagePriceRow}>
                    <Text style={styles.confirmPriceHeader}>
                        Dispatch(ToFro)
                    </Text>
                    <Text style={styles.confirmPriceText}>
                        {`${APPCURRENCY}${formatter.format(1000)}`}
                    </Text>
                </View>
                {/* End of dispatch price */}
                <View style={styles.confirmPagePriceRowBorder}>
                    <Text style={styles.confirmPriceHeader}>
                        Total
                    </Text>
                    <Text style={styles.confirmPriceText_T}>
                        {`${APPCURRENCY}${formatter.format(totalPrice+1000)}`}
                    </Text>
                </View>
                {/* End of total price */}
            </View>
            {/* End of price component  */}

            <View style={styles.confirmPageComponent}>
                <Text style={styles.confirmPageHeaderText}>
                    Schedule Date
                </Text>

                <View style={styles.scheduleHolder}>
                    <TouchableOpacity onPress={toggleShowPickup} style={styles.pickupDateHolder}>
                        <Icon type="font-awesome" name="calendar-plus-o" size={20} color={grey} />
                        <View style={styles.scheduleDateTimeHolder}>
                            <Text>{pickupDateSplit[0]}</Text>
                            <Text>{`${pickupDateSplit[1]}`}</Text>
                        </View>
                    </TouchableOpacity>

                    
                    <View style={styles.deliveryDateHolder}>
                        <Icon type="font-awesome" name="calendar-check-o" size={20} color={grey} />
                        <View style={styles.scheduleDateTimeHolder}>
                            <Text>{deliveryDateTime ? deliveryDateSplit[0] : ''}</Text>
                            <Text>{deliveryDateTime ? `${deliveryDateSplit[1]}` : ''}</Text>
                        </View>
                    </View>

                    <View style={styles.scheduleTitleHolder}>
                        <View style={styles.scheduleTitle}>
                            <Text style={styles.scheduleTitleText}>Pickup Time</Text>
                        </View>
                        <View style={styles.scheduleTitle}>
                            <Text style={styles.scheduleTitleText}>Delivery Time</Text>
                        </View>
                    </View>
                
                </View>
            </View>
            {/* End of date component  */}

            <View style={styles.confirmPageComponent}>
                <Text style={styles.confirmPageHeaderText}>
                    Payment method
                </Text>

                <View style={styles.paymentScheduleHolder}>
                    <View style={styles.schedulePaymentHolder}>
                        <CheckBox 
                            checkedIcon='check-circle-o'
                            uncheckedIcon='circle-o'
                            onPress={() => setPaymentMethod('card')}
                            checked={paymentMethod === "card" ? true : false}
                            size={20}
                            checkedColor={primaryColor}
                            containerStyle={{ width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}
                        />
                        <Text style={styles.schedulePaymentText}>
                            Card Payment
                        </Text>
                    </View>

                    <Image source={creditCard} style={{ resizeMode: 'contain', width: 20, height: 20 }} />

                </View>

                {/* Bank transfer */}
                <View style={styles.paymentScheduleHolder}>
                    <View style={styles.schedulePaymentHolder}>
                        <CheckBox 
                            checkedIcon='check-circle-o'
                            uncheckedIcon='circle-o'
                            onPress={() => setPaymentMethod('bank')}
                            checked={paymentMethod === "bank" ? true : false}
                            size={20}
                            checkedColor={primaryColor}
                            containerStyle={{ width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}
                        />
                        <Text style={styles.schedulePaymentText}>
                            BanK Transfer
                        </Text>
                    </View>

                    <Image source={bankIcon} style={{ resizeMode: 'contain', width: 20, height: 20 }} />

                </View>
            </View>
            {/* End of payment component  */}

            <View style={styles.confirmPageComponent}>
                <Text style={styles.confirmPageHeaderText}>
                    Address
                </Text>

                <View style={styles.addressBox}>
                    <Image source={locationIcon} style={styles.addressIcon} />

                    <TouchableOpacity 
                        onPress={() => navigation.navigate('MapView')}
                        style={styles.addressDetails}>
                        <Text>Pickup Address</Text>
                        <Text>CT7B The Sparks, KDT Duong Noi, Str. Ha Dong, Ha Noi</Text>
                        
                        <View style={styles.addressDivider} />
                        
                        <Text>Delivery Address</Text>
                        <Text>CT7B The Sparks, KDT Duong Noi, Str. Ha Dong, Ha Noi</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* End of pickup location component  */}
        </ScrollView>

        {viewMap === false && <View style={styles.bottomSheet}>
                {showPickupDate &&
                    <TouchableOpacity 
                    style={styles.calenderClose}
                    onPress={toggleShowPickup}
                    >
                    <Icon 
                        type="antdesign"
                        name="down"
                        size={20}
                        color={black}
                    />
                </TouchableOpacity>}
                {showPickupDate && 
                <DatePicker 
                    minimumDate={pickupDateTime}
                    current={pickupDateTime}
                    onSelectedChange={data => {
                        setPickupDateTime(data);
                        toggleShowPickup();
                    }}
                />}

                <TouchableOpacity style={styles.standardButton}>
                    <Text style={styles.standardButtonText}>
                        Place Order
                    </Text>
                </TouchableOpacity>
            </View>}
     </View>
  );
}
