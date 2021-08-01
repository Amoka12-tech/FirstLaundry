import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { View, Text } from 'react-native';
import { Avatar, Icon, Image } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import { black, blue, green, orange, primaryColor } from '../../Theme/color';
import { userStyle } from '../../Theme/styles';

import wash from '../../Theme/icons/wash.png';
import fold from '../../Theme/icons/fold.png';
import iron from '../../Theme/icons/iron.png';
import dry from '../../Theme/icons/dry.png';
import banner from '../../Theme/icons/Banner.png';
import toFro from '../../Theme/icons/line.png';

export default function HomePage() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.user);

  const [isModal, setIsModal] = useState(false);
  const toggleEditModal = () => setIsModal(!isModal);

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
              source={require('../../Theme/image/noPics.png')}
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
    return(
      <View style={userStyle.orderListHolder}>
        <TouchableOpacity style={userStyle.orderListItem}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Icon 
              type="ionicon"
              name="checkmark-circle"
              size={40}
              color={index === 0 ? green : 
                index === 1 ? orange : blue}
            />

            <View style={userStyle.orderListItemDetailsHolder}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={userStyle.orderText}>
                  Order #1234 
                </Text>
                <Text style={userStyle.orderSmallText}>(2bags)</Text>
              </View>

              {/* order date details view */}
              <View style={userStyle.orderScheduleHolder}>
                {/* Hold pickup date and time */}
                <View style={userStyle.orderScheduleItem}>
                  <Text style={userStyle.orderScheduleItemTime}>10:00</Text>
                  <Text style={userStyle.orderScheduleItemDate}>Thur, 1 Apr</Text>
                </View>

                {/* Hold icon to and from */}
                <Image source={toFro} resizeMode="contain" style={userStyle.orderScheduleItemToFro} />
                
                {/* Hold delivery date and time */}
                <View style={userStyle.orderScheduleItem}>
                  <Text style={userStyle.orderScheduleItemTime}>10:00</Text>
                  <Text style={userStyle.orderScheduleItemDate}>Sat, 3 Apr</Text>
                </View>
              </View>
              {/* End of order date details view */}

            </View>
          </View>

          <Text style={userStyle.orderPriceText}>N5,200</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={userStyle.mainContainer}>
      <StatusBar 
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <FlatList
        data={orderData}
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

          <Text>Edit User form coming here...</Text>

        </View>
      </View>}

     </View>
  );
}
