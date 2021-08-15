import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { View, Text } from 'react-native';
import { Avatar, Button, Icon, Image, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import { black, blue, green, orange, primaryColor, red, white } from '../../Theme/color';
import { userStyle } from '../../Theme/styles';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import wash from '../../Theme/icons/wash.png';
import fold from '../../Theme/icons/fold.png';
import iron from '../../Theme/icons/iron.png';
import dry from '../../Theme/icons/dry.png';
import banner from '../../Theme/icons/Banner.png';
import toFro from '../../Theme/icons/line.png';
import noPics from '../../Theme/image/noPics.png';
import { updateUser } from '../../actions/user';
import { getAllOrder, getOrder } from '../../actions/order';
import moment from 'moment';
import 'intl'
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import { APPCURRENCY } from '../../../config';

export default function HomePage({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.user);

  const isLoading = useSelector(state => state.auth.isLoading);
  const orders = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getAllOrder(userData?.id));
    console.log('here');
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

  const orderData = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

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
        <View style={userStyle.servicesHolder}>
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
        </View>

        {/* Banner here */}
        <View style={userStyle.bannerHolder}>
          <Image source={banner} style={userStyle.bannerImage} />
        </View>

        {/* Recent Orders here */}
        <Text style={userStyle.orderTitle}>
          Recent orders
        </Text>

      </View>
    );
  };

  //Order list render view
  const renderList = ({item, index}) => {
    let pickupTime = item.pickupDateTime.split(" ");
    return(
      <View style={userStyle.orderListHolder}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Details', {
            id: item.orderId,
          })}
          style={userStyle.orderListItem}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Icon 
              type="ionicon"
              name="checkmark-circle"
              size={40}
              color={item.status === 'pending' ? red : 
                item.status === 'dispatched' ? primaryColor :
                item.status === 'canceled' ? red : 
                item.status === 'inProgress' ? orange : blue}
            />

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
                  <Text style={userStyle.orderScheduleItemTime}>{moment(item.pickupDateTime).format("hh:MMA")}</Text>
                  <Text style={userStyle.orderScheduleItemDate}>{moment(item.pickupDateTime).format("ddd, D MMM")}</Text>
                </View>

                {/* Hold icon to and from */}
                <Image source={toFro} resizeMode="contain" style={userStyle.orderScheduleItemToFro} />
                
                {/* Hold delivery date and time */}
                <View style={userStyle.orderScheduleItem}>
                  <Text style={userStyle.orderScheduleItemTime}>{moment(item.deliveryDateTime).format("hh:MMA")}</Text>
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
