import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import CardList from '../../components/CardList'
import { useStore } from '../../store/store';
import { ScrollView } from 'react-native';

const cart = () => {
  const cart = useStore((state) => state.cart);
  const totalPrice = cart.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0).toFixed(2);
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

    {cart.length > 0 &&  <View className=" px-10 py-2 flex flex-col gap-2 items-center ">
        <Text className=" text-xl font-bold text-gray-500" >Sub Total Price :  <Text className="text-red-500">$ {totalPrice} </Text></Text>
        <Text className=" text-md font-bold text-gray-500"> Total Item : <Text className="text-red-500">{cart.length}</Text></Text>
    </View>}
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