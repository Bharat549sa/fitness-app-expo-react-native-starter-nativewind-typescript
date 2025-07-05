import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import {useAuth} from "@clerk/clerk-expo";
import { ActivityIndicator } from 'react-native';


const Layout = () => {
 

  const {isLoaded, isSignedIn, userId, sessionId, getToken} = useAuth();

  console.log("issignedin >>>", isSignedIn);

  if(!isLoaded){
return(
  <View className="flex-1 items-center jusfiy-center">
    <ActivityIndicator size="large" color="#0000ff"/>

  </View>
)
  }
  return (

   

   
    <Stack >
  
  <Stack.Protected guard={isSignedIn}>
    <Stack.Screen name="(tabs)" options ={{ headerShown: false}} />
  
  
  </Stack.Protected>
  <Stack.Protected guard={!isSignedIn}>
  
   <Stack.Screen name="sign-in" options ={{ headerShown: false}} />
   <Stack.Screen name="sign-up" options ={{ headerShown: false}} />

  
  </Stack.Protected>
    </Stack>
    );
  }



export default Layout