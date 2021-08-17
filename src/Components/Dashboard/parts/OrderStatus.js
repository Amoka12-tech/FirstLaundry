import React from 'react';
import { View, Text } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { black } from '../../../Theme/color';
import styles from '../../../Theme/styles/user';
import orderStatusPng from '../../../Theme/icons/orderStatus.png';

export default function OrderStatus({ order, toggleBottomSheet }) {
  return (
    <View style={styles.bsView}>
        {/* Header */}
      <View style={styles.bsTopHeader}>
          <Text style={styles.bsTopHeaderText}>
              Order Status</Text>

          <Icon 
            type="antdesign"
            name="close"
            size={20}
            color={black}
            onPress={toggleBottomSheet}
          />
      </View>

        <View style={styles.bsItemHolder}>
            <Image source={orderStatusPng} resizeMode="cover" style={{ width: 28, height: 216 }} />

            <View style={{ display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'center', marginLeft: 10 }}>

                <View style={styles.bsItemStatusHolder}>
                    <View>
                        <Text style={styles.boldText}>Confirmed</Text>
                        <Text style={styles.regularText}>Wed, 6 Jun 2019</Text>
                    </View>

                    <Text style={styles.liteTime}>10:00PM</Text>
                </View>

                <View style={styles.addressDivider} />

                <View style={styles.bsItemStatusHolder}>
                    <View>
                        <Text style={styles.boldText}>Picked up</Text>
                        <Text style={styles.regularText}>Wed, 6 Jun 2019</Text>
                    </View>

                    <Text style={styles.liteTime}>10:00PM</Text>
                </View>

                <View style={styles.addressDivider} />

                {/* in Progress */}
                <View style={styles.bsItemStatusHolder}>
                    <View>
                        <Text style={styles.boldText}>In Progress</Text>
                        <Text style={styles.regularText}>Wed, 6 Jun 2019</Text>
                    </View>

                    <Text style={styles.liteTime}>10:00PM</Text>
                </View>

                <View style={styles.addressDivider} />

                {/* Delivered */}
                <View style={styles.bsItemStatusHolder}>
                    <View>
                        <Text style={styles.boldText}>Delivered</Text>
                        <Text style={styles.regularText}>Wed, 6 Jun 2019</Text>
                    </View>

                    <Text style={styles.liteTime}>10:00PM</Text>
                </View>

            </View>
        </View>

     </View>
  );
}
