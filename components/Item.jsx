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
import { useCategoryStore } from "../services/storeService";
const api = "https://fakestoreapi.com/products/";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

import Spinner from "react-native-loading-spinner-overlay";
const { width } = Dimensions.get("window");

const Item = () => {
  const router = useRouter();
  const { data: allProducts, error: fetchError, isLoading: isFetching } = useSWR(api, fetcher);
  
  const { 
    selectedCategory, 
    filteredProducts, 
    isLoading: isFilterLoading, 
    error: filterError,
    setSelectedCategory
  } = useCategoryStore();
  
  const [displayProducts, setDisplayProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Effect to filter products when category changes or all products are fetched
  useEffect(() => {
    const filterProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (fetchError) {
          throw fetchError;
        }
        
        if (!allProducts) {
          return; // Still loading all products
        }
        
        // If category is 'all' or not set, show all products
        if (!selectedCategory || selectedCategory === 'all') {
          setDisplayProducts(allProducts);
        } else {
          // Filter products by category
          const filtered = allProducts.filter(
            product => product.category.toLowerCase() === selectedCategory.toLowerCase()
          );
          setDisplayProducts(filtered);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    filterProducts();
  }, [allProducts, selectedCategory, fetchError]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        router.push(`detail/${item.id}`);
      }}
      style={styles.gridItem}
      activeOpacity={0.7}
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
      <Text numberOfLines={2} style={styles.gridItemText}>{item.title}</Text>
      <Text style={styles.price}> $ {item.price}</Text>
    </TouchableOpacity>
  );
  
  const getCategoryTitle = () => {
    if (!selectedCategory || selectedCategory === 'all') {
      return "For You";
    }
    
    // Capitalize first letter of each word
    return selectedCategory
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
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

      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "deeppink" }}
        />
      )}

      {displayProducts && displayProducts.length > 0 ? (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {getCategoryTitle()}
            </Text>
            <Text style={styles.productCount}>
              {displayProducts.length} products
            </Text>
          </View>

          <FlatList
            data={displayProducts}
            renderItem={renderItem}
            keyExtractor={(i) => i.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.gridContainer}
            nestedScrollEnabled={true}
            scrollEnabled={false}  
          />
        </>
      ) : !isLoading && displayProducts && displayProducts.length === 0 ? (
        <View style={styles.noProductsContainer}>
          <Text style={styles.noProductsText}>No products found in this category</Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={styles.resetButtonText}>View All Products</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

export default Item;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#e0e628",
  },
  headerText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  productCount: {
    fontSize: 14,
    color: "#333",
  },
  gridContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: "white",
  },
  gridItem: {
    flex: 1, // This ensures that items share equal space within the row
    margin: 20,
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
    marginBottom: 5,
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
  },
  noProductsContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noProductsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: 'deeppink',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
