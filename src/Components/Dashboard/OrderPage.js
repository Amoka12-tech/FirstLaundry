import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StatusBar, FlatList, Animated  } from 'react-native';
import styles from '../../Theme/styles/user';
import { Icon, Image } from 'react-native-elements';
import { black, primaryColor, white } from '../../Theme/color';
import { TShirt } from '../../Theme/icons/items';
import { Picker } from '@react-native-picker/picker';
import GestureRecognizer from 'react-native-swipe-gestures';
import customList from '../../../Item.json';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import { linkApi } from '../../../config';

export default function OrderPage({ navigation }) {

  const swipeAnim = useRef(new Animated.Value(0)).current;
  
  const [itemList, setItemList] = useState(customList);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  let effectCount = 0;

  const unitCalculate = (accumulator, curr) => accumulator + curr;

  const [bottomSheetHeight, setBottomSheetHeight] = useState(120);

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

  const orderNow = () => {
    console.log(selectedItems);
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
    const selectIndex = selectedItems.findIndex(value => value.id === item.id);
       if(selectIndex !== -1) {
          count = selectedItems[selectIndex].count;
       }
    return(
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
      </View>
    );
  }

  //Bottom Sheet control function
  const onSwipeUp = () => {
    if(bottomSheetHeight === 120){
      setBottomSheetHeight(ScreenHeight);

      // Animated.timing(swipeAnim, {
      //   toValue: ScreenHeight,
      //   duration: 3000
      // }).start();

    }
  };

  const onSwipeDown = () => {
    if(bottomSheetHeight > 120){
      setBottomSheetHeight(120);

      // Animated.timing(swipeAnim, {
      //   toValue: 120,
      //   duration: 3000
      // }).start();

    }
  };

  const Footer = () => {
    return(
      <GestureRecognizer 
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
          position: 'absolute',
          bottom: 0,
          width: ScreenWidth,
          height: bottomSheetHeight,
          backgroundColor: white,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          elevation: 1,
          borderTopColor: 'rgba(255,255,255, 0.5)',
          borderTopWidth: 5,
         }}
      >
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
      </GestureRecognizer>
    );
  }

  return (
    <View style={styles.itemMainContainer}>
      <StatusBar 
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <FlatList
        style={{ marginBottom: 81 }}
        data={itemList}
        renderItem={listHolder}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
      />

      <Footer />
     </View>
  );
}
