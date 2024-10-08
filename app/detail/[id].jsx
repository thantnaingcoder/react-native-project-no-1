import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import useSWR from "swr";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Spinner from "react-native-loading-spinner-overlay";
import { useStore } from "../../store/store";



const Detail = () => {
  const cart = useStore((state) => state.cart);
  const addCart=useStore((state) => state.addCart);
  const [refreshing, setRefreshing] = React.useState(false);
   console.log(cart)
  const navigation = useNavigation();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://fakestoreapi.com/products/${Number(id)}`,
    fetcher
  );


  const exitItem =  !!cart.find((item) => item?.id === Number(id))
           
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  });
   

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: "center",
      headerTitle: "Product Detail",      
      headerRight: () => (
       <TouchableOpacity onPress={() => router.push('cart')}>
         <View style={{ marginRight: 10 }}>
        <AntDesign
          
          name="shoppingcart"
          size={28}
          color="black"
        />
        {cart?.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart?.length}</Text>
          </View>
        )}
      </View>
       </TouchableOpacity>
      ),
    });
  }, [navigation, cart]);


  const addToCard = data => {
    if (exitItem) {
      return alert("Already in cart");
    }
    addCart(data);
  } 

  return (
    <>
      {error && (
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            alignItems: "center",
            marginTop: 70,
            fontSize: 25,
            color: "red",
          }}
        >
          {error.message}
        </Text>
      ) 
      
      }


      {isLoading ? (
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "deeppink" }}
        />
      ) : (<View style={{ flex: 1 }}>
        <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } showsVerticalScrollIndicator={false} style={styles.card}>
          <Image
            resizeMode="contain"
            source={{ uri: data?.image }}
            style={{
              width: "90%",
              height: 300,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 20,
            }}
          />
          <Text style={styles.price}>MMK {data?.price}</Text>
          <Text style={styles.productName}>{data?.title}</Text>

          <View style={styles.authenticityContainer}>
            <Ionicons
              name="shield-checkmark-sharp"
              size={24}
              color="orange"
            />
            <Text>100% Authentic </Text>
          </View>

          <View style={styles.authenticityContainer}>
            <Fontisto name="star" size={24} color="orange" />
            <Text>{data?.rating.rate}</Text>
            <Text> stock({data?.rating.count})</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text  style={styles.description}>Description</Text>
            <Text style={styles.descriptionText}>{data?.description}</Text>
          </View>
        </ScrollView>

        {/* Fixed Bottom View */}
        <View style={styles.fixedBottomView}>
          <Ionicons name="storefront-sharp" size={24} color="gray" />
          <MaterialIcons name="chat" size={24} color="gray" />
          <Text style={styles.fixedBottomText1}>Buy Now</Text>


          
        
          <TouchableOpacity  onPress={() => addToCard(data)}>
             <Text style={styles.fixedBottomText}>{exitItem ? "Added" : "Add to cart"}</Text>
          </TouchableOpacity>

          
         
        </View>
      </View>) }


      




    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 20,
  },
  productName: {
    fontSize: 19,
    color: "black",
    marginBottom: 10,
    marginTop: 5,
    paddingLeft: 10,
  },
  authenticityContainer: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  fixedBottomView: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 15,
    borderTopColor: "lightgray",
    borderWidth: 0.5,
    paddingHorizontal: 30,
    gap: 30,
  },
  fixedBottomText: {
    color: "white",
    fontSize: 15,
    width: 130,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ff4500",
    textAlign: "center",
  },

  fixedBottomText1: {
    color: "white",
    fontSize: 15,
    width: 100,
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#4169e1",
  },
  description: {
    fontSize: 20,
    color: "black",
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: "black",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    textAlign: "justify",
    color: "gray",
    lineHeight: 20,
  },
  descriptionContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
    paddingBottom: 50,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: -10, // Adjust the badge position for the headerRight icon
    top: -5, // Adjust the badge position for the headerRight icon
    backgroundColor: 'red',
    borderRadius: 6,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
