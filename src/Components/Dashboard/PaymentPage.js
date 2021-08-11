import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import styles from '../../Theme/styles/user';
import { Paystack } from 'react-native-paystack-webview';
import { PAY_STACK_KEY, PAY_STACK_SECRET } from '../../../config';
import { Icon } from 'react-native-elements';
import { black } from '../../Theme/color';
import { useDispatch } from 'react-redux';
import { successPayment } from '../../actions/payment';

export default function PaymentPage({ navigation, route }) {
    const { amount } = route.params;
    const dispatch = useDispatch();
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
                Schedule A Pickup
            </Text>

            <View />
        </View>
        
        <View style={{ flex: 1 }}>
            <Paystack 
                buttonText="Pay Now"
                showPayButton={true}
                paystackKey={PAY_STACK_KEY}
                paystackSecretKey={PAY_STACK_SECRET}
                amount={amount}
                billingEmail="amokamutalibfut@gmail.com"
                billingMobile="08034329120"
                billingName="Smart Laundry"
                activityIndicatorColor="green"
                channel={["card", "bank"]}
                onCancel={(e) => {
                  // handle response here
                  alert("Transaction is "+e.status);
                  navigation.goBack();
                }}
                onSuccess={(res) => {
                  // handle response here
                  alert(res.status);
                  dispatch(successPayment(res.transactionRef));
                  navigation.goBack();
                }}
                autoStart={true}
            />
        </View>
     </View>
  );
}
