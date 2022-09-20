import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import Home from '../screen/Home';
import DetailMovie from '../screen/DetailMovie'
import BookingPage from '../screen/BookingPage';
import Payment from '../screen/Payment';
import Profile from '../screen/Profile';
import DetailAccount from '../screen/DetailAccount';
import History from '../screen/History';

import DrawerContent from '../components/DrawerContent';
import { Button } from 'react-native';

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home} name="Home"
        options={{ headerShown: false }} />
      <Stack.Screen
        component={DetailMovie} name="DetailMovie"
        options={{ headerShown: false, title: 'Detail Movie' }}
      />
      <Stack.Screen
        component={BookingPage} name="BookingPage"
        options={{ headerShown: false, title: 'Booking Page' }}
      />
      <Stack.Screen
        component={Payment} name="Payment"
        options={{ headerShown: false, title: 'Payment Page' }}
      />
    </Stack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Profile} name="Profile"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={DetailAccount} name="DetailAccount"
        options={{ headerShown: false, title: 'Detail Account Page' }}
      />
      <Stack.Screen
        component={History} name="History"
        options={{ headerShown: false, title: 'History Page' }}
      />
    </Stack.Navigator>
  );
}




function AppNavigator() {
  return (
    <Drawer.Navigator screenOptions={{
      drawerPosition: 'right', swipeEnabled: true,
    }} drawerContent={props => < DrawerContent {...props} />} >
      < Drawer.Screen
        component={HomeNavigator}
        name="HomeNavigator"
        options={{
          title: 'Home',
          drawerIcon: ({ size, color }) => (
            <Icon name='home' size={size} />
          ),
        }}
      />
      <Drawer.Screen
        component={ProfileNavigator}
        name="ProfileNavigator"
        options={{
          title: 'Profile',
          drawerIcon: ({ size, color }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator >
  );
}

export default AppNavigator;
