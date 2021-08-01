import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { recover } from '../../actions/auth';
import { black } from '../../Theme/color';
import { authStyle } from '../../Theme/styles';

export default function RecoverPage({ navigation }) {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberErr, setPhoneNumberErr] = useState("");

  const onSubmit = () => {
    if(phoneNumber === ""){
      setPhoneNumberErr("*Phone number is required");
    }else{
      const body = {
        phone: phoneNumber
      };
      dispatch(recover(body, navigation));
    }
  };
  return (
    <ScrollView 
      contentContainerStyle={authStyle.normalContainer} 
      showsVerticalScrollIndicator={false}
      >
      <View style={authStyle.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon 
            type="antdesign"
            name="arrowleft"
            color={black}
            size={30}
          />
        </TouchableOpacity>

        <Text style={authStyle.topHeaderText}>
          Recover account
        </Text>

        <View />
      </View>

      <View style={authStyle.nextFormHolder}>
        <Text style={authStyle.bigColorText}>
          Create a New Account
        </Text>

        <Text style={authStyle.spanText}>
          Create an account so you can manage your personal laundry orders.
        </Text>

        <View style={{ marginBottom: 60 }} />

        {/* Email Input */}
        <Input 
          value={phoneNumber}
          onChangeText={(value) => setPhoneNumber(value)}
          placeholder="Phone number"
          keyboardType="phone-pad"
          inputStyle={authStyle.loginInput}
          inputContainerStyle={authStyle.noBorder}
          errorMessage={phoneNumberErr}
          onFocus={() => setPhoneNumberErr("")}
        />

        <TouchableOpacity 
          onPress={onSubmit}
          style={authStyle.authButton}>
          <Text style={authStyle.authButtonText}>
            Recover Account
          </Text>
        </TouchableOpacity>
        
      </View>
     </ScrollView>
  );
}
