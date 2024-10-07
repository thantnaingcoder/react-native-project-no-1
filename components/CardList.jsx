import { StyleSheet, Text, View ,Image,ScrollView} from 'react-native'
import React from 'react'
const pho ="https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg" 
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { CheckBox } from '@rneui/themed';
import { useDeleCartList, useStore } from '../store/store';

const CardList = ({item}) => {
    const cart = useStore((state) => state.cart);
    const addCart = useStore((state) => state.addCart);
    const removeCart = useStore((state) => state.removeCart);


    const addDeleCart =useDeleCartList((state) => state.addDeleCart);
    const totalCardId = useDeleCartList((state) => state.totalCardId);
    
    console.log(totalCardId)

    const [checked, setChecked] = React.useState({state : false ,id : null});
    //    console.log(checked)
     const toggleCheckbox = async () => {
         setChecked({state : !checked.state ,id : item.id})
           
         checked.id !== null && checked.state === true && await addDeleCart(checked)
         
     };


  return (
   <>

      <View style={styles.card} >
      <CheckBox
           checked={checked.state}
           onPress={toggleCheckbox}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="blue"
         />
         <Image resizeMode='contain' style={styles.photo}  source={{uri : item.image}}/>
         <View style={styles.detail}>
             <Text  >{item.title}</Text>
             
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={{color:"red"}}>MMK {item.price}</Text>


            <View style={{flexDirection:"row",gap:20,alignItems:"center"}}>
            <Foundation name="minus" size={10} color="gray" />
            <Text style={{fontSize:17}}>5</Text>
            <FontAwesome5 name="plus" size={10} color="gray" />
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