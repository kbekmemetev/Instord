import React, {useState, useContext, useEffect} from 'react'
import {Text, StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import HistoryOrderItem from '../components/HistoryOrderItem';
import { getOrderHistoryRestaurant } from '../http/orderAPI';
import { getUserData } from '../http/userAPI'
import {Context} from "../../root";
import {observer} from "mobx-react-lite";

const OrderHistory = observer(({navigation}) => {

    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [order, setOrder] = useState()

    
    useEffect(() => {
        getOrderHistoryRestaurant(user.info.person_id)
        .then(data => setOrder(data))
        .finally(() => setLoading(false))
        .catch(error => console.log('Error:', error))

    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        getOrderHistoryRestaurant(user.info.person_id)
        .then(data => setOrder(data))
        .finally(() => setRefreshing(false))
        .catch(error => console.log('Error:', error))

    }

    const [name, setName] = useState()

    const getName = (id) => {
        getUserData(id).then(data => setName(data.email))
        return(name)
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

            <FlatList 
            data = {order}
            style={{width: '100%'}} 
            keyExtractor={(item) => item.order_id}
            refreshControl = {
                <RefreshControl
                    refreshing = {refreshing}
                    onRefresh = {onRefresh}
                />}
            renderItem={({item}) => (
                <HistoryOrderItem order = {item} />
            )}/>

        </View>
    )
}) 

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      height: '100%'
    },
    order: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 70,
        borderRadius: 15,
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
        marginTop: 10,
        marginBottom: 10
    },
    orderName: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderDate: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        color: "#697A8B",
        height: '40%'
    },
    orderSum: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        height: '40%'
        
    }


  });

export default OrderHistory
