import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import { userStyle } from '../../Theme/styles';

export default function HomePage() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.user);
  return (
    <View style={userStyle.mainContainer}>
      <Text>Hello</Text>
      <TouchableOpacity onPress={() => dispatch(logout())}>
        <Text>Logout</Text>
      </TouchableOpacity>
     </View>
  );
}
