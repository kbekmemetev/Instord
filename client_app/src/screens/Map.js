import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import { getRestaurants } from '../http/restaurantAPI'
import { getUserData } from '../http/userAPI'
import {Context} from "../../root";

const Map = () => {

    const [spots, setSpots] = useState()
    const [loading, setLoading] = useState(true)
    const [callout, setCallout] = useState(false)
    const [name, setName] = useState()
    const [hours, setHours] = useState()
    const [address, setAddress] = useState()
    const {user} = useContext(Context)


    const onPressHandle = (name, hours, address) => {
        setName(name)
        setHours(hours)
        setAddress(address)
        setCallout(true)
    }

    useEffect(() => {
        getRestaurants()
        .then(data => setSpots(data))
        .then(() => handleCheckIn(user.info.person_id))
        .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        )
    }

    const handleCheckIn = (id) => {
        getUserData(id)
        .then(data=>{
            if (data.status) {
                user.setIsIn(true)
            } else {
                user.setIsIn(false)
            }
        })   
    }

    return (
        <View style = {styles.container} >
            <MapView
                style = {styles.map}
                onLongPress = {() => {setCallout(false)}}
                initialRegion={{
                    latitude: 56.833332,
                    longitude: 60.603362,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421}} 
            >

                {spots.map(item => (
                    <Marker
                        key={item.restaurant_id}
                        onPress={() => {onPressHandle(item.name, item.work_hours, item.address)}}
                        coordinate = {{
                            latitude: parseFloat(item.coordinates.split(' ')[0]),
                            longitude: parseFloat(item.coordinates.split(' ')[1])}}
                    >

                    <Image source={require('../assets/mapmarker.png')} style = {{width: 50, height: 50}} />
                </Marker> ))}
                    
            </MapView> 

            { callout &&
                <TouchableOpacity
                    onPress={() => {
                        setCallout(true)
                    }} 
                    style={styles.callout}
                >

                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.otherText}>{hours}</Text>
                    <Text style={styles.otherText}>{address}</Text>
                </TouchableOpacity>  
            }

        </View> 
    )
}

 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    map: {
        height: '100%',
        width: '100%'
    },
    
    callout:{
        position: 'absolute',
        width: '90%',
        bottom: 20,
        left: '5%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
    },

    nameText: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    otherText: {
        fontSize: 18,
        color: 'gray',
    },

  });
  

export default Map 