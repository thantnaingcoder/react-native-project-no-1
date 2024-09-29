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
  return (
    <>
      <ConnectivityStatus />
      <View style={styles.container}>
        <SearchBar
          style={{
            borderWidth: 0.5,
            padding: 3,
            borderRadius: 8,
            borderColor: "red",
            paddingLeft: 20,
          }}
          platform="android"
          placeholderTextColor="deeppink"
          placeholder="Search..."
          lightTheme={true}
        />
      </View>

      {/* refresh control */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{ paddingRight: 10, paddingLeft: 10, backgroundColor: "white" }}
      >
        <TouchableOpacity onPress={() => addCart(1)}>
          <Image
            resizeMode="contain"
            style={styles.backgroundImage}
            source={{
              uri: "https://img.lazcdn.com/us/domino/940b047c-e711-48b1-90d2-5c2e56c0db9b_MM-1976-688.jpg_1200x1200q80.jpg_.webp",
            }}
          />
        </TouchableOpacity>

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
  },
  backgroundImage: {
    borderRadius: 20,
    width: "100%",
    height: 145,
    justifyContent: "center", // Center the content
  },
});
