import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Menu, Basket, Settings, CompleteOrder} from "../../screens"
import { Image, Text, View } from 'react-native';


const Tab = createBottomTabNavigator()

const NavBarIn = () => {
    return(
        <Tab.Navigator
        tabBarOptions={{
            showLabel: false
        }}>
            <Tab.Screen name="Menu" component={Menu} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../../assets/menu.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Menu</Text>
                    </View>
                )
            }}/>
            
            <Tab.Screen name="Basket" component={Basket} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../../assets/basket.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Basket</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="CompleteOrder" component={CompleteOrder} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../../assets/order.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>CompleteOrder</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../../assets/Settings.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Settings</Text>
                    </View>
                )
            }}/>
        </Tab.Navigator>
    )
}

export default NavBarIn

