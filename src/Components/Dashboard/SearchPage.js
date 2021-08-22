import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { userStyle } from '../../Theme/styles';
import { FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { Icon, Image, Input } from 'react-native-elements';
import { black, blue, green, grey, orange, primaryColor, red, white } from '../../Theme/color';

import { toFro, confirmIcon, dispatchIcon, inProgressIcon, deliveredIcon } from '../../Theme/icons';
import moment from 'moment-timezone';
import 'intl'
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import { APPCURRENCY } from '../../../config';

export default function SearchPage({ navigation }) {

  const isLoading = useSelector(state => state.auth.isLoading);
  const orders = useSelector(state => state.orders);

  const [ordersList, setOrdersList] = useState(orders);

  const formatter = new Intl.NumberFormat('en-US');

  const headerView = () => {
    return(
      <View style={userStyle.topNavHolder}>
        <Input placeholder="Search Order with ID" placeholderTextColor={grey} />
      </View>
    )
  };

  //Order list render view
  const renderList = ({item, index}) => {
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

  return (
    <View style={userStyle.mainContainer}>
        <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />

        <FlatList 
          data={ordersList}
          renderItem={renderList}
          ListHeaderComponent={headerView}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
     </View>
  );
}
