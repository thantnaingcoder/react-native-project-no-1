import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "expo-router";
const api = "https://fakestoreapi.com/products/";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

import Spinner from "react-native-loading-spinner-overlay";
const { width } = Dimensions.get("window");
const Item = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(api, fetcher);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        router.push(`detail/${item.id}`);
      }}
      style={styles.gridItem}
    >
      <Image
        resizeMode="contain"
        source={{ uri: item.image }}
        style={{
          minWidth: "70%",
          maxWidth: "100%",
          minHeight: "60%",
          maxHeight: "80%",
        }}
      />
      <Text style={styles.gridItemText}>{item.title}</Text>
      <Text style={styles.price}> MMK {item.price}</Text>
    </TouchableOpacity>
  );
  
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
      )}



      {isLoading &&(
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "deeppink" }}
        />
      )  }


      {data && (
        <>
          <Text style={{ color: "red", padding: 10, backgroundColor: "#e0e628",fontSize: 16,fontWeight: "bold" }}>
            For You
          </Text>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(i) => i.id}
            numColumns={2}
            contentContainerStyle={styles.gridContainer}
            nestedScrollEnabled={true}
            scrollEnabled={false}  
          />
        </>
      )}
    </>
  );
};




export default Item;

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: "white",
  },
  gridItem: {
    flex: 1, // This ensures that items share equal space within the row
    margin: 10,

    height: width / 2.5, // Responsive height based on screen width

    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    borderRadius: 10,
    backgroundColor: "white",
  },
  gridItemText: {
    fontSize: 12,
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
