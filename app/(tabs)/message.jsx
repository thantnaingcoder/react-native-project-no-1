import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const index = true
const message = () => {
  const router = useRouter()
  return (
   


      <View style={{flexDirection:"row"  ,justifyContent:"space-between" ,padding:20}}>
        <TouchableOpacity>
      <Text style={{textAlign:"center",justifyContent:"center",alignItems:"center" ,backgroundColor: "green" ,width :50 ,height :50 ,borderRadius:50 ,padding:10}} onPress={() => router.push("/chat")} ><Entypo name="chat" size={30} color="white" />
      </Text>
      <Text style={{marginStart: 10}}>Chat</Text>
     </TouchableOpacity>

     <TouchableOpacity>
      <Text style={{textAlign:"center",justifyContent:"center",alignItems:"center" ,backgroundColor: "blue" ,width :50 ,height :50 ,borderRadius:50 ,padding:10}} onPress={() => router.push("/order")} ><FontAwesome6 name="box" size={30} color="white" />
      </Text>
      <Text style={{marginStart: 10}}>Orders</Text>
     </TouchableOpacity>

     <TouchableOpacity>
      <Text style={{textAlign:"center",justifyContent:"center",alignItems:"center" ,backgroundColor: "orange" ,width :50 ,height :50 ,borderRadius:50 ,padding:10}} onPress={() => router.push("/chat")} ><MaterialIcons name="notifications-active" size={30} color="white" />
      </Text>
      <Text style={{marginStart: 10}}>Activities</Text>
     </TouchableOpacity>

     <TouchableOpacity>
      <Text style={{textAlign:"center",justifyContent:"center",alignItems:"center" ,backgroundColor: "deeppink" ,width :50 ,height :50 ,borderRadius:50 ,padding:10}} onPress={() => router.push("/chat")} ><MaterialIcons name="speaker" size={30} color="white" />
      </Text>
      <Text style={{marginStart: 10}}>Promos</Text>
     </TouchableOpacity>


    
      </View>
    
  )
}

export default message

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});