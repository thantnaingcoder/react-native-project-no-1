import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { ordersData } from '../../data/messageData';

const OrderDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentOrder, setCurrentOrder] = useState(null);
  
  // Tracking steps for the order
  const trackingSteps = [
    { id: 1, title: 'Order Placed', description: 'Your order has been received', completed: true, date: 'Mar 29, 2025', time: '09:45 AM' },
    { id: 2, title: 'Processing', description: 'Your order is being processed', completed: true, date: 'Mar 30, 2025', time: '11:20 AM' },
    { id: 3, title: 'Shipped', description: 'Your order has been shipped', completed: true, date: 'Apr 01, 2025', time: '08:30 AM' },
    { id: 4, title: 'Out for Delivery', description: 'Your order is out for delivery', completed: false, date: 'Apr 05, 2025', time: 'Expected' },
    { id: 5, title: 'Delivered', description: 'Your order has been delivered', completed: false, date: 'Apr 05, 2025', time: 'Expected' },
  ];

  useEffect(() => {
    // Find the current order based on the ID
    const order = ordersData.find(order => order.id === id);
    if (order) {
      setCurrentOrder(order);
    }
  }, [id]);

  // Get the appropriate icon for each tracking step
  const getStepIcon = (step) => {
    switch (step.id) {
      case 1:
        return <MaterialIcons name="shopping-cart" size={24} color={step.completed ? "#4CAF50" : "#ccc"} />;
      case 2:
        return <MaterialIcons name="inventory" size={24} color={step.completed ? "#4CAF50" : "#ccc"} />;
      case 3:
        return <MaterialIcons name="local-shipping" size={24} color={step.completed ? "#4CAF50" : "#ccc"} />;
      case 4:
        return <FontAwesome5 name="truck-moving" size={20} color={step.completed ? "#4CAF50" : "#ccc"} />;
      case 5:
        return <MaterialIcons name="check-circle" size={24} color={step.completed ? "#4CAF50" : "#ccc"} />;
      default:
        return null;
    }
  };

  if (!currentOrder) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading order details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Order Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order Summary Card */}
        <View style={styles.orderSummaryCard}>
          <View style={styles.orderHeader}>
            <View style={styles.storeInfo}>
              <Image source={{ uri: currentOrder.storeAvatar }} style={styles.storeAvatar} />
              <View>
                <Text style={styles.storeText}>{currentOrder.store}</Text>
                <Text style={styles.orderIdText}>Order #{currentOrder.id}</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(currentOrder.status) }]}>
              <Text style={styles.statusText}>{currentOrder.status}</Text>
            </View>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Order Date:</Text>
            <Text style={styles.orderInfoValue}>{currentOrder.date}</Text>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Expected Delivery:</Text>
            <Text style={styles.orderInfoValue}>{currentOrder.deliveryDate}</Text>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Tracking Number:</Text>
            <Text style={styles.orderInfoValue}>NKE28491-TR</Text>
          </View>
        </View>

        {/* Tracking Timeline */}
        <View style={styles.trackingCard}>
          <Text style={styles.sectionTitle}>Tracking Information</Text>
          
          <View style={styles.timeline}>
            {trackingSteps.map((step, index) => (
              <View key={step.id} style={styles.timelineItem}>
                <View style={styles.timelineIconContainer}>
                  {getStepIcon(step)}
                  {index < trackingSteps.length - 1 && (
                    <View style={[
                      styles.timelineConnector, 
                      step.completed ? styles.completedConnector : styles.pendingConnector
                    ]} />
                  )}
                </View>
                
                <View style={styles.timelineContent}>
                  <Text style={[
                    styles.timelineTitle, 
                    step.completed ? styles.completedText : styles.pendingText
                  ]}>
                    {step.title}
                  </Text>
                  <Text style={styles.timelineDescription}>{step.description}</Text>
                  <Text style={styles.timelineDate}>{step.date} • {step.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.itemsCard}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          
          {currentOrder.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemImagePlaceholder}>
                <MaterialCommunityIcons name="shoe-sneaker" size={30} color="#666" />
              </View>
              
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              </View>
              
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>${currentOrder.total.toFixed(2)}</Text>
            </View>
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Shipping</Text>
              <Text style={styles.totalValue}>$0.00</Text>
            </View>
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax</Text>
              <Text style={styles.totalValue}>${(currentOrder.total * 0.08).toFixed(2)}</Text>
            </View>
            
            <View style={[styles.totalRow, styles.grandTotal]}>
              <Text style={styles.grandTotalLabel}>Total</Text>
              <Text style={styles.grandTotalValue}>${(currentOrder.total * 1.08).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/chat/${currentOrder.id}`)}>
            <MaterialIcons name="chat" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Contact Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <MaterialCommunityIcons name="truck-fast" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Track Package</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function to get status color
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moreButton: {
    padding: 5,
  },
  orderSummaryCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  trackingCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  timeline: {
    marginLeft: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineIconContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  timelineConnector: {
    width: 2,
    height: 40,
    marginTop: 5,
  },
  completedConnector: {
    backgroundColor: '#4CAF50',
  },
  pendingConnector: {
    backgroundColor: '#ccc',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  completedText: {
    color: '#4CAF50',
  },
  pendingText: {
    color: '#666',
  },
  timelineDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: 12,
    color: '#999',
  },
  itemsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  totalSection: {
    marginTop: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 14,
  },
  grandTotal: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'deeppink',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'deeppink',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
    marginRight: 0,
    marginLeft: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default OrderDetail;
