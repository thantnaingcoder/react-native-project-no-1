import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const ConnectivityStatus = () => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    //   console.log('Connection type', state.type);
    //   console.log('Is connected?', state.isConnected);
    });

    // Fetch the current network state once
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    // Cleanup the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <Text style={{ textAlign: 'center' }}>
        {isConnected === null
          ? <Text style={{ color: 'yellow' }}>Checking connectivity...</Text>
          : isConnected
          ? <Text style={{ color: 'green' }}>You are online</Text>
          : <Text style={{ color: 'red' }}>No internet connection</Text>}
      </Text>
    </View>
  );
};

export default ConnectivityStatus;
