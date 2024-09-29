import { Stack } from 'expo-router/stack';




export default function Layout() {
  return (
    <Stack options={{ headerShown: false }} >
      <Stack.Screen name="(tabs)"  options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{ headerShown: true, title: 'Chat' }} />
      <Stack.Screen name="order" options={{ headerShown: true,title: 'Order' }} />
      
     
      
     
      
    </Stack>
  );
}
