import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions/order';

export default function OrderDetails({ navigation, route }) {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.user);
    const orders = useSelector(state => state.orders);
    
    const { id } = route.params;
    let order = orders.filter((item) => item.orderId === id);

    useEffect(() => {
        dispatch(getOrder(userData.id, id));
    }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>#{order[0].orderId}</Text>
     </View>
  );
}
