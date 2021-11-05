import React, { useState, useEffect } from 'react';
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
import { optBankPayment } from '../../actions/payment';
import { getDiscount, placeOrder } from '../../actions/order';
import moment from 'moment-timezone';
import { Platform } from 'react-native';

const ConfirmOrderPage = (props) => {
    const navigation = props.navigation;
    const route = props.route;
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);
    const userData = useSelector(state => state.auth.user);
    const locationData = useSelector(state => state.location);
    const payment = useSelector(state => state.payment);
    const {
        selectedItems,
        totalCount,
        totalPrice,
    } = route.params;

    const [paymentMethod, setPaymentMethod] = useState('card');

    const currentDate = moment().tz("Africa/Lagos");

    const currentPickupFullDate = getFormatedDate(currentDate, "YYYY/MM/DD hh:mm");
    const [pickupDateTime, setPickupDateTime] = useState(currentDate);

    useEffect(() => {
        const newSetDate = moment(pickupDateTime);
        newSetDate.add(3, 'days');
        setDeliveryDateTime(newSetDate);
    }, [pickupDateTime]); // to set delivery date to three(3) days after pickup date

    const [deliveryDateTime, setDeliveryDateTime] = useState('');

    const [showPickupDate, setShowPickupDate] = useState(false);
    const toggleShowPickup = () => setShowPickupDate(!showPickupDate);

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2
    });

    const [viewMap, setViewMap] = useState(false);
    const toggleViewMap = () => setViewMap(!viewMap);

    const [discount, setDiscount] = useState(0);
    useEffect(() => {
      getDiscount(userData?.id).then(value => setDiscount(value));
    }, []);

    const price = discount > 0 ? totalPrice*(discount/100) : totalPrice;

    const [ordering, setOdering] = useState(false);

    const onSubmit = () => {
        if(selectedItems.length > 0){
            if(pickupDateTime === null){
                alert('Pick a date for item pickup!');
            }else if(payment?.paymentStatus === false && paymentMethod === 'card'){
                navigation.navigate('Payment', {
                    amount: price+1000,
                });
            }else if(locationData?.pickupAddressName === null && locationData?.deliveryAddressName === null){
                navigation.navigate('MapView');
            }else{
                const orderData = {
                    userData: userData,
                    selectedItems: selectedItems,
                    totalCount: totalCount,
                    totalPrice: price,
                    discount: discount,
                    pickupDateTime: pickupDateTime,
                    deliveryDateTime: deliveryDateTime,
                    payment,
                    locationData: locationData,
                }// JSON Structure data for api
                const jsonData = JSON.stringify(orderData);

                dispatch(placeOrder(jsonData, navigation));//place order now to api
            }
        }else{
            alert('Please go back and select an item for this service.');
        }
    };//Function that send the order to api

    useEffect(() => {
        if(payment?.paymentStatus === true && locationData?.pickupAddressName !== null && locationData?.deliveryAddressName !== null){
            onSubmit();
        }
    },[payment?.paymentStatus]);

  return (
    <View style={styles.confirmPageMain}>
        <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
        <Spinner 
            visible={ordering}
            textContent={'Placing orders...'}
            textStyle={styles.loadingText}
            color={primaryColor}
        />
        
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
                        {`${APPCURRENCY}${formatter.format(price)}`}
                    </Text>
                </View>
                {/* Discount Price */}
                <View style={styles.confirmPagePriceRow}>
                    <Text style={styles.confirmPriceHeader}>
                        Discount
                    </Text>
                    <Text style={styles.confirmPriceText}>
                        {`${discount}%`}
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
                        {`${APPCURRENCY}${formatter.format(price+1000)}`}
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
                            <Text>{moment(pickupDateTime).tz("Africa/Lagos").format("ddd, D MMM")}</Text>
                            <Text>{moment(pickupDateTime).tz("Africa/Lagos").format("hh:mm A")}</Text>
                        </View>
                    </TouchableOpacity>

                    
                    <View style={styles.deliveryDateHolder}>
                        <Icon type="font-awesome" name="calendar-check-o" size={20} color={grey} />
                        <View style={styles.scheduleDateTimeHolder}>
                            <Text>{moment(deliveryDateTime).tz("Africa/Lagos").format("ddd, D MMM")}</Text>
                            <Text>{moment(deliveryDateTime).tz("Africa/Lagos").format("hh:mm A")}</Text>
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

                <TouchableOpacity onPress={() => setPaymentMethod('card')} style={styles.paymentScheduleHolder}>
                    <View style={styles.schedulePaymentHolder}>
                        <CheckBox 
                            checkedIcon='check-circle-o'
                            uncheckedIcon='circle-o'
                            onPress={() => setPaymentMethod('card')}
                            checked={paymentMethod === "card" ? true : false}
                            size={20}
                            checkedColor={primaryColor}
                            containerStyle={{ width: 25, height: Platform.OS === 'android'? 25 : 40, alignItems: 'center', justifyContent: 'center' }}
                        />
                        <Text style={styles.schedulePaymentText}>
                            Card Payment
                        </Text>
                    </View>

                    <Image source={creditCard} style={{ resizeMode: 'contain', width: 20, height: 20 }} />

                </TouchableOpacity>

                {/* Bank transfer */}
                <TouchableOpacity onPress={() => {
                    if(payment?.paymentStatus !== true){
                        setPaymentMethod('bank');
                        dispatch(optBankPayment());
                    }else{
                        alert('Payment already processed for this order using card');
                    }
                }} style={styles.paymentScheduleHolder}>
                    <View style={styles.schedulePaymentHolder}>
                        <CheckBox 
                            checkedIcon='check-circle-o'
                            uncheckedIcon='circle-o'
                            onPress={() => {
                                if(payment?.paymentStatus !== true){
                                    setPaymentMethod('bank');
                                    dispatch(optBankPayment());
                                }else{
                                    alert('Payment already processed for this order using card');
                                }
                            }}
                            checked={paymentMethod === "bank" ? true : false}
                            size={20}
                            checkedColor={primaryColor}
                            containerStyle={{ width: 25, height: Platform.OS === 'android'? 25 : 40, alignItems: 'center', justifyContent: 'center' }}
                        />
                        <Text style={styles.schedulePaymentText}>
                            BanK Transfer
                        </Text>
                    </View>

                    <Image source={bankIcon} style={{ resizeMode: 'contain', width: 20, height: 20 }} />

                </TouchableOpacity>
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
                        <Text>{!!locationData?.pickupAddressName ? locationData?.pickupAddressName : 'Enter Pickup location'}</Text>
                        
                        <View style={styles.addressDivider} />
                        
                        <Text>Delivery Address</Text>
                        <Text>{!!locationData?.deliveryAddressName ? locationData?.deliveryAddressName : 'Enter Delivery location'}</Text>
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
                    minimumDate={moment().format("YYYY-MM-DD")}
                    current={moment(pickupDateTime).format("YYYY-MM-DD HH:mm")}
                    onSelectedChange={data => {
                        const momentDate = getFormatedDate(data, "YYYY/MM/DD HH:HH");
                        setPickupDateTime(moment(momentDate));
                        toggleShowPickup();
                    }}
                />}

                <TouchableOpacity 
                    onPress={onSubmit}
                    style={styles.standardButton}>
                    <Text style={styles.standardButtonText}>
                        {payment.paymentData == null ? 'Make payment' : !!payment.paymentData && locationData.pickupAddressName === null ? 'Pick Locations' : 'Place Order'}
                    </Text>
                </TouchableOpacity>
            </View>}
     </View>
  );
};

export default ConfirmOrderPage;
