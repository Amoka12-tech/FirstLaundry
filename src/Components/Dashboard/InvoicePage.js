import React, { useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsList } from '../../actions/notifications';
import { black } from '../../Theme/color';
import styles from '../../Theme/styles/user';

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
      <View>
        <Text>Here</Text>
      </View>
    );
  };

  return (
    <View style={styles.itemMainContainer}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      
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
