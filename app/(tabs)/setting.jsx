import { Image, Pressable } from 'react-native';
import { View, Text, StyleSheet,TouchableOpacity, } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Tab() {
  return (
    <View  >

       <View style={{flexDirection:"row",alignItems:"top",gap:10,justifyContent:"space-between",padding:20,backgroundColor:"white"}}>
      
        <View style={{flexDirection:"row",alignItems:"center",gap:20}} >
        <FontAwesome5 name="user-circle" size={60} color="gray" />
        <Text style={{fontSize:18,color:"black"}}>Login your account</Text>
        </View>

        <Ionicons name="settings-outline" size={24} color="black" />

       </View>


       <View style={{padding:5,paddingBottom:20,backgroundColor:"white"}}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
          <Text style={{fontSize:18}}>My order</Text>
          <TouchableOpacity>
           
          <Text style={{}}>View All Order...</Text>
        </TouchableOpacity>

        </View>
        
       </View>
      

        {/* icons list */}
       <View style={{padding:5,flexDirection:"row",justifyContent:"space-around",alignItems:"center",backgroundColor:"white",paddingBottom:40,marginBottom:20}}>

         <View>
         <FontAwesome6 name="cc-apple-pay" size={35} color="red" />
         <Text>To Pay</Text>
         </View>

         <View>
         <FontAwesome5 name="shipping-fast" size={35} color="red" />
         <Text>To Ship</Text>
         </View>

         <View>
         <MaterialIcons name="local-shipping" size={35} color="red" />
         <Text>Receive</Text>
         </View>

         <View>
         <MaterialIcons name="reviews" size={35} color="red" />
         <Text>Review</Text>
         </View>

         <View>
         <MaterialIcons name="assignment-return" size={35} color="red" />
         <Text>Return</Text>
         </View>
       
       </View>

        {/* icons list end  */}


       <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",gap:1,padding:5,backgroundColor:"white"}}>

         <View>
        <MaterialCommunityIcons name="message-arrow-left-outline" size={60} color="gray" />
         <Text>My Message</Text>
         </View>

         <View>
         <Ionicons name="chatbubbles-outline" size={60} color="gray" />
         <Text>My Message</Text>
         </View>

         <View>
         <MaterialIcons name="payments" size={60} color="gray" />
         <Text>Payment </Text>
         </View>
  
         <View>
         <Ionicons name="help-circle-outline" size={60} color="gray" />
         <Text>Payment </Text>
         </View>

        
         
       
       </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  
  
    backgroundColor: 'white',
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
});
