import React from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { black } from '../../Theme/color';
import styles from '../../Theme/styles/user';

export default function ConfirmOrderPage({ navigation, route }) {
    const {
        selectedItems,
        totalCount,
        totalPrice
    } = route.params;
    console.log(totalCount," Items ",totalPrice," Cost");
  return (
    <View style={styles.confirmPageMain}>
        <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
        
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
                Schedule A Pickup
            </Text>

            <View />
        </View>

     </View>
  );
}
