import React, {useContext, useState, useEffect} from 'react'
import { Text, View, StyleSheet, FlatList, RefreshControl, TouchableOpacity} from 'react-native'
import OrderItem from '../components/OrderItem'
import OrderItemServed from '../components/OrderItemServed'
import { getOrderItemsByClientID, getServedOrderItemsByClientID, callWaiter } from '../http/orderAPI'
import { getUserData } from '../http/userAPI'
import { getDish } from '../http/itemAPI'
import {Context} from "../../root";
import {observer} from "mobx-react-lite";

const CompleteOrder = observer(({navigation, route}) => {


    const {user} = useContext(Context)
    const [orderItems, setOrderItems] = useState([])
    const [orderServedItems, setOrderServedItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [totalCost, setTotalCost] = useState(0)
    let isNull = true


    try {
        if (orderItems || orderServedItems) {
          isNull = false
        }    
      } catch (e) {
        console.log(e);
    }

    function getTotalPrice () {
        let total = 0
        const all_oi = [...orderItems, ...orderServedItems]

        for (let i = 0; i < all_oi.length; i++) {
            getDish(all_oi[i].item_id)
            .then(data => {
                total = total + data.price
                setTotalCost(total)
            })
        }
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


    useEffect(() => {
        handleCheckIn(user.info.person_id)
        getOrderItemsByClientID(user.info.person_id)
        .then(data => setOrderItems(data))
        .then(getServedOrderItemsByClientID(user.info.person_id)
        .then(data => setOrderServedItems(data)))
        .then(getTotalPrice())
        .finally(() => setLoading(false))
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        getOrderItemsByClientID(user.info.person_id)
        .then(data => setOrderItems(data))
        .then(getServedOrderItemsByClientID(user.info.person_id)
        .then(data => setOrderServedItems(data)))
        .then(getTotalPrice())
        .finally(() => setRefreshing(false))
    }

    const handleWaiterCall = () => {
        callWaiter(user.info.person_id)
    }

    if (loading) {
        return (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        )
    }

    return (
        <View style={styles.container}>

            { !isNull && 
            
            <View style={{marginBottom: 119}}>

                <FlatList 
                    style={{width: '100%'}}
                    keyExtractor={(item) => item.oi_id}
                    data = {orderItems}
                    refreshControl = {
                        <RefreshControl
                        refreshing = {refreshing}
                        onRefresh = {onRefresh}
                    />}

                    renderItem={({item}) => (      
                        <OrderItem itemID={item.item_id} orderID = {item.oi_id}/>
                    )}
                />
                
                <FlatList 
                style={{width: '100%'}}
                keyExtractor={(item) => item.oi_id}
                data = {orderServedItems}
                refreshControl = {
                    <RefreshControl
                    refreshing = {refreshing}
                    onRefresh = {onRefresh}
                    />}

                renderItem={({item}) => (
                            
                    <OrderItemServed itemID={item.item_id} orderID = {item.oi_id}/>

                )}
                />


            </View>
            } 

            <View style={styles.bottom} >

                <View style={styles.totalContainer}>  
                    <Text style={styles.totalText} >ИТОГО</Text>
                    <Text style={styles.totalText} >{totalCost}₽</Text>
                </View> 

                <View style={styles.buttonContainer} >

                    <TouchableOpacity onPress = {() => handleWaiterCall()} style={styles.button} >
                        <Text style={styles.buttonText} > Позвать официанта </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {() => handleWaiterCall()} style={styles.button} >
                        <Text style={styles.buttonText} > Попросить счет </Text>
                    </TouchableOpacity>

                </View>

            </View>
                            
                       
            
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        flex: 1
    },

    noOrders: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 300

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
        justifyContent: 'space-around',
        marginBottom: 10,
        backgroundColor: "#d6dfff"
    },

    orderName: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottom: {
        position: 'absolute',
        width: '100%',
        paddingBottom: 10,
        borderTopColor: 'gray',
        borderStyle: 'solid',
        borderTopWidth: 1,
        height: 120,
        backgroundColor: '#fff',
        bottom: 0,
        alignItems: 'center'
    },

    totalContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15,
        paddingLeft: 15,
        height: '50%',
        alignItems: 'center',
    },

    totalText: {
        fontSize: 18,
    },

    buttonContainer: {
        width: '95%',
        height: '50%',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        height: '80%',
        width: '49%',
        backgroundColor: '#007125',
        borderRadius: 25,

    },

    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '300',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

  });

export default CompleteOrder
