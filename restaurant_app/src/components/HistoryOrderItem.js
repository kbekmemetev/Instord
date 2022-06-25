import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../http/userAPI'
import {observer} from "mobx-react-lite";


const HistoryOrderItem = observer(({order}) => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState()

    useEffect(() => {
        getUserData(order.person_id)
        .then(data => setEmail(data.email))
        .finally(() => setLoading(false))
        .catch(error => console.log('Error:', error))
    }, [])

    if (loading) {
        return (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        )
    }

    return (
        <TouchableOpacity  style={styles.order} onPress={() => navigation.navigate('Order', order.order_id)}>
            <View style={styles.orderName}>
                <Text style={{fontSize: 18}}>{email}</Text>
            </View>
            <View style={styles.orderName}>
                <Text style={styles.orderDate}>{order.time}</Text>
                <Text style={styles.orderSum}>{order.total_price}₽</Text>
            </View>
        </TouchableOpacity>
    );

  

})

const styles = StyleSheet.create({
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

export default HistoryOrderItem;
