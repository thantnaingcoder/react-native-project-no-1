import { StyleSheet, Text, View ,Image ,Button, TextInput} from 'react-native'
import React, { useState } from 'react'
import logo from "../assets/undraw_Access_account_re_8spm.png"
import png from "../assets/images/favicon.png"
import { useRouter } from 'expo-router'
const index = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const router= useRouter()
    

    const toNext = () => {
        if(email && password){

            if(email === "admin" && password === "admin"){
               router.push("/tab") 
            }
            
        }
    }
  return (
    
    <View style={{backgroundColor:"white" , flex: 1}}>
      <Text style={styles.header}>Login</Text>

       <View style={styles.container}>
       <Image style={styles.logo} source={logo} />
       </View>

       <View style={styles.form} >
        
            <Text style={styles.label} >Email</Text>
           <TextInput value={email} onChangeText={(e) => setEmail(e)} style={styles.input}/>
           <Text style={styles.label} >Password</Text>
           <TextInput value={password} onChangeText={(e) => setPassword(e)  } style={styles.input}/>
           <View style={styles.btn}>
            <Button onPress={toNext}   title='Submit'/>
           </View>
           


       </View>
        <View style={styles.container}>
        <Text style={{color:"blue"}}> Create Account</Text>
        <Text style={{color:"red"}}>Forget Password</Text>
        </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    header : {
        textAlign : "center",
        fontSize : 25,
        fontWeight :"bold",
        color :"blue"
        
    },
    logo : {
        width :300 ,
        height : 300,
        marginVertical : "auto",
    },
    card : {
       
        marginTop : 30 ,
        marginLeft : 60,
        marginRight : 60

    },
    form : {
        margin : 10,
        flexDirection : "column",
        gap : 10
    },
    input : {
        borderWidth : 1,
        borderColor : "black",
        padding : 5 ,
        
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop :15
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
       
      },
      btn : {
        backgroundColor : "blue",
        color : "white",
        marginTop : 15
      }
    

    
    
})