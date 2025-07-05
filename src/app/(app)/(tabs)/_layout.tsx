import React from 'react'
import {Tabs} from "expo-router";

import { AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

function Layout() {
  const { user } = useUser();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, size }) =>
            user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={{ width: 28, height: 28, borderRadius: 100 }}
              />
            ) : (
              <AntDesign name="home" color={color} size={size} />
            ),
        }}
      />


<Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: 'history',
          tabBarIcon: ({ color, size }) =>
            user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={{ width: 28, height: 28, borderRadius: 100 }}
              />
            ) : (
              <AntDesign name="home" color={color} size={size} />
            ),
        }}
      />


<Tabs.Screen
        name="workout"
        options={{
          headerShown: false,
          title: 'workout',
          tabBarIcon: ({ color, size }) =>
            user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={{ width: 28, height: 28, borderRadius: 100 }}
              />
            ) : (
              <AntDesign name="home" color={color} size={size} />
            ),
        }}
      />


<Tabs.Screen
        name="active-workout"
        options={{
          headerShown: false,
          title: "active-workout",
          tabBarIcon: ({ color, size }) =>
            user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={{ width: 28, height: 28, borderRadius: 100 }}
              />
            ) : (
              <AntDesign name="home" color={color} size={size} />
            ),
        }}
      />
  


<Tabs.Screen
        name="Profile/index"
        options={{
          headerShown: false,
          title: "Profile",
         

          // tabBarIcon: ({ color, size }) =>
          //   user?.imageUrl ? (
          //     <Image
          //       source={{ uri: user.imageUrl }}
          //       style={{ width: 28, height: 28, borderRadius: 100 }}
          //     />
          //   ) : (
          //     <AntDesign name="home" color={color} size={size} />
          //   ),
        }}
      />
      </Tabs>
  );
}
export default Layout
