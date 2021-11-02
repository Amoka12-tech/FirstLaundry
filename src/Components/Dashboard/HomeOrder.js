import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../../Theme/styles/user';
import { Icon } from 'react-native-elements';
import { black } from '../../Theme/color';

export default function HomeOrder({ navigation }) {
    const Stack = createStackNavigator();

    //Top header
  const Header = () => {
    return(<View style={styles.topNavHolder}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon 
            type="antdesign"
            name="arrowleft"
            color={black}
            size={30}
          />
      </TouchableOpacity>

      <Text style={styles.topNavText}>
        Home Details
      </Text>

      <View />
    </View>);
  };
  

    const Cleaning = ({ navigation }) => {
        return(
            <View style={styles.itemMainContainer}>
                <Header />
                <View style={{ flex: 1 }}>
                    <Text>Cleaning!</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.standardButton}>
                        <Text style={styles.standardButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    return (
        <Stack.Navigator>
            <Stack.Screen name="Cleaning" component={Cleaning} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
