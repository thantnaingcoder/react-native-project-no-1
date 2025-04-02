import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "https://fakestoreapi.com/products/";

// Helper function to fetch data
export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Helper function to fetch a single product
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Search functionality
export const searchProducts = async (query) => {
  try {
    // Fetch all products first (in a real app, you'd have a search API endpoint)
    const allProducts = await fetchProducts();
    
    // Filter products based on the query
    if (!query || query.trim() === '') {
      return allProducts;
    }
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return allProducts.filter(product => 
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery)
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Recent searches management
export const saveRecentSearch = async (query) => {
  try {
    if (!query || query.trim() === '') return;
    
    const recentSearches = await getRecentSearches();
    
    // Add the new search to the beginning and remove duplicates
    const updatedSearches = [
      query.trim(),
      ...recentSearches.filter(item => item.toLowerCase() !== query.trim().toLowerCase())
    ].slice(0, 10); // Keep only the 10 most recent searches
    
    await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    return updatedSearches;
  } catch (error) {
    console.error('Error saving recent search:', error);
    return [];
  }
};

export const getRecentSearches = async () => {
  try {
    const searches = await AsyncStorage.getItem('recentSearches');
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    console.error('Error getting recent searches:', error);
    return [];
  }
};

export const clearRecentSearches = async () => {
  try {
    await AsyncStorage.setItem('recentSearches', JSON.stringify([]));
    return [];
  } catch (error) {
    console.error('Error clearing recent searches:', error);
    return [];
  }
};

// Create a search store with Zustand
export const useSearchStore = create((set) => ({
  searchQuery: '',
  searchResults: [],
  recentSearches: [],
  isLoading: false,
  error: null,
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  performSearch: async (query) => {
    set({ isLoading: true, error: null });
    try {
      const results = await searchProducts(query);
      await saveRecentSearch(query);
      const recentSearches = await getRecentSearches();
      set({ 
        searchResults: results, 
        isLoading: false,
        recentSearches
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  loadRecentSearches: async () => {
    try {
      const recentSearches = await getRecentSearches();
      set({ recentSearches });
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  },
  
  clearRecentSearches: async () => {
    try {
      await clearRecentSearches();
      set({ recentSearches: [] });
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  }
}));
