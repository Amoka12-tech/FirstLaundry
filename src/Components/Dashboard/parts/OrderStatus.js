import React from 'react';
import { View, Text } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { black } from '../../../Theme/color';
import styles from '../../../Theme/styles/user';
import orderProcessingPng from '../../../Theme/icons/orderProcessing.png';
import orderPickedPng from '../../../Theme/icons/orderPicked.png';
import orderConfirmedPng from '../../../Theme/icons/orderConfirmed.png';
import orderDeliveredPng from '../../../Theme/icons/orderDelivered.png';
import orderPendingPng from '../../../Theme/icons/primary.png';
import orderCancelPng from '../../../Theme/icons/red.png';
import moment from 'moment-timezone';

export default function OrderStatus({ order, toggleBottomSheet }) {
    const orderStatus = order?.status;
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
            <View style={{ display: 'flex', flexDirection: 'column', width: 28, alignItems: 'center' }}>
                <Image source={orderPendingPng} resizeMode="contain" style={{ width: 28, height: 62.6 }} />

                {orderStatus === 'canceled' && order?.completedDate !== null && <Image source={orderCancelPng} resizeMode="contain" style={{ width: 28, height: 62.6 }} />}

                {order?.confirmationDate !== null && <Image source={orderConfirmedPng} resizeMode="contain" style={{ width: 28, height: 62.6 }} />}

                {order?.dispatcherDate !== null && <Image source={orderPickedPng} resizeMode="contain" style={{ width: 28, height: 62.6 }} />}

                {order?.inProgressDate !== null &&<Image source={orderProcessingPng} resizeMode="contain" style={{ width: 28, height: 62.6 }} />}

                {orderStatus === 'delivered' && order?.completedDate !== null && <Image source={orderDeliveredPng} resizeMode="contain" style={{ width: 28, height: 28 }} />}
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'center', marginLeft: 10 }}>

                <View style={styles.bsItemStatusHolder}>
                    <View>
                        <Text style={styles.boldText}>
                            {'Pending'}
                        </Text>
                        <Text style={styles.regularText}>
                            {moment(order?.orderDate).format("ddd, D MMM YYYY")}
                        </Text>
                    </View>

                    <Text style={styles.liteTime}>
                    {moment(order?.orderDate).tz("Africa/Lagos").format("hh:mm A")}
                    </Text>
                </View>

                {orderStatus === 'canceled' && order?.completedDate !== null && <View style={styles.addressDivider} />}

                {orderStatus === 'canceled' && order?.completedDate !== null && <View style={styles.bsItemStatusHolder}>
                    <View>
                        <Text style={styles.boldText}>
                            {'Canceled'}
                        </Text>
                        <Text style={styles.regularText}>
                            {moment(order?.completedDate).format("ddd, D MMM YYYY")}
                        </Text>
                    </View>

                    <Text style={styles.liteTime}>
                    {moment(order?.completedDate).tz("Africa/Lagos").format("hh:mm A")}
                    </Text>
                </View>}

                {order?.confirmationDate !== null && <View style={styles.addressDivider} />}

                {order?.confirmationDate !== null && <View style={styles.bsItemStatusHolder}>
                    <View>
                        <Text style={styles.boldText}>
                            {'Confirmed'}
                        </Text>
                        <Text style={styles.regularText}>
                            {moment(order?.confirmationDate).format("ddd, D MMM YYYY")}
                        </Text>
                    </View>

                    <Text style={styles.liteTime}>
                    {moment(order?.confirmationDate).tz("Africa/Lagos").format("hh:mm A")}
                    </Text>
                </View>}

                {order?.dispatcherDate !== null && <View style={styles.addressDivider} />}

                {order?.dispatcherDate !== null && <View style={styles.bsItemStatusHolder}>
                    <View>
                        <Text style={styles.boldText}>Picked up</Text>
                        <Text style={styles.regularText}>
                            {moment(order?.dispatcherDate).format("ddd, D MMM YYYY")}
                        </Text>
                    </View>

                    <Text style={styles.liteTime}>
                        {moment(order?.dispatcherDate).tz("Africa/Lagos").format("hh:mm A")}
                    </Text>
                </View>   
                }

                {order?.inProgressDate !== null && <View style={styles.addressDivider} />}

                {/* in Progress */}
                {order?.inProgressDate !== null && <View style={styles.bsItemStatusHolder}>
                    <View>
                        <Text style={styles.boldText}>In Progress</Text>
                        <Text style={styles.regularText}>
                            {moment(order?.inProgressDate).format("ddd, D MMM, YYYY")}
                        </Text>
                    </View>

                    <Text style={styles.liteTime}>
                        {moment(order?.inProgressDate).tz("Africa/Lagos").format("hh:mm A")}
                    </Text>
                </View>}

                {orderStatus === 'delivered' && order?.completedDate !== null && <View style={styles.addressDivider} />}

                {/* Delivered */}
                {orderStatus === 'delivered' && order?.completedDate !== null && <View style={styles.bsItemStatusHolder}>
                    <View>
                        <Text style={styles.boldText}>Delivered</Text>
                        <Text style={styles.regularText}>
                            {moment(order?.completedDate).format("ddd, D MMM YYYY")}
                        </Text>
                    </View>

                    <Text style={styles.liteTime}>
                        {moment(order?.completedDate).tz("Africa/Lagos").format("hh:mm A")}
                    </Text>
                </View>}

            </View>
        </View>

     </View>
  );
}
