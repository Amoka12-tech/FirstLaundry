import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './src/Components/Landing';
import LoginPage from './src/Components/Auth/Login';
import { 
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
 } from '@expo-google-fonts/poppins';
import HomePage from './src/Components/Dashboard/HomePage';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import VerifyPage from './src/Components/Auth/VerifyPage';
import RegisterPage from './src/Components/Auth/Register';
import RecoverPage from './src/Components/Auth/RecoverPage';
import ChangePasswordPage from './src/Components/Auth/ChangePassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

 const MainStack = createStackNavigator();

export default function App() {
  let [fontLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkStore = () => {
    const reduxState = store.getState();
    const loggedIn = reduxState.auth.isLoggedIn;
    const nLoading = reduxState.auth.isLoading;
    setIsLoggedIn(loggedIn);
    setIsLoading(nLoading);
  };

  store.subscribe(checkStore);

  const authScreen = {
    Landing: LandingPage,
    Login: LoginPage,
    Verify: VerifyPage,
    Register: RegisterPage,
    Recovery: RecoverPage,
    NewPassword: ChangePasswordPage
  };

  const privateScreen = {
    Home: HomePage
  };

  const [firstCall, setFirstCall] = useState(0);

  useEffect(() => {
    async () => {
      if(firstCall === 0){
        const userData = await AsyncStorage.getItem("@user");
        if(!!userData){
          setIsLoggedIn(true);
        }
      }
      setFirstCall(firstCall + 1);
    }
  }, []);

  if(!fontLoaded){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }else{
    return (
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <MainStack.Navigator screenOptions={{ headerShown: false }}>
              {Object.entries({
                      ...(isLoggedIn? privateScreen : authScreen),
                    }).map(([name, component], index) => (
                      <MainStack.Screen key={index} name={name} component={component} />
                    ))}
            </MainStack.Navigator>
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    );
  }
};
