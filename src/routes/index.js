import React, {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { Auth } from '../contexts/Auth';


function Routes(){
  const { isAuthenticated, loading } = useContext(Auth);
  

  if(loading){
    return(
      <View 
      style={{
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#36393F'
      }}>
        <ActivityIndicator size={50} color="#E52246" />
      </View>
    )
  }
  
  return(
    isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
  )
}

export default Routes;