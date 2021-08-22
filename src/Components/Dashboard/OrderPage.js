import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import styles from '../../Theme/styles/user';
import { Icon, Image } from 'react-native-elements';
import { black, primaryColor, white } from '../../Theme/color';
import { Picker } from '@react-native-picker/picker';
import customList from '../../../Item.json';
import { linkApi } from '../../../config';
import Spinner from 'react-native-loading-spinner-overlay';

import { createStackNavigator } from '@react-navigation/stack';
import ConfirmOrderPage from './ConfirmOrderPage';
import MapViewPage from './MapView';
import LocationPage from './LocationPage';
import PaymentPage from './PaymentPage';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../actions/order';


const Stack = createStackNavigator();

const Main = ({ navigation }) => {
  const dispatch = useDispatch();
  const orderData = useSelector(state => state.orders);
  const isLoading = useSelector(state => state.auth.isLoading);
  // console.log('Order: ',orderData);
  const eItemList = useSelector(state => state.itemList);
  
  const [itemList, setItemList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  let effectCount = 0;

  useEffect(() => {
    if(itemList?.length === 0){
      dispatch(getItems(setItemList));
    }
  }, []);

  //Add Item to selectedItems
  const addItem = (item, index) => {
    if(selectedItems.length === 0){
      item.count = 1;
      item.order = [{ type: item.type, price: item.price }];
      setSelectedItems([...selectedItems, item]);
      setTotalCount(totalCount+ 1);
      setTotalPrice(totalPrice + item.price);
    }else{
      //Check is selected item includes the item id
      const newBody = { type: item.type, price: item.price }
      const checkItem = selectedItems.find((value) => value.id === item.id);
      if(!!checkItem){
        for(const [key, value] of Object.entries(selectedItems)){
          if(value.id === item.id){
            selectedItems[key].count += 1;
            selectedItems[key].order = [...selectedItems[key].order, newBody];
            setSelectedItems([...selectedItems]);
            setTotalCount(totalCount+ 1);
            setTotalPrice(totalPrice + item.price);
            // console.log('increase');
          }
        }
      }else{
        item.count = 1;
        item.order = [{ type: item.type, price: item.price }];
        // selectedItems.push(item);
        setSelectedItems([...selectedItems, item]);
        setTotalCount(totalCount+ 1);
        setTotalPrice(totalPrice + item.price);
        // console.log([...selectedItems]);
      }
      //End of else for selected item not null
    }
  };

  //Remove Item from selectedItems
  const removeItem = (item, index) => {
    const newBody = { type: item.type, price: item.price }
    if(selectedItems.length > 0){
      const checkItem = selectedItems.find((value) => value.id === item.id);
      if(!!checkItem)//yes item found
      {
        for(const [key, value] of Object.entries(selectedItems)){
            if(value.id === item.id){
              const itemType = value.type;
                if(selectedItems[key].count > 1){
                  const newSelect = selectedItems[key].order.filter((value) => value.type === itemType);
                  const oldSelect = selectedItems[key].order.filter((value) => value.type !== itemType);
                  // console.log(newSelect);
                  if(newSelect.length > 1){
                    newSelect.pop()
                    // console.log("New Select: ",newSelect);
                    const removeOne = newSelect; //remove one from many of same
                    // oldSelect.concat(removeOne);
                    // console.log("Old Select: ",oldSelect);
                    // console.log("Remove one: ",removeOne);
                    if(oldSelect.length > 0){
                      const newObj = removeOne.concat(oldSelect);//join the left after remove to rest not part
                      selectedItems[key].order = newObj;
                      setSelectedItems([...selectedItems]);
                      selectedItems[key].count -= 1; //reduce by 1
                      setTotalCount(totalCount - 1);
                      setTotalPrice(totalPrice - item.price);
                      // console.log(itemType);
                      // console.log("Old: ",selectedItems);
                    }else{
                      // console.log(removeOne);
                      selectedItems[key].order = removeOne;
                      setSelectedItems([...selectedItems]);
                      selectedItems[key].count -= 1; //reduce by 1
                      setTotalCount(totalCount - 1);
                      setTotalPrice(totalPrice - item.price);
                      // console.log(itemType);
                      // console.log("Old: ",selectedItems);
                    }
                  }else{
                    if(newSelect.length > 0){
                      selectedItems[key].order = oldSelect;
                      setSelectedItems([...selectedItems]);
                      selectedItems[key].count -= 1; //reduce by 1
                      setTotalCount(totalCount - 1);
                      setTotalPrice(totalPrice - item.price);
                      // console.log(itemType);
                      // console.log("Old: ",selectedItems);
                    }else{
                      const itemName = itemType === "wash_iron" ? "Laundry" : itemType;
                      alert(`${itemName} a is no longer part of yor order select the type you still have available`)
                    }
                  }
                  
                  // console.log('decrease');
                }else{
                  if(itemType === selectedItems[key].order[0].type){
                    const removeItem = selectedItems.filter((i) => i.id !== item.id);
                    setSelectedItems([...removeItem]);
                    setTotalCount(totalCount - 1);
                    setTotalPrice(totalPrice - item.price);
                  }else{
                    const itemName = itemType === "wash_iron" ? "Laundry" : itemType;
                    alert(`${itemName} is no longer part of yor order select the type you still have available`)
                  }
                  // console.log('remove');
                }
            }//we get the specific item with the id
        }
      } //End of item found
    }
  };

  //Confirm Order to Schedule pickup
  const orderNow = () => {
    if(selectedItems.length > 0){
      navigation.navigate('ConfirmOrder', {
        selectedItems: selectedItems,
        totalCount: totalCount,
        totalPrice: totalPrice
      });
    }else{
      alert('Please select an item and confirm order! ');
    }
  };

  //Top header
  const header = () => {
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
        Orders List
      </Text>

      <View />
    </View>);
  };

  //List Holder
  const listHolder = ({item, index}) => {
    let count = 0;
    let orderList = [];
    const selectIndex = selectedItems.findIndex(value => value.id === item.id);
       if(selectIndex !== -1) {
          count = selectedItems[selectIndex].count;
           orderList = selectedItems[selectIndex].order;
       }
    return(
      <View style={styles.itemMainHolder}>

        <View key={index} style={styles.itemHolder}>
          <View style={styles.itemLeft}>
            <Image 
              style={styles.itemImage}
              source={{ uri: `${linkApi}/items/${item.img}` }} />
            
            <View style={styles.itemLeftDetails}>
              <Text style={styles.itemTextHolder}>
                {item.name}</Text>

              <View style={styles.itemLeftDetailsAction}>
                <Text style={styles.itemTextPrice}>
                  {`₦${item.price}`}</Text>
                <Picker 
                  itemStyle={{ width: 120 }}
                  style={styles.pickerStyle} 
                  selectedValue={''} onValueChange={(value, itemIndex) => {
                    itemList[index].price = value;
                    itemList[index].type = itemIndex === 4 ? "dry" : 
                      itemIndex === 3 ? "iron" : 
                      itemIndex === 2 ?  "fold" : itemIndex === 1 ? "wash" : "wash_iron";
                    setItemList([...itemList]);
                  }}>
                  <Picker.Item value={item.wash_iron} label={'Laundry'} />
                  <Picker.Item value={item.wash} label={'Wash'} />
                  <Picker.Item value={item.fold} label={'Fold'} />
                  <Picker.Item value={item.iron} label={'Iron'} />
                  <Picker.Item value={item.dry} label={'Dry'} />
                </Picker>
              </View>
            </View>

          </View>

          <View style={styles.itemRight}>
            <View style={styles.itemRightDetails}>
              <Icon 
                type="antdesign"
                name="pluscircle"
                color={black}
                size={20}
                onPress={() => addItem(item, index)}
              />
              <Text>{count}</Text>
              <Icon 
                type="antdesign"
                name="minuscircle"
                color={black}
                size={20}
                onPress={() => removeItem(item, index)}
              />
            </View>
            {/* End of item detais action icon */}

            {count > 0 && <Icon 
              type="antdesign"
              name={itemList[index]?.show ? "up" : "down"}
              size={20}
              color={black}
              onPress={() => { 
                if(itemList[index].show){ itemList[index].show = false; setItemList([...itemList]) }else{
                  itemList[index].show = true; setItemList([...itemList]);
                }
               }}
            />}
          </View>
        </View>

        {/* Hidden item details */}
        {itemList[index]?.show === true && count >0 && <View style={styles.itemDetails}>
          <View>{orderList.map((value, index) => 
            <View style={styles.itemOrderDetails} key={index} >
              <Text>{value.type === "wash_iron" ? "Laundry" : value.type}</Text>
              <Text>{`₦${value.price}`}</Text>
            </View>)}
          </View>
        </View>}
        {/* End of hiddden item details */}

      </View>
    );
  }

  const Footer = () => {
    return(
      <View style={styles.bottomSheet}>
        <View style={styles.confirmOrderHolder}>
          <View style={{ 
            display: 'flex', 
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            position: 'relative',
            }}>
              
              {/* Holding total count */}
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Icon 
                  type="feather"
                  name="codesandbox"
                  size={30}
                  color={primaryColor}
                  containerStyle={styles.confirmOrderIconCont}
                />

                <View style={styles.confirmOrderTextHolder}>
                  <Text style={styles.confirmOrderTextHeader}>Total</Text>
                  <Text style={styles.confirmOrderTextCount}>
                    {
                      totalCount > 1 ? `${totalCount} Items`: `${totalCount} Item`
                    }
                  </Text>
                </View>
              </View>

              {/* Holding cost count */}
              <View style={styles.confirmOrderTextHolder}>
                <Text style={styles.confirmOrderTextHeader}>Cost</Text>
                <Text style={styles.confirmOrderTextPrice}>
                  {
                    totalPrice > 0 && `₦${totalPrice}`
                  }
                </Text>
              </View>

          </View>

          <TouchableOpacity 
            onPress={orderNow}
            style={styles.standardButton}
            >
              <Text style={styles.standardButtonText}>
                Confirm Order
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.itemMainContainer}>
      <StatusBar 
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <Spinner 
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={styles.loadingText}
            color={primaryColor}
        />

      <FlatList
        style={{ marginBottom: 100 }}
        data={itemList}
        renderItem={listHolder}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
      />

      <Footer />
     </View>
  );};

export default function OrderPage({ navigation }) {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainOrder" component={Main} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrderPage} />
      <Stack.Screen name="MapView" component={LocationPage} />
      <Stack.Screen name="Payment" component={PaymentPage} />
    </Stack.Navigator>
  );
};
