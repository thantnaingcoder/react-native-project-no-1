import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useSearchStore } from '../services/storeService';

const SearchComponent = ({ onClose, fullScreen = false }) => {
  const router = useRouter();
  const { 
    searchQuery, 
    searchResults, 
    recentSearches, 
    isLoading, 
    error,
    setSearchQuery,
    performSearch,
    loadRecentSearches,
    clearRecentSearches
  } = useSearchStore();

  useEffect(() => {
    loadRecentSearches();
  }, []);

  useEffect(() => {
    // Debounce search to avoid too many requests
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        performSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const handleItemPress = (item) => {
    // Navigate to product detail
    // Close the search modal/screen first if onClose is provided
    if (onClose) onClose();
    
    // Use a small timeout to ensure the modal is closed before navigation
    setTimeout(() => {
      router.push({
        pathname: `/detail/${item.id}`,
        params: { id: item.id }
      });
    }, 100);
  };

  const handleSearchPress = (term) => {
    setSearchQuery(term);
    performSearch(term);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Search products..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          platform="android"
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainer}
          lightTheme={true}
          round={true}
          showCancel={true}
          onClear={clearSearch}
          autoFocus={true}
        />
        {!fullScreen && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => searchQuery.trim() && performSearch(searchQuery)}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="deeppink" />
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.resultItem} 
              onPress={() => handleItemPress(item)}
            >
              <Image 
                source={{ uri: item.image }} 
                style={styles.itemImage} 
                resizeMode="contain"
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : searchQuery.trim() === '' && (
        <View style={styles.recentSearchesContainer}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Searches</Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={clearRecentSearches}>
                <Text style={styles.clearText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {recentSearches.length > 0 ? (
            <FlatList
              data={recentSearches}
              keyExtractor={(item, index) => `recent-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.recentItem}
                  onPress={() => handleSearchPress(item)}
                >
                  <AntDesign name="clockcircleo" size={16} color="gray" style={styles.recentIcon} />
                  <Text style={styles.recentText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noRecentText}>No recent searches</Text>
          )}
        </View>
      )}

      {searchQuery.trim() !== '' && searchResults.length === 0 && !isLoading && (
        <View style={styles.noResultsContainer}>
          <AntDesign name="frowno" size={50} color="gray" />
          <Text style={styles.noResultsText}>No products found</Text>
          <Text style={styles.noResultsSubText}>Try a different search term</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fullScreen: {
    paddingTop: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchBarContainerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    padding: 0,
  },
  searchBarInputContainer: {
    backgroundColor: '#f0f0f0',
  },
  closeButton: {
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'deeppink',
  },
  recentSearchesContainer: {
    padding: 16,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearText: {
    color: 'deeppink',
    fontSize: 14,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recentIcon: {
    marginRight: 10,
  },
  recentText: {
    fontSize: 16,
  },
  noRecentText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: 'deeppink',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  noResultsSubText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});

export default SearchComponent;
