import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import HomePage from '../Dashboard/HomePage';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { black, grey, offWhite, primaryColor, red, white } from '../../Theme/color';
import SearchPage from '../Dashboard/SearchPage';
import OrderPage from '../Dashboard/OrderPage';
import InvoicePage from '../Dashboard/InvoicePage';
import SettingsPage from '../Dashboard/SettingsPage';
import Svg, { Path } from "react-native-svg"
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    const isSelected = accessibilityState.selected;
    return(
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', position: isSelected ? 'relative' : 'absolute', top: 0 }}>
                <View style={{ flex: 1, backgroundColor: white }} />
                <Svg
                    width="75"
                    height="61"
                    viewBox="0 0 75 61"
                    >
                    <Path
                        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                        fill={white}
                    />
                </Svg>
                <View style={{ flex: 1, backgroundColor: white }} />
            </View>

            <TouchableOpacity 
            style={{
                top: isSelected ? 0 : -22.5,
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: white,
            }}
            onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        </View>
    );
};

export default function BottomTabs() {
  return (
    <Tab.Navigator 
        tabBarOptions={{ 
            keyboardHidesTabBar: true,
            showLabel: false,
            tabStyle: { 
                backgroundColor: white,
             },
            style: {
                borderTopWidth: 0,
                backgroundColor: 'transparent',
                elevation: 0,
            }
         }}
    >
        <Tab.Screen 
            name="Home"
            component={HomePage}
            options={{
                tabBarIcon: ({focused}) => (
                    <Icon 
                        type="antdesign"
                        name="home"
                        size={30}
                        color={focused ? primaryColor : black}
                    />
                )
            }}
        />

        <Tab.Screen 
            name="Search"
            component={SearchPage}
            options={{
                tabBarIcon: ({focused}) => (
                    <Icon 
                        type="antdesign"
                        name="search1"
                        size={30}
                        color={focused ? primaryColor : black}
                    />
                )
            }}
        />

        <Tab.Screen 
            name="Order"
            component={OrderPage}
            options={{
                tabBarIcon: ({focused}) => (
                    !focused && <Icon 
                        type="antdesign"
                        name="pluscircle"
                        size={40}
                        color={primaryColor}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarCustomButton 
                        {...props}
                    />
                ),
                tabBarVisible: false,
            }}
        />

        <Tab.Screen 
            name="Notification"
            component={InvoicePage}
            options={{
                tabBarIcon: ({focused}) => (
                    <Icon 
                        type="feather"
                        name="bell"
                        size={30}
                        color={focused ? primaryColor : black}
                    />
                )
            }}
        />

        <Tab.Screen 
            name="Settings"
            component={SettingsPage}
            options={{
                tabBarIcon: ({focused}) => (
                    <Icon 
                        type="antdesign"
                        name="setting"
                        size={30}
                        color={focused ? primaryColor : black}
                    />
                )
            }}
        />

    </Tab.Navigator>
  );
}
