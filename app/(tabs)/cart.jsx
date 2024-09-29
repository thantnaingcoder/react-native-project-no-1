import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import CardList from '../../components/CardList'
import { useStore } from '../../store/store';
import { ScrollView } from 'react-native';

const cart = () => {
  const cart = useStore((state) => state.cart);
  return (
   <>

{cart?.length === 0 &&
      
      <View style={styles.container} >
      <Image resizeMode='contain' style={styles.image} source={require('../../assets/undraw_empty_cart_co35.png')}/>
      <Text style={styles.text}>Empty in your cart</Text>
      
      </View>}

      <ScrollView style={{backgroundColor : cart?.length === 0 ? "white" : ""}}   showsVerticalScrollIndicator={false} >
      {cart?.map((item,index) => <CardList key={index} item={item}  /> )}
      
    </ScrollView>
   </>
  )
}

export default cart

const styles = StyleSheet.create({
  image : {
    width : "100%",
    height : 300,

  },
  text : {
    textAlign : "center",
    fontSize : 20,
    fontWeight : "bold",
    color : "red",
    padding : 10
  },
  container : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center",
    textAlign : "center",
    itemsAlign : "center",
    textAlignVertical : "center",
    backgroundColor : "white"

    
  }
})