import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAppInfo } from '../../actions/info';
import { getItems } from '../../actions/order';
import { primaryColor } from '../../Theme/color';
import styles from '../../Theme/styles/user';
import Spinner from 'react-native-loading-spinner-overlay';
import logo from '../../Theme/image/logo.png';
import { Image } from 'react-native-elements';
import { phoneCall, whatsapp } from '../../Theme/icons';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);
  const appInfo = useSelector(state => state.info);
  // console.log(appInfo);

  useEffect(() => {
    if(appInfo === null){
      dispatch(getAppInfo());
    }
  }, []);

  return (
    <View style={styles.itemMainContainer}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />

      <Spinner 
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={styles.loadingText}
            color={primaryColor}
        />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={logo} resizeMode="contain" containerStyle={{ width: 120, height: 120 }} />
        <Text>{appInfo?.office}</Text>
        <Text>{appInfo?.email}</Text>
        <TouchableOpacity 
          onPress={() => Linking.openURL(`tel:${appInfo?.phone}`)}
          style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
          <Image source={phoneCall} resizeMode="contain" containerStyle={{ width: 20, height: 20, marginRight: 5, }} />
          <Text>{appInfo?.phone}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => Linking.openURL(`whatsapp://send?text=hello&phone=${appInfo?.phone}`)}
          style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
          <Image source={whatsapp} resizeMode="contain" containerStyle={{ width: 20, height: 20, marginRight: 5, }} />
          <Text>{appInfo?.whatsapp}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(appInfo?.website)}>
          <Text>{appInfo?.website}</Text>
        </TouchableOpacity>
      </View>
     </View>
  );
}
