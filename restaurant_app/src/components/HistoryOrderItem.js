import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {observer} from "mobx-react-lite";


const HistoryOrderItem = observer(({orderID, orderTotal, orderClientEmail, orderTime}) => {

    const navigation = useNavigation();

    return (
    
        <TouchableOpacity  style={styles.order} onPress={() => navigation.navigate('Order', orderID)}>
            <View style={styles.orderName}>
                <Text style={{fontSize: 18}}>{orderClientEmail}</Text>
            </View>
            <View style={styles.orderName}>
                <Text style={styles.orderDate}>{orderTime}</Text>
                <Text style={styles.orderSum}>{orderTotal}₽</Text>
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
