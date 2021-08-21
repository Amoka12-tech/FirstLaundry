import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, TouchableOpacity, View, Text, Alert } from 'react-native';
import { BottomSheet, Icon, Image } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder, getOrder } from '../../actions/order';
import { black, grey, primaryColor, white } from '../../Theme/color';
import styles from '../../Theme/styles/user';
import welcomeImg from '../../Theme/image/welcome.png';
import moment from 'moment-timezone';
import 'intl'
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import { APPCURRENCY } from '../../../config';
import bluePng from '../../Theme/icons/blue.png';
import orangePng from '../../Theme/icons/orange.png';
import primaryPng from '../../Theme/icons/primary.png';
import redPng from '../../Theme/icons/red.png';
import greenPng from '../../Theme/icons/green.png';
import orderBoxPng from '../../Theme/icons/orderBox.png';
import orderCalenderPng from '../../Theme/icons/calender.png';
import orderPaymentPng from '../../Theme/icons/payment.png';
import orderMapPng from '../../Theme/icons/map.png';
import toFro from '../../Theme/icons/line.png';
import locationIcon from '../../Theme/icons/addressIcon.png';
import Spinner from 'react-native-loading-spinner-overlay';
import OrderStatus from './parts/OrderStatus';

export default function OrderDetails({ navigation, route }) {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.user);
    const orders = useSelector(state => state.orders);
    const isLoading = useSelector(state => state.auth.isLoading);

    const formatter = new Intl.NumberFormat('en-US');
    
    const { id } = route.params;
    let order = orders.filter((item) => item.orderId === id);

    useEffect(() => {
        dispatch(getOrder(userData.id, id));
    }, []);

    const onCancel = () => {
      dispatch(cancelOrder(userData?.id, order[0]?.orderId));
    };

    const [laundryShown, setLaundryShown] = useState(true);
    const toggleShowLaundry = () => setLaundryShown(!laundryShown);

    const [washShown, setWashShown] = useState(true);
    const toggleShowWash = () => setWashShown(!washShown);

    const [foldShown, setFoldShown] = useState(true);
    const toggleShowFold = () => setFoldShown(!foldShown);

    const [ironShown, setIronShown] = useState(true);
    const toggleShowIron = () => setIronShown(!ironShown);

    const [dryShown, setDryShown] = useState(true);
    const toggleShowDry = () => setDryShown(!dryShown);

    const foundLaundry = order[0]?.items.findIndex(l => l.itemService === "wash_iron"); //check if laundry exist in this order
    const foundWash = order[0]?.items.findIndex(w => w.itemService === "wash");
    const foundFold = order[0]?.items.findIndex(f => f.itemService === "fold");
    const foundIron = order[0]?.items.findIndex(i => i.itemService === "iron");
    const foundDry = order[0]?.items.findIndex(d => d.itemService === "dry");

    const [isBsVisible, setIsBsVisible] = useState(false);
    const toggleBottomSheet = () => setIsBsVisible(!isBsVisible);
  return (
    <View style={styles.mainContainerPadding}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <Spinner 
            visible={isLoading}
            textContent={'Canceling orders...'}
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
                Order Details
            </Text>

            <View />
        </View>
     
      <ScrollView showsVerticalScrollIndicator={false} style={styles.orderDetailsHolder, { marginBottom: order[0]?.status === "pending" ? '15%' : 0,}}>

        <View style={styles.orderDetailsWelcome}>
          <Image source={welcomeImg} resizeMode="contain" style={styles.orderDetailsImg} />
          <Text style={styles.orderDetailsThanks}>
            Thanks for choosing Us!</Text>
          <Text style={styles.orderDetailsSlogan}>
            Your order is currently {order[0]?.status}</Text>

        </View>

        <View style={{ display: 'flex', width: '100%', padding: 10, borderColor: grey, borderRadius: 5, borderWidth: 1, }}>
          <View style={styles.orderDetailsTimeHolder}>
            <View style={styles.orderIdHolder}>
              <Text style={styles.orderText}>
                Order #{order[0]?.orderId}
              </Text>
              <Text style={styles.orderSmallText}>({order[0]?.totalCount}items)</Text>
            </View>

            <Text style={styles.orderScheduleItemDate}>
              {moment(order[0].pickupDateTime).format("hh:mm A, ddd, D MMM YYYY")}
            </Text>
          </View>

          <View style={styles.addressDivider} />

          {foundLaundry !== -1 && <View style={styles.orderTypeView}>
            <View style={styles.orderTypeHeaderHolder}>
              <Text style={styles.orderTypeHeader}>
                Laundry
              </Text>
              <Icon type="antdesign" name={laundryShown ? "up": "down"} size={20} color={black} onPress={toggleShowLaundry}  />
            </View>

            {laundryShown && order[0]?.items.map((item, index) => {
              if(item?.itemService === "wash_iron"){
                return(
                  <View key={index} style={styles.orderTypeItemHolder}>
                    <Text style={styles.orderTypeItem}>
                      {item?.itemName}</Text>

                    <Text style={styles.orderTypePrice}>
                      {`${APPCURRENCY}${formatter.format(item?.itemPrice)}`} </Text>
                  </View>
                )
              }
            }) }
          </View>}

          {foundWash !== -1 && <View style={styles.orderTypeView}>
            <View style={styles.orderTypeHeaderHolder}>
              <Text style={styles.orderTypeHeader}>
                Wash
              </Text>
              <Icon type="antdesign" name={washShown ? "up": "down"} size={20} color={black} onPress={toggleShowWash}  />
            </View>

            {washShown && order[0]?.items.map((item, index) => {
              if(item?.itemService === "wash"){
                return(
                  <View key={index} style={styles.orderTypeItemHolder}>
                    <Text style={styles.orderTypeItem}>
                      {item?.itemName}</Text>

                    <Text style={styles.orderTypePrice}>
                      {`${APPCURRENCY}${formatter.format(item?.itemPrice)}`} </Text>
                  </View>
                )
              }
            }) }
          </View>}

          {foundFold !== -1 && <View style={styles.orderTypeView}>
            <View style={styles.orderTypeHeaderHolder}>
              <Text style={styles.orderTypeHeader}>
                Fold
              </Text>
              <Icon type="antdesign" name={foldShown ? "up": "down"} size={20} color={black} onPress={toggleShowFold}  />
            </View>

            {foldShown && order[0]?.items.map((item, index) => {
              if(item?.itemService === "fold"){
                return(
                  <View key={index} style={styles.orderTypeItemHolder}>
                    <Text style={styles.orderTypeItem}>
                      {item?.itemName}</Text>

                    <Text style={styles.orderTypePrice}>
                      {`${APPCURRENCY}${formatter.format(item?.itemPrice)}`} </Text>
                  </View>
                )
              }
            }) }
          </View>}

          {foundIron !== -1 && <View style={styles.orderTypeView}>
            <View style={styles.orderTypeHeaderHolder}>
              <Text style={styles.orderTypeHeader}>
                Iron
              </Text>
              <Icon type="antdesign" name={ironShown ? "up": "down"} size={20} color={black} onPress={toggleShowIron}  />
            </View>

            {ironShown && order[0]?.items.map((item, index) => {
              if(item?.itemService === "iron"){
                return(
                  <View key={index} style={styles.orderTypeItemHolder}>
                    <Text style={styles.orderTypeItem}>
                      {item?.itemName}</Text>

                    <Text style={styles.orderTypePrice}>
                      {`${APPCURRENCY}${formatter.format(item?.itemPrice)}`} </Text>
                  </View>
                )
              }
            }) }
          </View>}

          {foundDry !== -1 && <View style={styles.orderTypeView}>
            <View style={styles.orderTypeHeaderHolder}>
              <Text style={styles.orderTypeHeader}>
                Dry
              </Text>
              <Icon type="antdesign" name={dryShown ? "up": "down"} size={20} color={black} onPress={toggleShowDry}  />
            </View>

            {dryShown && order[0]?.items.map((item, index) => {
              if(item?.itemService === "dry"){
                return(
                  <View key={index} style={styles.orderTypeItemHolder}>
                    <Text style={styles.orderTypeItem}>
                      {item?.itemName}</Text>

                    <Text style={styles.orderTypePrice}>
                      {`${APPCURRENCY}${formatter.format(item?.itemPrice)}`} </Text>
                  </View>
                )
              }
            }) }
          </View>}
          
          <View style={styles.addressDivider} />

          <View style={styles.confirmPageComponent}>
                <View style={styles.confirmPagePriceRow}>
                    <Text style={styles.confirmPriceHeader}>
                        Subtotal
                    </Text>
                    <Text style={styles.confirmPriceText}>
                        {`${APPCURRENCY}${formatter.format(order[0]?.amount-1000)}`}
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
                        {`${APPCURRENCY}${formatter.format(order[0]?.amount)}`}
                    </Text>
                </View>
                {/* End of total price */}
            </View>
            {/* End of price component  */}
        </View>
        
        <View style={{ display: 'flex', flexDirection: 'column', marginTop: 10, width: '100%', padding: 10, borderColor: grey, borderRadius: 5, borderWidth: 1, }}>
            <View style={styles.orderDetailsBoxHolder}>
              <View style={styles.orderDetailsBoxLeft}>
                <Image source={orderBoxPng} resizeMode="contain" style={{ width: 20, height: 20 }} />
                <Image source={
                  order[0]?.status === 'pending'? primaryPng : 
                  order[0]?.status === 'dispatched' || order[0]?.status === 'confirmed'? bluePng : 
                  order[0]?.status === 'canceled'? redPng : 
                  order[0]?.status === 'inProgress'? orangePng : greenPng
                  } resizeMode="contain" style={{ width: 12, height: 43, marginTop: 5 }} />
              </View>

              <View style={styles.orderDetailsBoxRight}>
                <View style={styles.orderBoxRightTop}>
                  <Text style={styles.orderBoxRightTopTextL}>
                    Order Status</Text>
                  <TouchableOpacity onPress={toggleBottomSheet}>
                    <Text style={styles.orderBoxRightTopTextR}>
                      View detail</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.boldText}>{order[0]?.status}</Text>
                <Text style={styles.regularText}>
                  {order[0]?.status === "pending" ? moment(order[0]?.orderDate).tz("Africa/Lagos").format("hh:mm A, ddd, D MMM YYYY") : 
                    order[0]?.status === "dispatched" ? moment(order[0]?.dispatcherDate).tz("Africa/Lagos").format("hh:mm A, ddd, D MMM YYYY") : 
                    order[0]?.status === "canceled" ? moment(order[0]?.completedDate).tz("Africa/Lagos").format("hh:mm A, ddd, D MMM YYYY") : 
                    order[0]?.status === "inProgress" ? moment(order[0]?.inProgressDate).tz("Africa/Lagos").format("hh:mm A, ddd, D MMM YYYY") : 
                    order[0]?.status === "confirmed" ? moment(order[0]?.confirmationDate).tz("Africa/Lagos").format("hh:mm A, ddd, D MMM YYYY") : 
                    moment(order[0]?.completedDate).tz("Africa/Lagos").format("hh:mm A, ddd, D MMM YYYY")
                    }
                  </Text>
              </View>

            </View>

        </View> 
        {/* Order Status */}

        <View style={{ display: 'flex', flexDirection: 'column', marginTop: 10, width: '100%', padding: 10, borderColor: grey, borderRadius: 5, borderWidth: 1, }}>
            <View style={styles.orderDetailsBoxHolder}>
              <View style={styles.orderDetailsBoxLeft}>
                <Image source={orderCalenderPng} resizeMode="contain" style={{ width: 20, height: 20 }} />
              </View>

              <View style={styles.orderDetailsBoxRight}>
                <View style={styles.orderBoxRightTop}>
                  <Text style={styles.orderBoxRightTopTextL}>
                    Schedule Date </Text>
                </View>

                {/* order date details view */}
              <View style={styles.orderScheduleHolder}>
                {/* Hold pickup date and time */}
                <View style={styles.orderScheduleItem}>
                  <Text style={styles.orderScheduleItemTime}>{moment(order[0]?.pickupDateTime).tz("Africa/Lagos").format("hh:mmA")}</Text>
                  <Text style={styles.orderScheduleItemDate}>{moment(order[0]?.pickupDateTime).format("ddd, D MMM")}</Text>
                </View>

                {/* Hold icon to and from */}
                <Image source={toFro} resizeMode="contain" style={styles.orderScheduleItemToFro} />
                
                {/* Hold delivery date and time */}
                <View style={styles.orderScheduleItem}>
                  <Text style={styles.orderScheduleItemTime}>{moment(order[0]?.deliveryDateTime).tz("Africa/Lagos").format("hh:mmA")}</Text>
                  <Text style={styles.orderScheduleItemDate}>{moment(order[0]?.deliveryDateTime).format("ddd, D MMM")}</Text>
                </View>
              </View>

              </View>

            </View>

        </View> 
        {/* Schedule Date */}
        
        <View style={{ display: 'flex', flexDirection: 'column', marginTop: 10, width: '100%', padding: 10, borderColor: grey, borderRadius: 5, borderWidth: 1, }}>
            <View style={styles.orderDetailsBoxHolder}>
              <View style={styles.orderDetailsBoxLeft}>
                <Image source={orderPaymentPng} resizeMode="contain" style={{ width: 20, height: 20 }} />
              </View>

              <View style={styles.orderDetailsBoxRight}>
                <View style={styles.orderBoxRightTop}>
                  <Text style={styles.orderBoxRightTopTextL}>
                    Payment Method</Text>
                </View>
                <Text style={styles.orderTypePrice}>{order[0]?.paymentStatus === "1" ? 'Payment confirmed' : 'No payment yet'}</Text>
                <Text style={styles.regularText}>{order[0]?.paymentRef}</Text>
              </View>

            </View>

        </View> 
        {/* Payment Status */}

        <View style={{ display: 'flex', flexDirection: 'column', marginTop: 10, width: '100%', padding: 10, borderColor: grey, borderRadius: 5, borderWidth: 1, }}>
            <View style={styles.orderDetailsBoxHolder}>
              <View style={styles.orderDetailsBoxLeft}>
                <Image source={orderMapPng} resizeMode="contain" style={{ width: 20, height: 20, marginBottom: 10 }} />

                <Image source={locationIcon} style={styles.addressIcon} />
              </View>

              <View style={styles.orderDetailsBoxRight}>
                <View style={styles.orderBoxRightTop}>
                  <Text style={styles.orderBoxRightTopTextL}>
                    Address Delivery</Text>
                </View>

                <View style={styles.addressDetails}>
                  <Text>Pickup Address</Text>
                  <Text>{order[0]?.pickupAddress}</Text>
                  
                  <View style={styles.addressDivider} />
                  
                  <Text>Delivery Address</Text>
                  <Text>{order[0]?.deliveryAddress}</Text>
                </View>
              </View>

            </View>

        </View> 
        {/* Address Details */}

      </ScrollView>

      {!isBsVisible && order[0]?.status === 'pending' 
      && <View style={styles.bottomSheet}>
        <TouchableOpacity 
            onPress={() => 
              Alert.alert(
                "Confirm Action",
                "Confirm you want to cancel this order",
                [
                  {
                    text: "NO",
                    onPress: () => alert("Order not canceled"),
                    style: "cancel"
                  },
                  {
                    text: "YES",
                    onPress: onCancel,
                  }
                ]
              )
            }
            style={styles.standardCancelButton}>
            <Text style={styles.standardButtonText}>
                {'Cancel'}
            </Text>
        </TouchableOpacity>
      </View>}
      
      <BottomSheet 
        isVisible={isBsVisible}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
      >
        <OrderStatus order={order[0]} toggleBottomSheet={toggleBottomSheet} />
      </BottomSheet>
    </View>
  );
}
