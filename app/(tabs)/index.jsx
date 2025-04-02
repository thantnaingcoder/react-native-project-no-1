import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SearchBar } from "@rneui/themed";
import Categories from "../../components/Categories";
import Item from "../../components/Item";
import { useStore } from "../../store/store";
import ConnectivityStatus from "../../networkCheck/networkCheck";
import Carousel from "../../components/Carousel";
import { AntDesign } from "@expo/vector-icons";

const carouselData = [
  {
    image: "https://img.lazcdn.com/us/domino/940b047c-e711-48b1-90d2-5c2e56c0db9b_MM-1976-688.jpg_1200x1200q80.jpg_.webp",
    caption: 'Welcome to Slide 1',
  },
  {
    image: "https://img.lazcdn.com/us/domino/feb5df1a-7424-4b34-8342-8b4a055bcdf8_MM-1976-688.jpg_2200x2200q80.jpg_.webp",
    caption: 'Discover Slide 2',
  },
  {
    image: "https://img.lazcdn.com/us/domino/9b9fb205-5cf1-4277-bed4-730a9e72c37f_MM-1053-360.jpg_760x760q80.jpg_.webp",
    caption: 'Enjoy Slide 3',
  },
 
];




const index = () => {
  const addCart = useStore((state) => state.addCart);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  });

  const router = useRouter();
  
  const handleSearchPress = () => {
    router.push('/search');
  };
  
  return (
    <>
      <ConnectivityStatus />
     
        
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.searchBarWrapper}
          activeOpacity={0.7}
          onPress={handleSearchPress}
        >
          <View style={styles.searchBarContent}>
            <AntDesign name="search1" size={20} color="gray" style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Search products...</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* refresh control */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{ paddingRight: 10, paddingLeft: 10, backgroundColor: "white" }}
      >
        
        <Carousel data={carouselData} autoScrollInterval={3000} />
        

        <Categories />
        <Item />
      </ScrollView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    //  marginTop : 18,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  backgroundImage: {
    borderRadius: 20,
    width: "100%",
    height: 145,
    justifyContent: "center", // Center the content
  },
  searchBarWrapper: {
    width: "100%",
    height: 48,
    backgroundColor: "#f0f0f0",
    borderRadius: 24,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  searchBarContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: "gray",
    fontSize: 16,
  },
});
