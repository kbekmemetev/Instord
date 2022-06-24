import React, { useEffect, useState} from 'react'
import { Text, View, StyleSheet} from 'react-native';
import { getDish } from '../http/itemAPI';


const OrderPosition = ({itemID}) => {

    const [loading, setLoading] = useState(true)
    const [dish, setDish] = useState()

    useEffect(() => {
        getDish(itemID)
        .then(data => setDish(data))
        .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        )
      }


    return (

        <View style={styles.orderItem}>
            <View style={styles.orderName}>
                <Text style={{fontSize: 16}}>{dish.name}</Text>
            </View>
            <View style={styles.orderName}>
                <Text style={{fontSize: 16}}>{dish.price}₽</Text>
            </View>
        </View> 
    
    )
};

const styles = StyleSheet.create({

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

export default OrderPosition;
