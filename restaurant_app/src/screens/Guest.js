import React, { useState, useEffect} from 'react'
import { Text, View, StyleSheet, FlatList, RefreshControl, TouchableOpacity} from 'react-native'
import CurrentGuestOrderItem from '../components/CurrentGuestOrderItem'
import CurrentGuestOrderItemServed from '../components/CurrentGuestOrderItemServed'
import { getOrderItemsByClientID, getServedOrderItemsByClientID, waiterArrived, finishOrder } from '../http/orderAPI'
import { getDish } from '../http/itemAPI'

const Guest = ({navigation, route}) => {

    const [orderItems, setOrderItems] = useState()
    const [orderServedItems, setOrderServedItems] = useState()
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [totalCost, setTotalCost] = useState(0)
    let isNull = true
    const { personID, tableNumber } = route.params;


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

    const handleCompleteOrder = () => {
        finishOrder(personID)
        .then(navigation.navigate('CurrentGuests'))
    }


    useEffect(() => {
        getOrderItemsByClientID(personID)
        .then(data => setOrderItems(data))
        .then(getServedOrderItemsByClientID(personID).
        then(data => setOrderServedItems(data)))
        .then(waiterArrived(personID))
        .finally(() => setLoading(false))
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        getOrderItemsByClientID(personID).
        then(data => setOrderItems(data))
        .then(getServedOrderItemsByClientID(personID)
        .then(data => setOrderServedItems(data)))
        .then(getTotalPrice())
        .finally(() => setRefreshing(false))
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
            <View style={styles.order}>
                {/* <View style={styles.orderName}>
                    <Text style={{fontSize: 18}}>Ana</Text>
                 </View> */}
                <View style={styles.orderName}>
                    <Text style={{fontSize: 35, height: '75%'}}>{tableNumber}</Text>
                    <Text style={{fontSize: 12, height: '25%'}}>стол</Text>
                </View>
            </View>

            { !isNull && <View style={{marginBottom:119}}>
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
                            
                    <CurrentGuestOrderItem itemID={item.item_id} orderID = {item.oi_id}/>

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
                            
                    <CurrentGuestOrderItemServed itemID={item.item_id} orderID = {item.oi_id}/>

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
                    <TouchableOpacity onPress =  {() => handleCompleteOrder()} style={styles.button} >
                        <Text style={styles.buttonText} > Рассчитать </Text>
                    </TouchableOpacity>
                </View>
            </View> 

                            
                       
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
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
        width: '100%',
        height: '50%',
        alignItems: 'center',
    },

    button: {
        height: '80%',
        width: '70%',
        backgroundColor: '#007125',
        borderRadius: 25,

    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '300',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

  });

export default Guest
