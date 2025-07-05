import { Stack } from "expo-router";
import React from "react";

import {useAuth} from "@clerk/clerk-expo";

function Layout() {
  const {isLoaded, isSignedIn, userId, sessionId, getToken} = useAuth();

  return (
  <Stack >

{/* <Stack.Protected guard={isSignedIn}>
  <Stack.Screen name="(tabs)" options ={{ headerShown: false}} />


</Stack.Protected>
<Stack.Protected guard=(@signedIn)>

</Stack.Protected> */}
  </Stack>
  );
}

export default Layout;
