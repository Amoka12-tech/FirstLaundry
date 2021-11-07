import React, { useEffect, useRef } from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import styles from '../../Theme/styles/user';
import { Paystack } from 'react-native-paystack-webview';
import { linkApi, PAY_STACK_KEY, PAY_STACK_SECRET } from '../../../config';
import { Icon } from 'react-native-elements';
import { black } from '../../Theme/color';
import { useDispatch, useSelector } from 'react-redux';
import { successPayment } from '../../actions/payment';
import { WebView } from 'react-native-webview';

export default function PaymentPage({ navigation, route }) {
    const { amount } = route.params;
    const dispatch = useDispatch();
    const webviewbridge = useRef();
    const userData = useSelector(state => state.auth.user);

    // useEffect(() => {
    //   setTimeout(() => {
    //     webviewbridge.current.sendToBridge(JSON.stringify({email: 'amokamutalib@gmail.com', amount: amount}));
    //   }, 5000);
    // }, []);
  return (
    <View style={styles.payment_main}>
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
                Make Payment
            </Text>

            <View />
        </View>
        
        <WebView 
          ref={webviewbridge}
          source={{ uri: `${linkApi}/paymentHtml/index.html?amount=${amount}&email=${userData?.email}` }}
          onMessage={(event) => {
            const data = JSON.parse(event.nativeEvent.data);
            if(data.status === 'success'){
              alert(data.status);
                  dispatch(successPayment(data));
                  navigation.goBack();
            }else{
              alert('Transaction not completed, incase you are debited contact admin +2348034329120');
              navigation.goBack();
            }

          }}
        />

     </View>
  );
}
