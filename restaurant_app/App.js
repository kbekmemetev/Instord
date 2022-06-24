import React, {useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavBar from './src/components/navigation/BottomNavBar'
import { createStackNavigator } from '@react-navigation/stack'
import {observer} from "mobx-react-lite"
import {Context} from "./root";

import {
  Login, SignUp, RestaurantSignUp, 
  ClientCheckIn, CurrentGuests, Guest, EditProfile, MenuConstructor, NewCategory, NewDish, Order, OrderHistory, QRReader, Settings, Support, Dish, EditDish, EditCategory
} from './src/screens'

const Stack = createStackNavigator()


const App = observer(() => {

  const {user} = useContext(Context)

  function Home({ navigation }) {
    return (
      <BottomNavBar />
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
        <Stack.Screen name="RestaurantSignUp" component={RestaurantSignUp} />
        </Stack.Navigator>
      </NavigationContainer>
      
      )
  } else {
    return (
      <SafeAreaProvider>
      
        <NavigationContainer>

          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: true,
            }}
          >
            <Stack.Screen name="Home" component={Home} options={{
            headerShown: false}}/>
            <Stack.Screen name="ClientCheckIn" component={ClientCheckIn} />
            <Stack.Screen name="CurrentGuests" component={CurrentGuests} />
            <Stack.Screen name="Guest" component={Guest} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="MenuConstructor" component={MenuConstructor} />
            <Stack.Screen name="NewCategory" component={NewCategory} />  
            <Stack.Screen name="NewDish" component={NewDish} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="QRReader" component={QRReader} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="Dish" component={Dish} />
            <Stack.Screen name="EditDish" component={EditDish} />
            <Stack.Screen name="EditCategory" component={EditCategory} />
          </Stack.Navigator>


          

        </NavigationContainer>
        
        <StatusBar style="auto" />
        
      </SafeAreaProvider>
  );
  }


})

export default App