import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import NewPost from '../pages/NewPost';
import PostsUser from '../pages/PostsUser';
import NewAnswer from '../pages/NewAnswer';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='NewPost'
        component={NewPost}
        options={{
          title: 'Novo Post',
          headerTintColor: '#FFF',
          headerStyle:{
            backgroundColor: 'black'
          }
        }}
      />
      
      <Stack.Screen
        name='NewAnswer'
        component={NewAnswer}
        options={{
          title: 'Resposta',
          headerTintColor: '#FFF',
          headerStyle:{
            backgroundColor: 'black'
          }
        }}
      />

    <Stack.Screen
        name='PostsUser'
        component={PostsUser}
        options={{
          headerTintColor: '#FFF',
          headerStyle:{
            backgroundColor: 'black'
          }
        }}
      />

    </Stack.Navigator>
  )
}

function AppRoutes(){
  return(
    <Tab.Navigator
      screenOptions={{
        hederShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'orange',

        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0
        }
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackRoutes}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" color={color} size={size} />
          }
        }}
        />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Feather name="search" color={color} size={size} />
          }
        }}  
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" color={color} size={size} />
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default AppRoutes;