import React, { useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsList } from '../../actions/notifications';
import { black, primaryColor, red, white } from '../../Theme/color';
import styles from '../../Theme/styles/user';
import Spinner from 'react-native-loading-spinner-overlay';
import { confirmIcon, dispatchIcon, inProgressIcon, deliveredIcon } from '../../Theme/icons';
import moment from 'moment-timezone';

export default function InvoicePage({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.user);
  const notifications = useSelector(state => state.notifications);

  const isLoading = useSelector(state => state.auth.isLoading);

  let effectUse = 0;
  useEffect(() => {
    dispatch(getNotificationsList(userData?.id));
  }, []);

  const headerView = () => {
    return(
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
          Orders Detail
        </Text>

        <View />
      </View>
    )
  };

  const listView = ({item, index}) => {
    return(
      <TouchableOpacity 
        onPress={() => navigation.navigate('Details', {
          id: item.orderId,
        })}
        key={index} style={styles.singleNotHolder}>
        
        {item.type === 'pending' || item.type === 'canceled'? 
          <Icon 
            type="ionicon"
            name="checkmark-circle"
            size={40}
            color={item.type === 'pending' ? primaryColor : red}
          />
        : <Image source={
          item.type === 'dispatched' ? dispatchIcon : 
          item.type === 'confirmed' ? confirmIcon : item.type === 'inProgress' ? inProgressIcon : deliveredIcon
        } resizeMode="contain" style={{ width: 40, height: 40 }} />}

        <View style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%', }}>
          <Text style={styles.singleNotBigText}>
            {`#${item.orderId} Order`}
          </Text>
          <Text style={styles.singleNotSmallText}>
            {item.message}
          </Text>
        </View>

        <Text style={styles.singleNotDays}>
          {moment(item.date).tz("Africa/Lagos").fromNow()}
        </Text>

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.itemMainContainer}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />

      <Spinner 
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={styles.loadingText}
            color={primaryColor}
        />
      
      <FlatList 
        data={notifications}
        renderItem={listView}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={headerView}
        showsVerticalScrollIndicator={false}
      />

     </View>
  );
}
