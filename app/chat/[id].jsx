import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { chatData } from '../../data/messageData';

const ChatDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState(null);
  const flatListRef = React.useRef(null);

  // Mock messages for the chat
  const mockMessages = [
    {
      id: 'm1',
      text: 'Hello! How can I help you with your recent order?',
      sender: 'store',
      time: '10:30 AM',
    },
    {
      id: 'm2',
      text: 'Hi, I was wondering when my order will be delivered?',
      sender: 'user',
      time: '10:31 AM',
    },
    {
      id: 'm3',
      text: 'Your order #ORD-39481 is currently being shipped and should arrive by April 5th.',
      sender: 'store',
      time: '10:32 AM',
    },
    {
      id: 'm4',
      text: 'Great! Can I change the delivery address?',
      sender: 'user',
      time: '10:33 AM',
    },
    {
      id: 'm5',
      text: "I'm sorry, but once an order has been shipped, we cannot change the delivery address. However, you can contact our delivery partner directly with your tracking number.",
      sender: 'store',
      time: '10:34 AM',
    },
    {
      id: 'm6',
      text: 'What is my tracking number?',
      sender: 'user',
      time: '10:35 AM',
    },
    {
      id: 'm7',
      text: 'Your tracking number is NKE28491-TR. You can track your package on our website or app.',
      sender: 'store',
      time: '10:36 AM',
    },
  ];

  React.useEffect(() => {
    // Find the current chat based on the ID
    const chat = chatData.find(chat => chat.id === id);
    if (chat) {
      setCurrentChat(chat);
    }
    
    // Set mock messages
    setChatMessages(mockMessages);
    
    // Scroll to bottom of chat
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: false });
      }
    }, 200);
  }, [id]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: `m${chatMessages.length + 1}`,
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessage('');
    
    // Simulate store response after a short delay
    setTimeout(() => {
      const storeResponse = {
        id: `m${chatMessages.length + 2}`,
        text: "Thank you for your message. Our customer service team will get back to you shortly.",
        sender: 'store',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setChatMessages(prevMessages => [...prevMessages, storeResponse]);
      
      // Scroll to bottom
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 1000);
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble, 
      item.sender === 'user' ? styles.userMessage : styles.storeMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Chat Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        {currentChat && (
          <View style={styles.chatInfo}>
            <Image source={{ uri: currentChat.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.chatName}>{currentChat.name}</Text>
              <View style={styles.statusContainer}>
                {currentChat.isOnline ? (
                  <>
                    <View style={styles.onlineIndicator} />
                    <Text style={styles.statusText}>Online</Text>
                  </>
                ) : (
                  <Text style={styles.statusText}>Offline</Text>
                )}
              </View>
            </View>
          </View>
        )}
        
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={chatMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        onLayout={() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: false });
          }
        }}
      />
      
      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={24} color="#666" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            multiline
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Ionicons name="send" size={20} color={message.trim() ? "#fff" : "#aaa"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  moreButton: {
    padding: 5,
  },
  messagesContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  storeMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageTime: {
    fontSize: 11,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 10,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachButton: {
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: 'deeppink',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
});

export default ChatDetail;
