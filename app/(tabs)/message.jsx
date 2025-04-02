import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { chatData, ordersData, activitiesData, promosData } from '../../data/messageData';

const { width } = Dimensions.get('window');

const message = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('chat');

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => router.push(`/chat/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        
        <View style={styles.messageFooter}>
          <Text 
            style={styles.lastMessage} 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage}
          </Text>
          
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderItem}
      onPress={() => router.push(`/order/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.orderHeader}>
        <View style={styles.storeInfo}>
          <Image source={{ uri: item.storeAvatar }} style={styles.storeAvatar} />
          <View>
            <Text style={styles.storeText}>{item.store}</Text>
            <Text style={styles.orderIdText}>Order #{item.id}</Text>
          </View>
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>

      <View style={styles.orderContent}>
        <Text style={styles.itemsText}>
          {item.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
        </Text>
        
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        
        <View style={styles.orderFooter}>
          <View style={styles.deliveryInfo}>
            <MaterialIcons name="local-shipping" size={16} color="#666" />
            <Text style={styles.deliveryText}>
              {item.status === 'Delivered' ? 'Delivered on' : 'Expected by'} {item.deliveryDate}
            </Text>
          </View>
          <Text style={styles.totalText}>${item.total.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity style={styles.activityItem} activeOpacity={0.7}>
      <View style={[styles.activityIconContainer, { backgroundColor: item.color }]}>
        <MaterialIcons name={item.icon} size={24} color="white" />
      </View>
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
        <Text style={styles.activityDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPromoItem = ({ item }) => (
    <TouchableOpacity style={styles.promoCard} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.promoImage} />
      <View style={styles.promoContent}>
        <Text style={styles.promoTitle}>{item.title}</Text>
        <Text style={styles.promoDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.promoFooter}>
          <Text style={styles.promoValidity}>Valid until {item.validUntil}</Text>
          <View style={[styles.promoCodeContainer, { backgroundColor: item.color }]}>
            <Text style={styles.promoCode}>{item.code}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shipped':
        return '#2196F3';
      case 'Delivered':
        return '#4CAF50';
      case 'Processing':
        return '#FF9800';
      default:
        return '#666';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <FlatList
            data={chatData}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        );
      case 'orders':
        return (
          <FlatList
            data={ordersData}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 12 }}
          />
        );
      case 'activities':
        return (
          <FlatList
            data={activitiesData}
            renderItem={renderActivityItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 12 }}
          />
        );
      case 'promos':
        return (
          <FlatList
            data={promosData}
            renderItem={renderPromoItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 12 }}
            snapToInterval={width - 60}
            decelerationRate="fast"
            snapToAlignment="center"
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('chat')}
        >
          <View style={[
            styles.tabIconContainer, 
            { backgroundColor: activeTab === 'chat' ? "green" : "#e0e0e0" }
          ]}>
            <Entypo name="chat" size={24} color="white" />
          </View>
          <Text style={[
            styles.tabText,
            activeTab === 'chat' && styles.activeTabText
          ]}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('orders')}
        >
          <View style={[
            styles.tabIconContainer, 
            { backgroundColor: activeTab === 'orders' ? "blue" : "#e0e0e0" }
          ]}>
            <FontAwesome6 name="box" size={24} color="white" />
          </View>
          <Text style={[
            styles.tabText,
            activeTab === 'orders' && styles.activeTabText
          ]}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('activities')}
        >
          <View style={[
            styles.tabIconContainer, 
            { backgroundColor: activeTab === 'activities' ? "orange" : "#e0e0e0" }
          ]}>
            <MaterialIcons name="notifications-active" size={24} color="white" />
          </View>
          <Text style={[
            styles.tabText,
            activeTab === 'activities' && styles.activeTabText
          ]}>Activities</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('promos')}
        >
          <View style={[
            styles.tabIconContainer, 
            { backgroundColor: activeTab === 'promos' ? "deeppink" : "#e0e0e0" }
          ]}>
            <MaterialIcons name="speaker" size={24} color="white" />
          </View>
          <Text style={[
            styles.tabText,
            activeTab === 'promos' && styles.activeTabText
          ]}>Promos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
    </View>
  );
};

export default message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {
    flex: 1,
  },
  // Chat styles
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: 0,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: 'deeppink',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Order styles
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  storeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  orderIdText: {
    fontSize: 12,
    color: '#666',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  orderContent: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  itemsText: {
    fontSize: 14,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'deeppink',
  },
  // Activity styles
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  activityIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  activityDescription: {
    fontSize: 14,
    color: '#333',
  },
  // Promo styles
  promoCard: {
    width: width - 60,
    marginHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  promoImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  promoContent: {
    padding: 16,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  promoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  promoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  promoValidity: {
    fontSize: 12,
    color: '#666',
  },
  promoCodeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  promoCode: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});