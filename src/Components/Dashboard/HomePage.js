import * as Notifications from 'expo-notifications';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, Easing, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Avatar, Button, Icon, Image, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { logout, registerForPushNotificationsAsync } from '../../actions/auth';
import { black, blue, green, orange, primaryColor, red, white } from '../../Theme/color';
import { userStyle } from '../../Theme/styles';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import { wash, fold, iron, dry, banner, toFro, confirmIcon, dispatchIcon, inProgressIcon, deliveredIcon } from '../../Theme/icons';
import noPics from '../../Theme/image/noPics.png';
import { updateUser } from '../../actions/user';
import { getAllOrder, getOrder } from '../../actions/order';
import moment from 'moment-timezone';
import 'intl'
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import { APPCURRENCY } from '../../../config';
import { getNotificationsList } from '../../actions/notifications';
import { getAppInfo } from '../../actions/info';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
  }),
});

export default function HomePage({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.user);

  const isLoading = useSelector(state => state.auth.isLoading);
  const orders = useSelector(state => state.orders);
  const appInfo = useSelector(state => state.info);

  useEffect(() => {
    dispatch(getAppInfo());
    dispatch(getAllOrder(userData?.id));
  }, [orders.length]);

  const formatter = new Intl.NumberFormat('en-US');

  const [isModal, setIsModal] = useState(false);
  const toggleEditModal = () => setIsModal(!isModal);

  //Person details state
  const [personPicture, setPersonPicture] = useState(userData?.picture);
  const [personName, setPersonName] = useState(userData?.name);
  const [personNameErr, setPersonNameErr] = useState('');
  const [personPhoneNumber, setPersonPhoneNumber] = useState(userData?.phone);

  const [imageBase64, setImageBase64] = useState("");

  const spinValue = new Animated.Value(0);

  if(isLoading){
    Animated.timing(
      spinValue,
      {
        toValue: 4,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const Header = () => {
    return(
      <View style={userStyle.mainHeader}>
        <View style={userStyle.mainPersonHolder}>
          <TouchableOpacity 
            onPress={toggleEditModal}
            style={userStyle.mainPersonDetailHolder}>
            <Avatar 
              rounded
              source={!!personPicture ? {uri: personPicture} : noPics}
              avatarStyle={{ resizeMode: 'cover' }}
              size={38}
            />
            <View style={userStyle.mainPersonName}>
              <Text style={userStyle.mainPersonNameText}>{userData?.name ? `Hi, ${userData?.name}` : "Hi,"}</Text>
              <Text style={userStyle.mainPersonNamePhone}>{userData?.phone}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => dispatch(logout())}
          >
            <Icon 
              type="antdesign"
              name="logout"
              size={20}
              color={primaryColor}
            />
          </TouchableOpacity>
        </View>
        
        {/* Services start here */}
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('Order')
          }}
          style={userStyle.servicesHolder}>
          <Text style={userStyle.serviceTitle}>Services</Text>
          <View style={userStyle.serviceListHolder}>
            {/* service 1 */}
            <View style={userStyle.serviceListItem}>
              <Image source={wash} style={userStyle.serviceListItemImage} />
              <Text style={userStyle.serviceListItemText} >Wash</Text>
            </View>
            {/* service 2 */}
            <View style={userStyle.serviceListItem}>
              <Image source={fold} style={userStyle.serviceListItemImage} />
              <Text style={userStyle.serviceListItemText} >Fold</Text>
            </View>
            {/* service 1 */}
            <View style={userStyle.serviceListItem}>
              <Image source={iron} style={userStyle.serviceListItemImage} />
              <Text style={userStyle.serviceListItemText} >Iron</Text>
            </View>
            {/* service 1 */}
            <View style={userStyle.serviceListItem}>
              <Image source={dry} style={userStyle.serviceListItemImage} />
              <Text style={userStyle.serviceListItemText} >Dry</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Banner here */}
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('Order')
          }}
          style={userStyle.bannerHolder}>
          <Image source={banner} style={userStyle.bannerImage} />
        </TouchableOpacity>

        {/* Recent Orders here */}
        <View style={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={userStyle.orderTitle}>
            Recent orders
          </Text>

          <Animated.View style={{transform: [{rotate: spin}] }}>
            <Icon 
              type="font-awesome"
              name="refresh"
              size={20}
              color={primaryColor}
              disabled={isLoading}
              onPress={() => dispatch(getAllOrder(userData.id))}
            />
          </Animated.View>
        </View>

      </View>
    );
  };

  //Order list render view
  const renderList = ({item, index}) => {
    let pickupTime = item.pickupDateTime.split(" ");
    return(
      <View key={index} style={userStyle.orderListHolder}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Details', {
            id: item.orderId,
          })}
          style={userStyle.orderListItem}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {item.status === 'canceled' || item.status === 'pending' ? <Icon 
              type="ionicon"
              name="checkmark-circle"
              size={40}
              color={item.status === 'pending' ? primaryColor :  red}
            />
            :
            <Image source={
              item.status === 'dispatched' ? dispatchIcon : 
              item.status === 'confirmed' ? confirmIcon : item.status === 'inProgress' ? inProgressIcon : deliveredIcon
            } resizeMode="contain" style={{ width: 40, height: 40 }} />}

            <View style={userStyle.orderListItemDetailsHolder}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={userStyle.orderText}>
                    Order #{item.orderId}
                  </Text>
                  <Text style={userStyle.orderSmallText}>({item.totalCount}items)</Text>
                </View>

                <Text style={userStyle.orderPriceText}>{`${APPCURRENCY}${formatter.format(item.amount)}`}</Text>
              </View>

              {/* order date details view */}
              <View style={userStyle.orderScheduleHolder}>
                {/* Hold pickup date and time */}
                <View style={userStyle.orderScheduleItem}>
                  <Text style={userStyle.orderScheduleItemTime}>{moment(item.pickupDateTime).tz("Africa/Lagos").format("hh:mm A")}</Text>
                  <Text style={userStyle.orderScheduleItemDate}>{moment(item.pickupDateTime).format("ddd, D MMM")}</Text>
                </View>

                {/* Hold icon to and from */}
                <Image source={toFro} resizeMode="contain" style={userStyle.orderScheduleItemToFro} />
                
                {/* Hold delivery date and time */}
                <View style={userStyle.orderScheduleItem}>
                  <Text style={userStyle.orderScheduleItemTime}>{moment(item.deliveryDateTime).tz("Africa/Lagos").format("hh:mm A")}</Text>
                  <Text style={userStyle.orderScheduleItemDate}>{moment(item.deliveryDateTime).format("ddd, D MMM")}</Text>
                </View>
              </View>
              {/* End of order date details view */}

            </View>
          </View>

          
        </TouchableOpacity>
      </View>
    );
  };

  //Update user Data
  const updateUserData = () => {
      if(personName !== '' || personPicture !== ''){
        if(personName !== '' && personName.length < 3){
          setPersonNameErr("Name can not be less than three(3) characters");
        }else{
          const body = {
            userId: userData.id,
            picture: personPicture,
            name: personName,
            base64: imageBase64,
          };
          dispatch(updateUser(body, toggleEditModal)); //Send to api
        }
      }else{
        alert('Your name or picture is required');
      }
  };

  //Get Image file from 
  const getImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if(status !== 'granted'){
      alert('Sorry, we need camera roll permissions to make this work!');
    }else{
      //now getting image
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
      if(!result.cancelled){ 
        setPersonPicture(result.uri);
        setImageBase64(`data:image/jpg;base64,${result.base64}`);
       }
    }
  };

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync(userData?.id).then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      dispatch(getNotificationsList(userData?.id));
      const { screen, name, id } = response.notification.request.content.data;
      if(screen === true){
        navigation.navigate(name, {
          id: id,
        })
      }
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={userStyle.mainContainer}>
      <StatusBar 
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <FlatList
        data={orders}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={Header}
      />

      {/* This is modal */}
      {isModal && <View style={userStyle.mainModal}>
        <View style={userStyle.mainModalBox}>
          {/* Close btn */}
          <View style={userStyle.mainModalCloseHolder}>
            <TouchableOpacity 
              onPress={toggleEditModal}
              style={userStyle.mainModalCloseIconHolder}>
              <Text style={userStyle.mainModalCloseIcon}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={userStyle.profilePicEditHolder}>
            <Avatar 
              source={personPicture !== '' ? { uri: personPicture } : noPics}
              avatarStyle={userStyle.profilePicEdit}
              size={80}
              rounded
              onPress={getImage}
            >
              <Avatar.Accessory 
                type="feather" 
                name="camera" 
                size={20} 
                color={white} 
                style={{ backgroundColor: primaryColor, width: 22, height: 22 }}
                onPress={getImage}
                />
            </Avatar>
          </View>

          <View style={userStyle.profileUpdateFormHolder}>
            <Input 
              value={personName}
              placeholder={'Fullname'}
              onChangeText={(value) => setPersonName(value)}
              errorMessage={personNameErr}
              onFocus={() => setPersonNameErr('')}
              inputStyle={userStyle.standardInput}
              inputContainerStyle={userStyle.noInputBorder}
            />

            <Input 
              value={personPhoneNumber}
              placeholder={'Phone Number'}
              disabled
              inputStyle={userStyle.standardInput}
              inputContainerStyle={userStyle.noInputBorder}
            />

            {!isLoading && <TouchableOpacity 
              onPress={updateUserData}
              style={userStyle.standardButton}
            >
              <Text style={userStyle.standardButtonText}>Save</Text>
            </TouchableOpacity>}
            {isLoading && <Button 
              loading={true} type="solid" 
              loadingProps={{ color: primaryColor }} 
              buttonStyle={{ backgroundColor: 'transparent' }} />}

          </View>
          {/* Profile form holder end here */}

        </View> 
        {/* Model white box end here */}
      </View>}

     </View>
  );
}
