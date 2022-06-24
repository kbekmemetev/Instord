import React, {useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import NavBarIn from './src/components/navigation/NavBarIn'
import NavBarOut from './src/components/navigation/NavBarOut'
import { createStackNavigator } from '@react-navigation/stack'
import {observer} from "mobx-react-lite"
import {Context} from "./root";

import {
  Login, SignUp,  
  Map, Order, OrderHistory, ProfileEdit, QRCode, Settings, Support,
  Basket, Menu, MenuItem, CompleteOrder
} from './src/screens'

const Stack = createStackNavigator()

const App = observer(() => {

  const {user} = useContext(Context)

  function Main({ navigation }) {
    return (
      <NavBarIn />
    ); 
  }
 
  function Out({ navigation }) {
    return (
      <NavBarOut />
    ); 
  }

  if (!user.isAuth){
      return(
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
      )
  } else if (user.isIn){
    return (
      <SafeAreaProvider>
        <NavigationContainer>

          <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
              headerShown: true,
            }}
          >
            <Stack.Screen name="Main" component={Main} options={{
            headerShown: false}}/>
            <Stack.Screen name="Basket" component={Basket} />
            <Stack.Screen name="CompleteOrder" component={CompleteOrder} />
            <Stack.Screen name="Menu" component={Menu} options={{
            headerShown: false}}/>
            <Stack.Screen name="MenuItem" component={MenuItem} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Support" component={Support} />

          </Stack.Navigator>


          

        </NavigationContainer>
        
        <StatusBar style="auto" />
      </SafeAreaProvider>
  );
  } else {
    {
      return (
        <SafeAreaProvider>
          <NavigationContainer>
  
            <Stack.Navigator
              initialRouteName="Out"
              screenOptions={{
                headerShown: true,
              }}
            >
              <Stack.Screen name="Out" component={Out} options={{
              headerShown: false}}/>
              <Stack.Screen name="Map" component={Map} />
              <Stack.Screen name="Order" component={Order} />
              <Stack.Screen name="OrderHistory" component={OrderHistory} />
              <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
              <Stack.Screen name="QRCode" component={QRCode} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Support" component={Support} />

            </Stack.Navigator>
          </NavigationContainer>  
          <StatusBar style="auto" />
        </SafeAreaProvider>
    );
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App