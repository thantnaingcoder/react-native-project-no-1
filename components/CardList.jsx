import { StyleSheet, Text, View ,Image,ScrollView,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'

import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { CheckBox } from '@rneui/themed';
import {  useStore } from '../store/store';

const CardList = ({item}) => {
    const cart = useStore((state) => state.cart);
    const toggleCheck =useStore((state) => state.toggleCheck);
    const addQuantity = useStore((state) => state.addQuantity);
    const removeQuantity = useStore((state) => state.removeQuantity);
    
     

    const reduceItemQuantity = id => {
        if(item.quantity > 1)  removeQuantity(item.id)
    }

    const addItemQuantity = (id) => {
        addQuantity(item.id)
    }


  return (
   <>

      <View style={styles.card} >
      <CheckBox
           checked={item.check}
          
           value={item.check}
           onPress={() => toggleCheck(item.id)}
        //    onValueChange={() => alert("test")}
           // Use ThemeProvider to make change for all checkbox`
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="blue"
         />
         <Image resizeMode='contain' style={styles.photo}  source={{uri : item.image}}/>
         <View style={styles.detail}>
             <Text  >{item.title}</Text>
             
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={{color:"red"}}>USD {item.price}</Text>


            <View style={{flexDirection:"row",gap:20,alignItems:"center"}}>
            <TouchableOpacity onPress={() => reduceItemQuantity(item.id)}><Foundation name="minus" size={15} color="gray" /></TouchableOpacity>
            <Text style={{fontSize:17}}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => addItemQuantity(item.id) }><FontAwesome5  style={{marginRight : 10}} name="plus" size={15} color="gray" /></TouchableOpacity>
            </View>
            

            </View>
         </View>
        


      </View>

      

      </>
   
  )
}

export default CardList

const styles = StyleSheet.create({
    photo : {
        width : 100,
        height : 100
    },
    card : {
        backgroundColor : "white",
        flexDirection : "row",
        alignItems : "center",  
        // gap : 10,
        paddingRight :10

        
    },
    detail : {
        gap : 10,
        flex : 1,
        padding : 10
        
    }
})