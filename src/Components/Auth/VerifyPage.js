import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { resendOtp, verify } from '../../actions/auth';
import { black, primaryColor } from '../../Theme/color';
import { authStyle } from '../../Theme/styles';
import Spinner from 'react-native-loading-spinner-overlay';

export default function VerifyPage({ navigation, route }) {
  const dispatch = useDispatch();
  //Expect param id and page([regiser, recover])
  const { userId, page } = route.params;

  const isLoading = useSelector(state => state.auth.isLoading);
  const userData = useSelector(state => state.auth.user);

  const [digitOne, setDigitOne] = useState("");
  const [digitTwo, setDigitTwo] = useState("");
  const [digitThree, setDigitThree] = useState("");
  const [digitFour, setDigitFour] = useState("");
  const [digitFive, setDigitFive] = useState("");
  const [digitSix, setDigitSix] = useState("");

  const d1Ref = React.createRef();
  const d2Ref = React.createRef();
  const d3Ref = React.createRef();
  const d4Ref = React.createRef();
  const d5Ref = React.createRef();
  const d6Ref = React.createRef();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = () => {
    if(digitOne === "" || digitTwo === "" || digitThree === "" || digitFour === "" || digitFive === "" || digitSix === ""){
      setErrorMessage("Six digit code is expected for a complete OTP")
    }else{
      const body = {
        id: userId,
        code: digitOne+digitTwo+digitThree+digitFour+digitFive+digitSix,
      };
      // console.log(userId);
      dispatch(verify(body, page, navigation));
    }
  };

  const resendCode = () => {
    if(userData != null){
      const body = {
        id: userData?.id,
        phone: userData?.phone,
        email: userData?.email,
      };
      // console.log(body);
      dispatch(resendOtp(body));
    }else{
      alert('You lost your current session, login again and try resend');
      navigation.goBack();
    }
    
  };
  return (
    <ScrollView 
      contentContainerStyle={authStyle.normalContainer} 
      showsVerticalScrollIndicator={false}
      >
      <Spinner 
        visible={isLoading}
        textContent={'Verifing account...'}
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
          Verification Code
        </Text>

        <View />
      </View>

      <View style={authStyle.nextFormHolder}>
        <Text style={authStyle.bigColorText}>
          OTP
        </Text>

        <Text style={authStyle.spanText}>
          OTP has seen to your registed phone number. Please verify.
        </Text>

        <View style={{ marginBottom: 40 }} />

        {/* OTP Input */}
        <View style={authStyle.nextCenterFormHolder}>
          <View style={authStyle.singleInputHolder}>
            <Input 
              ref={d1Ref}
              value={digitOne}
              onChangeText={(value) => {
                setDigitOne(value);
                  value !== "" && d2Ref.current.focus();
                
              }}
              keyboardType="number-pad"
              maxLength={1}
              onFocus={() => setErrorMessage("")}
              containerStyle={authStyle.singleInputCont}
              inputStyle={authStyle.singleInput}
              inputContainerStyle={authStyle.noBorderSingle}
            />

            <Input 
              ref={d2Ref}
              value={digitTwo}
              onChangeText={(value) => {
                setDigitTwo(value);
                value !== "" && d3Ref.current.focus();
                
              }}
              maxLength={1}
              keyboardType="number-pad"
              onFocus={() => setErrorMessage("")}
              containerStyle={authStyle.singleInputCont}
              inputStyle={authStyle.singleInput}
              inputContainerStyle={authStyle.noBorderSingle}
            />

            <Input 
              ref={d3Ref}
              value={digitThree}
              onChangeText={(value) => {
                setDigitThree(value);
                value !== "" && d4Ref.current.focus();
                
              }}
              maxLength={1}
              keyboardType="number-pad"
              onFocus={() => setErrorMessage("")}
              containerStyle={authStyle.singleInputCont}
              inputStyle={authStyle.singleInput}
              inputContainerStyle={authStyle.noBorderSingle}
            />

            <Input 
              ref={d4Ref}
              value={digitFour}
              onChangeText={(value) => {
                setDigitFour(value);
                value !== "" && d5Ref.current.focus();
                
              }}
              maxLength={1}
              keyboardType="number-pad"
              onFocus={() => setErrorMessage("")}
              containerStyle={authStyle.singleInputCont}
              inputStyle={authStyle.singleInput}
              inputContainerStyle={authStyle.noBorderSingle}
            />

            <Input 
              ref={d5Ref}
              value={digitFive}
              onChangeText={(value) => {
                setDigitFive(value);
                value !== "" && d6Ref.current.focus();
                
              }}
              maxLength={1}
              keyboardType="number-pad"
              onFocus={() => setErrorMessage("")}
              containerStyle={authStyle.singleInputCont}
              inputStyle={authStyle.singleInput}
              inputContainerStyle={authStyle.noBorderSingle}
            />
            
            <Input 
              ref={d6Ref}
              value={digitSix}
              onChangeText={(value) => {
                setDigitSix(value);
              }}
              maxLength={1}
              keyboardType="number-pad"
              onFocus={() => setErrorMessage("")}
              containerStyle={authStyle.singleInputCont}
              inputStyle={authStyle.singleInput}
              inputContainerStyle={authStyle.noBorderSingle}
            />
          </View>

          <Text style={authStyle.errorText}>
            {errorMessage}
          </Text>


          <View style={authStyle.rowViewText}>
            <Text style={authStyle.smallBlackText}>
              Didn’t recieved OTP ? 
            </Text>

            <TouchableOpacity onPress={resendCode} style={{ marginLeft: 5 }}>
              <Text style={authStyle.smallColorText}>
                Send again
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          onPress={onSubmit}
          style={authStyle.authButton}>
          <Text style={authStyle.authButtonText}>
            Verify Account
          </Text>
        </TouchableOpacity>
        
      </View>
     </ScrollView>
  );
}
