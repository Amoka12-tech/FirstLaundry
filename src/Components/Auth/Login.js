import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Input, Image, Icon } from 'react-native-elements';
import { authStyle } from '../../Theme/styles';
import { black, grey, primaryColor, secondaryColor, white } from '../../Theme/color';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth';
import Spinner from 'react-native-loading-spinner-overlay';

export default function LoginPage({ navigation }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberErr, setPhoneNumberErr] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [isPassVisible, setIsPassVisible] = useState(true);

    const togglePassVisible = () => setIsPassVisible(!isPassVisible);

    const onSubmit = () => {
        if(phoneNumber === ""){
            setPhoneNumberErr("*Phone number is required");
        }else if(password === ""){
            setPasswordErr("*Password is required");
        }else{
            const body = {
                phone: phoneNumber,
                passWord: password
            };
            dispatch(login(body, navigation, setIsLoading));
        }
    };
  return (
    <ScrollView 
        contentContainerStyle={authStyle.loginContainer}
        showsHorizontalScrollIndicator={false}
        >
        <Spinner 
            visible={isLoading}
            textContent={'Authenticating...'}
            textStyle={authStyle.loadingText}
            color={primaryColor}
        />
        <View style={authStyle.brandHolder}>
          <Image style={authStyle.brandLogo} resizeMode={'contain'} source={require('../../Theme/image/logo.png')} />
        </View>

        <View style={authStyle.loginFormHolder}>
            <Input 
                value={phoneNumber}
                keyboardType="phone-pad"
                onChangeText={(value) => setPhoneNumber(value)}
                inputStyle={authStyle.loginInput}
                inputContainerStyle={authStyle.noBorder}
                placeholder="Phone number"
                errorMessage={phoneNumberErr}
                onFocus={() => setPhoneNumberErr("")}
            />

            <Input 
                value={password}
                onChangeText={(value) => setPassword(value)}
                inputStyle={authStyle.loginInput}
                inputContainerStyle={authStyle.noBorder}
                placeholder="Password"
                secureTextEntry={isPassVisible}
                rightIcon={
                    <Icon 
                        type="ionicon"
                        name={isPassVisible ? "eye-off" : "eye"}
                        color={black}
                        size={20}
                        onPress={togglePassVisible}
                    />
                }
                errorMessage={passwordErr}
                onFocus={() => setPasswordErr("")}
            />

            <TouchableOpacity 
                onPress={() => navigation.navigate('Recovery')}
                style={authStyle.authLeftSideItem}>
                <Text style={authStyle.authLeftSideText}>
                    Forgot password?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={onSubmit}
                style={authStyle.authButton}>
                <Text style={authStyle.authButtonText}>Login</Text>
                <Icon 
                    type="antdesign"
                    name="arrowright"
                    size={20}
                    color={white}
                />
            </TouchableOpacity>

            <View style={authStyle.rowViewTextWithMargin}>
                <Text style={authStyle.smallBlackText}>
                    Don't have an account? 
                </Text>

                <TouchableOpacity 
                    disabled={isLoading}
                    onPress={() => navigation.navigate('Register')}
                    style={{ marginLeft: 10 }}>
                    <Text style={authStyle.smallColorText}>
                        Sign up now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
     </ScrollView>
  );
}
