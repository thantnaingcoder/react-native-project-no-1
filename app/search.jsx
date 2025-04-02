import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchComponent from '../components/SearchComponent';
import { useRouter } from 'expo-router';

const SearchScreen = () => {
  const router = useRouter();
  
  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SearchComponent onClose={handleClose} fullScreen={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default SearchScreen;
