import React from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import style from '../style';

const LandingPage = ({ navigation }) => {
    const getStarted = () => {
        navigation.navigate('Login');
    };
    return(
        <View style={style.landingContainer}>
            <StatusBar hidden={true} />
            {/* Brand Holder */}
            <View style={style.brandHolder}>
                <Image  
                    style={style.brandLogo}
                    source={require('../Theme/image/logo.png')} />
                <Text style={style.brandTitle}>
                    FirstLaundry
                </Text>
            </View>

            {/* Caption Holder */}
            <View style={style.captionHolder}>
                <Text style={style.captionText}>
                    Laundry for Everyone
                </Text>
                <Image 
                    style = {style.captionImage}
                    source = {require('../Theme/image/saly.png')} />
            </View>

            <TouchableOpacity 
                onPress={getStarted}
                style={style.getStarted}>
                <Text style={style.getStartedText}>
                    Get started
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LandingPage;