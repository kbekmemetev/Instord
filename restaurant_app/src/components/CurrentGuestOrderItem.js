import React, {useEffect, useState} from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native"
import { getOrderItem, deleteFromOrder, dishServed } from '../http/orderAPI'
import { getDish } from '../http/itemAPI'



const CurrentGuestOrderItem = ({orderID, itemID}) => {

    const [loading, setLoading] = useState(true)
    const [orderInfo, setOrderInfo] = useState()
    const [itemInfo, setItemInfo] = useState()

    useEffect(() => {
        getOrderItem(orderID).then(data => setOrderInfo(data))
        .then(getDish(itemID).then(data => setItemInfo(data)))
        .finally(() => setLoading(false))
    }, [])

    const handleServed = () => {
        dishServed(orderID)
    }
    
    const handleDelete = () => {
        deleteFromOrder(orderID)
    }

    if (loading) {
        return (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        )
    }

    function getTimePassed (start) {
        let now = new Date()
        now = now.getTime()
        let diff = now - start
        diff = Math.floor(diff/(1000 * 60))
        return diff

    }

    

    return (

        <View>
        { (orderInfo && itemInfo) ? <Collapse style = {styles.collapse}>
                    <CollapseHeader style = {styles.orderItemHeader} >
                    <View style = {styles.orderItemRow} >
                        <Text style = {styles.orderItemTextHeader} > {itemInfo.name} </Text>
                        <Text style = {styles.orderItemTextHeader} >{getTimePassed(orderInfo.time_ms)} мин</Text>
                    </View>
                    </CollapseHeader>
                    <CollapseBody style = {styles.orderItemMore}>
                        <View style = {styles.orderItemRow} >
                            <Text style = {styles.orderItemText} >Время заказа</Text>
                            <Text style = {styles.orderItemText} > {orderInfo.time.substring(0,5)} </Text>
                        </View>
                        <View style = {styles.orderItemRow} >
                            <Text style = {styles.orderItemText} >Цена</Text>
                            <Text style = {styles.orderItemText} >{itemInfo.price} ₽</Text>
                        </View>
                        <View style = {styles.orderItemRow} >
                        <TouchableOpacity onPress={() => handleServed()}><Text style = {styles.orderItemServed} >Подано</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete()}><Text style = {styles.orderItemDelete} >Удалить из заказа</Text></TouchableOpacity>
                        </View>
                    </CollapseBody>
                </Collapse> : <Text>Loading</Text> }
        </View>
        )

    
}

const styles = StyleSheet.create({

    collapse: {
        backgroundColor: '#fff',
        width: '100%',
        backgroundColor: '#fff',
        borderBottomColor: '#454545',
        borderBottomWidth: 1,
    },

    orderItemHeader: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomColor: '#454545',
        borderBottomWidth: 1,
    },

    orderItemRow: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },

    orderItemMore:{
        width: '100%',
        padding: 10,
    },

    orderItemTextHeader: {
        fontSize: 20,
        maxWidth: '50%'
    },

    orderItemText: {
        fontSize: 16,
        paddingBottom: 15,
    },

    orderItemServed:{
        fontSize: 20,
        fontWeight: '500',
        color: 'blue',

    },
    
    orderItemDelete:{
        fontSize: 20,
        fontWeight: '500',
        color: 'red',
    },

  });

export default CurrentGuestOrderItem
