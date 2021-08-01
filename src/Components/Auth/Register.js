import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/auth';
import { black, primaryColor } from '../../Theme/color';
import { authStyle } from '../../Theme/styles';
import Spinner from 'react-native-loading-spinner-overlay';

export default function RegisterPage({ navigation }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberErr, setPhoneNumberErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const [isPassVisible, setIsPassVisible] = useState(true);
  const toggleIsVisible = () => setIsPassVisible(!isPassVisible);

  const onSubmit = () => {
    if(phoneNumber === "" || phoneNumber.length < 11){
      setPhoneNumberErr("*Phone number is required");
    }else if(password === ""){
      setPasswordErr("*Password is required");
    }else if(password.length < 8){
      setPasswordErr("*Password should not be less than eight(8) character");
    }else if(password !== confirmPassword){
      setConfirmPasswordErr("*Password not matched");
    }else{
      const body = {
        phone: phoneNumber,
        passWord: password
      };
      dispatch(register(body, navigation));
    }
  };
  return (
    <ScrollView
      contentContainerStyle={authStyle.normalContainer} 
      showsVerticalScrollIndicator={false}
      >
      <Spinner 
        visible={isLoading}
        textContent={'Creating account...'}
        textStyle={authStyle.loadingText}
        color={primaryColor}
      />
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
          Register account
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

        <Input 
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder="New password"
          secureTextEntry={isPassVisible}
          inputStyle={authStyle.loginInput}
          inputContainerStyle={authStyle.noBorder}
          errorMessage={passwordErr}
          onFocus={() => setPasswordErr("")}
          rightIcon={
            <Icon 
              type="ionicon"
              name={isPassVisible ? "eye-off" : "eye"}
              size={20}
              color={black}
              onPress={toggleIsVisible}
            />
          }
        />

        <Input 
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
          placeholder="Confirm New password"
          secureTextEntry={isPassVisible}
          inputStyle={authStyle.loginInput}
          inputContainerStyle={authStyle.noBorder}
          errorMessage={confirmPasswordErr}
          onFocus={() => setConfirmPasswordErr("")}
        />

        <TouchableOpacity 
          onPress={onSubmit}
          style={authStyle.authButton}>
          <Text style={authStyle.authButtonText}>
            Create Account
          </Text>
        </TouchableOpacity>
        
      </View>
     </ScrollView>
  );
}
