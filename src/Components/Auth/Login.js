import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Input, Image } from 'react-native-elements';
import style from '../../style';
import { black, grey, secondaryColor } from '../../Theme/color';

export default function LoginPage() {
  return (
    <View style={style.loginContainer}>
      <View style={style.topLoginContainer}>
      </View>
      <View style={style.loginFormHolder}>
          <Text style={style.loginTitle}>Authentification</Text>
          <View style={{ height: 4, width: 160, marginTop: 10, backgroundColor: secondaryColor }} />

            <Input 
                containerStyle={{ marginTop: 20, marginBottom: -10 }}
                inputContainerStyle={style.loginInput}
                inputStyle={{ color: secondaryColor }}
                label='Email'
                labelStyle={{ color: secondaryColor }}
                placeholder='Enter your email'
                placeholderTextColor={secondaryColor}
            />

            <Input 
                containerStyle={{ marginTop: 10, marginBottom: -10, }}
                inputContainerStyle={style.loginInput}
                inputStyle={{ color: secondaryColor }}
                label='Password'
                labelStyle={{ color: secondaryColor }}
                placeholder='Enter password'
                placeholderTextColor={secondaryColor}
            />
            <View style={style.floatLeft}>
                <TouchableOpacity>
                    <Text style={{ color: secondaryColor }}>Forgot Password</Text>
                </TouchableOpacity>
            </View>

            <View style={style.bottomAuthBtnHolder}>
                <TouchableOpacity style={style.authBtn_primary}>
                    <Text style={style.authBtnText_secondary}>
                        SIGNUP
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.authBtn_secondary}>
                    <Text style={style.authBtnText_primary}>
                        LOGIN
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={style.authBottomHolder}>
                <Text style={{ fontSize: 14 }}>
                    - or login with -
                </Text>

                <View style={style.authSocialHolder}>
                    <TouchableOpacity style={{ marginRight: 40, width: 30, height: 30 }}>
                        <Image style={{ width: 30, height: 30 }} source={require('../../Theme/icons/search.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 30, height: 30 }}>
                        <Image style={{ width: 30, height: 30 }} source={require('../../Theme/icons/facebook.png')} />
                    </TouchableOpacity>
                </View>

                <View style={style.otherAuthOption}>
                    <Text style={{ color: grey, fontSize: 11 }} >Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text style={{ color: black, fontFamily: 'Poppins_400Regular', fontWeight: '400' }}> SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
      </View>
     </View>
  );
}
