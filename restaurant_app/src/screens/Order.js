import React, { useEffect, useState} from 'react'
import { Text, View, StyleSheet, FlatList, RefreshControl  } from 'react-native';
import { getOrderByID, getOrderItemsByOrderID } from '../http/orderAPI';
import { getUserData } from '../http/userAPI'
import {observer} from "mobx-react-lite";
import OrderPosition from '../components/OrderPosition';

const Order = observer(({navigation, route}) => {

    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [order, setOrder] = useState()
    const [orderItem, setOrderItem] = useState()

    if (loading) {
        return (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        )
    }

    useEffect(() => {
        getOrderByID(route.params)
        .then(data => setOrder(data))
        .then(getOrderItemsByOrderID(route.params)
        .then(data => setOrderItem(data)))
        .then(getName())
        .finally(() => setLoading(false))
        .catch(error => console.log('Error:', error))

    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        getOrderByID(route.params).then(data => setOrder(data))
        .then(getOrderItemsByOrderID(route.params).then(data => setOrderItem(data)))
        .then(getName())
        .finally(() => setRefreshing(false))
        .catch(error => console.log('Error:', error))

    }

    const [name, setName] = useState()

    const getName = () => {

        try {
            getUserData(order.person_id)
            .then(data => setName(data.email))
        } catch (error) {
            console.log(error)
        }

        return(name)
    }

    return (
        <View style={styles.container}>

            <View style={styles.order}>
                <View style={styles.orderName}>
                    <Text style={{fontSize: 18}}>{name}</Text>
                </View>
                <View style={styles.orderName}>
                    <Text style={{fontSize: 18}}>{order.time.split(' ')[1]}</Text>
                </View>
            </View>

            <FlatList 
            data = {orderItem}
            style={{width: '100%'}} 
            keyExtractor={(item) => item.oi_id}
            refreshControl = {
                <RefreshControl
                refreshing = {refreshing}
                onRefresh = {onRefresh}
            />}
            renderItem={({item}) => (

            <OrderPosition itemID = {item.item_id} />

            )}/>
            
            
            
            <View style={styles.orderTotal}>
                <View style={styles.orderName}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>ИТОГО - {order.total}₽</Text>
                </View>
            </View> 
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      height: '100%'
    },
    order: {
        width: '100%',
        height: 60,
        shadowColor: "#20344B",
        shadowOffset: {
            width: 2,
            height: 7
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    orderTotal: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 40,
        shadowColor: "#20344B",
        shadowOffset: {
            height: -7
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 15
    },

    orderItem: {
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    orderName: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
  });

export default Order
