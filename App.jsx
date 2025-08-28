import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './src/screens/Home';
import Pets from './src/screens/Pets';
import AddPet from './src/screens/AddPet';
import SavedPets from './src/screens/SavedPets';
import Profile from './src/screens/Profile';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import PetDetails from './src/screens/PetDetails';

import HomeIcon from 'react-native-vector-icons/AntDesign';
import Paw from 'react-native-vector-icons/Ionicons';
import PlusIcon from 'react-native-vector-icons/Entypo';
import SavedIcon from 'react-native-vector-icons/FontAwesome';
import ProfileIcon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) return null;


  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={
        {
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: '#7D5DA1',
          tabBarActiveTintColor: '#7D5DA1',
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderRadius: 25,
            paddingBottom: 13,
            paddingTop: 15,
            paddingHorizontal: 20,
            backgroundColor: 'white',
            position: 'absolute',
            borderTopWidth: 0,
            elevation: 3,
          }
        }
      }
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarIcon: () => (
            <HomeIcon name="home" size={30} color="#7D5DA1" />
          )
        }}
      />
      <Tab.Screen name="Pets" component={Pets}
        options={{
          tabBarIcon: () => (
            <Paw name="paw-outline" size={30} color="#7D5DA1" />
          )
        }}
      />
      <Tab.Screen name="Add Pet" component={AddPet}
        options={{
          tabBarIconStyle: {
            backgroundColor: '#D6D0EE',
            width: 45,
            height: 45,
            borderRadius: 100,
          },
          tabBarIcon: () => (
            <PlusIcon name="plus" size={30} color="#7D5DA1" />
          )
        }}
      />
      <Tab.Screen name="Saved Pets" component={SavedPets}
        options={{
          tabBarIcon: () => (
            <SavedIcon name="bookmark-o" size={30} color="#7D5DA1" />
          )
        }}
      />
      <Tab.Screen name="Profile"
        options={{
          tabBarIcon: () => (
            <ProfileIcon name="user" size={30} color="#7D5DA1" />
          )
        }}
      >
      {(props) => <Profile {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  )

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        ) : (
          <>
            <Stack.Screen name='Login'>
              {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name='SignUp'>
              {(props) => <SignUp {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          </>
        )}
        <Stack.Screen name='PetDetails' component={PetDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
