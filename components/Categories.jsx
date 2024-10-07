import { StyleSheet, Text, View, ScrollView, TouchableOpacity ,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
const api = "https://fakestoreapi.com/products/"
const categories = [
    
    { name : "men's clothing",image : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"},
    { name : "jewelery",image : "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"},
    { name : "electronics",image : "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"},
    { name : "women's clothing",image : "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"},
    { name : "Monitor",image : "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"},



];

const Categories = () => {
    
  return (
    <>
      {/* Title Section */}
      <View style={styles.headerContainer}>
        <Text  style={styles.headerText}>Categories</Text>
        
        <TouchableOpacity>
           
          <Text style={styles.shopMoreText}>SHOP MORE ...</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrollable Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {categories.map((i, index) => (
            
          <TouchableOpacity key={index} style={styles.categoryButton}>
             <Image resizeMode='contain' source={{uri :i.image}} style={{width : 50 , height : 70}}/>
            <Text style={styles.categoryText}>{i.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  shopMoreText: {
    color: 'blue',
  },
  scrollContainer: {
    paddingHorizontal: 1,
    marginTop: 10,
    backgroundColor: 'white',
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  categoryText: {
    fontSize: 14,
  },
});
