import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../actions/auth';
import { black } from '../../Theme/color';
import { authStyle } from '../../Theme/styles';

export default function ChangePasswordPage({ navigation, route }) {
  const dispatch = useDispatch();
  const userId = route.params?.userId;

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(true);

  const toggleIsVisible = () => setIsPassVisible(!isPassVisible);

  const onSubmit = () => {
    if(password === ""){
      setPasswordErr("*New password is required");
    }else if(password.length < 8){
      setPasswordErr("*Password must be more than eight(8) characters")
    }else if(password !== confirmPassword){
      setConfirmPasswordErr("*Password did not match");
    }else{
      const body = {
        userId: userId,
        password: password,
      };
      dispatch(changePassword(body, navigation));
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
          Change Password
        </Text>

        <View />
      </View>

      <View style={authStyle.nextFormHolder}>
        <Text style={authStyle.bigColorText}>
          Change Password
        </Text>

        <Text style={authStyle.spanText}>
          Set a new password for your account. Always use a good combination for security purpose.
        </Text>

        <View style={{ marginBottom: 60 }} />

        {/* Email Input */}
        <Input 
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder="New password"
          secureTextEntry={isPassVisible}
          inputStyle={authStyle.loginInput}
          inputContainerStyle={authStyle.noBorder}
          errorMessage={passwordErr}
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
        />

        <TouchableOpacity 
          onPress={onSubmit}
          style={authStyle.authButton}>
          <Text style={authStyle.authButtonText}>
            Update password
          </Text>
        </TouchableOpacity>
        
      </View>
     </ScrollView>
  );
}
