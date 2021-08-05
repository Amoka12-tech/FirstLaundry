import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, FlatList  } from 'react-native';
import styles from '../../Theme/styles/user';
import { Icon, Image } from 'react-native-elements';
import { black } from '../../Theme/color';
import { TShirt } from '../../Theme/icons/items';
import { Picker } from '@react-native-picker/picker';
import customList from '../../../Item.json';

export default function OrderPage() {
  const [itemList, setItemList] = useState(customList);
  const [selectedItems, setSelectedItems] = useState([]);
  let effectCount = 0;

  //Add Item to selectedItems
  const addItem = (item, index) => {
    if(selectedItems.length === 0){
      item.count = 1;
      item.order = [{ type: item.type, price: item.price }];
      setSelectedItems([...selectedItems, item]);
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
            // console.log('increase');
          }
        }
      }else{
        item.count = 1;
        item.order = [{ type: item.type, price: item.price }];
        // selectedItems.push(item);
        setSelectedItems([...selectedItems, item]);
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
                  if(newSelect.length > 1){
                    const removeOne = [newSelect.pop()]; //remove one from many of same
                    // oldSelect.concat(removeOne);
                    // console.log("Old Select: ",oldSelect);
                    // console.log("Remove one: ",removeOne);
                    if(oldSelect.length > 0){
                      const newObj = removeOne.concat(oldSelect);//join the left after remove to rest not part
                      selectedItems[key].order = newObj;
                      setSelectedItems([...selectedItems]);
                      selectedItems[key].count -= 1; //reduce by 1
                      // console.log(itemType);
                      // console.log("Old: ",selectedItems);
                    }else{
                      selectedItems[key].order = removeOne;
                      setSelectedItems([...selectedItems]);
                      selectedItems[key].count -= 1; //reduce by 1
                      // console.log(itemType);
                      // console.log("Old: ",selectedItems);
                    }
                  }else{
                    if(newSelect.length > 0){
                      selectedItems[key].order = oldSelect;
                      setSelectedItems([...selectedItems]);
                      selectedItems[key].count -= 1; //reduce by 1
                      // console.log(itemType);
                      // console.log("Old: ",selectedItems);
                    }else{
                      const itemName = itemType === "wash_iron" ? "Laundry" : itemType;
                      alert(`${itemName} is no longer part of yor order select the type you still have available`)
                    }
                  }
                  
                  // console.log('decrease');
                }else{
                  if(itemType === selectedItems[key].order[0].type){
                    const removeItem = selectedItems.filter((i) => i.id !== item.id);
                    setSelectedItems([...removeItem]);
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
      <TouchableOpacity>
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
            source={{ uri: `http://192.168.8.100:80/laundry_api/items/${item.img}` }} />
          
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

  return (
    <View style={styles.itemMainContainer}>
      <StatusBar 
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <FlatList
        data={itemList}
        renderItem={listHolder}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={header}
        ListFooterComponent={() => {
          return(
            <TouchableOpacity onPress={orderNow}>
              <Text>Order</Text>
            </TouchableOpacity>
          );
        }}
      />
     </View>
  );
}
