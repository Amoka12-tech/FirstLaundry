import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAppInfo } from '../../actions/info';
import { getItems } from '../../actions/order';
import { primaryColor } from '../../Theme/color';
import styles from '../../Theme/styles/user';
import Spinner from 'react-native-loading-spinner-overlay';

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
        <Text>{appInfo?.appName}</Text>
        <Text>{appInfo?.office}</Text>
        <Text>{appInfo?.email}</Text>
        <Text>{appInfo?.phone}</Text>
        <Text>{appInfo?.whatsapp}</Text>
        <Text>{appInfo?.website}</Text>
      </View>
     </View>
  );
}
