import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useCategoryStore } from '../services/storeService';

const Categories = () => {
  const { 
    categories, 
    selectedCategory, 
    setSelectedCategory 
  } = useCategoryStore();
  
  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(categoryName);
  };
    
  return (
    <>
      {/* Title Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Categories</Text>
        
        <TouchableOpacity onPress={() => setSelectedCategory('all')}>
          <Text style={styles.shopMoreText}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrollable Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.categoryButton,
              selectedCategory === category.name && styles.selectedCategoryButton
            ]}
            onPress={() => handleCategoryPress(category.name)}
          >
            <Image 
              resizeMode='contain' 
              source={{uri: category.image}} 
              style={styles.categoryImage}
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.name && styles.selectedCategoryText
            ]}>
              {category.label || category.name}
            </Text>
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
    color: 'deeppink',
    fontWeight: '600',
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
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedCategoryButton: {
    backgroundColor: '#fff0f5',
    borderColor: 'deeppink',
  },
  categoryImage: {
    width: 50, 
    height: 70
  },
  categoryText: {
    fontSize: 14,
  },
  selectedCategoryText: {
    color: 'deeppink',
    fontWeight: 'bold',
  },
});
