import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from '../screen/Login'
import Register from '../screen/register';

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name="Login" options={{ headerShown: false }} />
      <Stack.Screen component={Register} name="Register" options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}

export default AuthNavigator;
