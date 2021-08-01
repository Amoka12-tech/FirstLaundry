import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { primaryColor, white } from '../Theme/color';
import { authStyle } from '../Theme/styles';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions/user';
import Spinner from 'react-native-loading-spinner-overlay';

const LandingPage = ({ navigation }) => {

    const [page, setPage] = useState(1);

    //for next
    const swipeLeft = () => {
        if(page === 1 || page < 3){
            setPage(page+1);
        }else if(page === 3){
            navigation.navigate('Login');
        }
    };

    //For previous
    const swipeRight = () => {
        if(page !== 1 && page <= 3){
            setPage(page-1);
        }
    };

    //Go to login
    const goToLogin = () => {
        navigation.navigate('Login');
    };
    return(
        <View style={authStyle.landingContainer}>
            <StatusBar translucent={true} backgroundColor={"transparent"}  barStyle='dark-content' />

            <View style={authStyle.brandHolderLanding}>
                <Image style={authStyle.brandLogo} source={require('../Theme/image/logo.png')} />
                <Text style={authStyle.brandTitle}>First Laundry</Text>
            </View>
            
            <GestureRecognizer 
                style={authStyle.captionHolder}
                onSwipeLeft={swipeLeft}
                onSwipeRight={swipeRight}
                >
                {/* Slide 1 */}
                {page === 1 && <View style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={authStyle.captionImage} source={require('../Theme/image/laundryFav1.jpg')} />
                    <Text style={authStyle.captionHeading}> 
                        Perfect Equipment 
                    </Text>
                    <Text style={authStyle.captionText}>
                        Our machines are built to work together as complete laundry systems that provide the highest energy, time, and money savings at every stage in the industrial and coin-op laundry processes.
                    </Text>

                    <View style={authStyle.dotHolder}>
                        <View style={authStyle.dotActive} />
                        <View style={authStyle.dot} />
                        <View style={authStyle.dot} />
                    </View>
                </View>}

                {/* Slide 2 */}
                {page === 2 && <View style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={authStyle.captionImageLong} source={require('../Theme/image/laundryFav3.jpg')} />
                    <Text style={authStyle.captionHeading}> 
                        Your Convenience 
                    </Text>
                    <Text style={authStyle.captionText}>
                        Our fast and easy online ordering process and our convenient At-Your-Door and Drop Box pick-up and delivery options give you more time to do the things you love.
                    </Text>

                    <View style={authStyle.dotHolder}>
                        <View style={authStyle.dot} />
                        <View style={authStyle.dotActive} />
                        <View style={authStyle.dot} />
                    </View>
                </View>}

                {/* Slide 3 */}
                {page === 3 && <View style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={authStyle.captionImage} source={require('../Theme/image/laundryFav2.jpg')} />
                    <Text style={authStyle.captionHeading}> 
                        Professional Work
                    </Text>
                    <Text style={authStyle.captionText}>
                        We consider our customers a part of our family, which is why we take the utmost care with your garments and ensure complete satisfaction from pick up to drop off.
                    </Text>

                    <View style={authStyle.dotHolder}>
                        <View style={authStyle.dot} />
                        <View style={authStyle.dot} />
                        <View style={authStyle.dotActive} />
                    </View>
                </View>}
            </GestureRecognizer>

            <View style={authStyle.footerHolder}>
                <TouchableOpacity onPress={goToLogin}>
                    <Text style={authStyle.footerLeft}>
                        Skip
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={swipeLeft} style={authStyle.footerRight}>
                    <Icon 
                        type="antdesign"
                        name="arrowright"
                        size={30}
                        color={white}
                    />
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

export default LandingPage;