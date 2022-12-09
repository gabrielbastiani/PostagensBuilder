import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../pages/Login';
import RecoverySenha from '../pages/RecoverySenha';

const Stack = createNativeStackNavigator();

function AuthRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="RecoverySenha"
        component={RecoverySenha}
        options={{
          title: 'Login'
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthRoutes;