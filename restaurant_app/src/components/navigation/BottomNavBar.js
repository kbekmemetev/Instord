import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {CurrentGuests, CurrentOrders, QRReader, Settings} from "../../screens"
import { Image, Text, View } from 'react-native';


const Tab = createBottomTabNavigator()

const BottomNavBar = () => {
    return(
        <Tab.Navigator
        tabBarOptions={{
            showLabel: false
        }}>
            <Tab.Screen name="CurrentGuests" component={CurrentGuests} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../../assets/guests.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Guests</Text>
                    </View>
                )
            }}/>
            
            <Tab.Screen name="QRReader" component={QRReader} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../../assets/qr.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>QR</Text>
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

export default BottomNavBar


/* < Tab.Screen name="CurrentOrders" component={CurrentOrders} options={{
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
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Orders</Text>
                    </View>
                )
            }} /> */
