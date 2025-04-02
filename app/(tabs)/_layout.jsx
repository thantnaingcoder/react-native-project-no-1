import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Image } from 'react-native';
import { View ,StyleSheet,Text,TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { useStore } from '../../store/store';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const cart = useStore((state) => state.cart);
  const router = useRouter();

  const checkListId = cart.filter((item) => item.check === true).map((item) => item.id);
  const removeCart = useStore((state) => state.removeCart);
  
  const handleSearchPress = () => {
    router.push('/search');
  };
  
  const renderHeaderRight = () => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity onPress={handleSearchPress} style={styles.headerIcon}>
          <AntDesign name="search1" size={22} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: 'red', 
      headerShown: true,
      headerRight: renderHeaderRight
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'For You',
          headerTitle : "",
          
          headerStatusBarHeight: -15,
          headerStyle: { backgroundColor: '#e0e628' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Messages',
          headerStyle: { backgroundColor: 'transparent' },
          headerShown: true,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="message-processing" size={24} color={color} />,
        }}
      />
       <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          headerStyle: { backgroundColor: 'transparent' },
          headerShown: true,
          headerRight : () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity
                onPress={ () => {
                  checkListId.forEach((id) => {
                     removeCart(id);
                  })
                }}
                style={styles.headerIcon}
              >
                <AntDesign name="delete" size={22} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSearchPress} style={styles.headerIcon}>
                <AntDesign name="search1" size={22} color="black" />
              </TouchableOpacity>
            </View>
          ),

          tabBarIcon: ({ color }) =>  <View style={{ width: 24, height: 24 }}>
              <Ionicons name="cart-sharp" size={24} color={color} />
              {cart?.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cart?.length}</Text>
                </View>
              )}
            </View>,
        }}
      />
       <Tabs.Screen
        name="setting"
        options={{
          title: 'Account',
          headerShown: true,
          headerStyle: { backgroundColor: 'deeppink' },
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackgroundColor: 'white',
          
          headerTitle : "",
          

          headerStatusBarHeight: 20,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-cog" size={24} color={color} />,
        }}
      />
     
    </Tabs>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
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
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  headerIcon: {
    marginLeft: 15,
    padding: 5,
  },
});
