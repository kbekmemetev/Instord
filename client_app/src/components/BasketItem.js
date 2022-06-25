import React, {useEffect, useState} from 'react'
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import { deleteFromBasket } from '../http/basketAPI'
import { getDish } from '../http/itemAPI'


const BasketItem = ({basket_item}) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()

    useEffect(() => {
        getDish(basket_item.item_id)
        .then(data => setData(data))
        .finally(() => setLoading(false))
    }, [])

    const handleDelete = () => {
        deleteFromBasket(basket_item.bi_id)
    }

    if (loading) {
        return (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        )
    }


    return (
        <View style={styles.menuItem} >
        <View style={styles.imageContainer} > 
            <Image style={styles.image}  source={{uri: 'http://192.168.0.101:8000/' + data.image}} />
        </View>
        <View style={styles.rowContainer}>
            <View style={styles.row}>  
                <Text style={styles.title}> {data.name} </Text>
                <TouchableOpacity onPress={() => handleDelete()} style={{width: 25, height: 25}}><Image style={styles.delete} source={require('../assets/delete.png')} /></TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={styles.cost} >{data.price}₽</Text>
        </View>
        </View>
    </View>

    )


    
}

const styles = StyleSheet.create({

    menuItem: {
        width: '90%',
        marginLeft: '5%',
        height: 120,
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10
    },

    imageContainer: {
        height: '100%',
        aspectRatio: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        height: 80,
        width: 80
    },

    rowContainer: {
        height: '100%',
        width: '70%',
        padding: 10
    },

    row: {
        paddingLeft: 10,
        height: '50%',
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    title:{
        fontSize: 20
    },

    delete:{
        width: 25,
        height: 25
    },

    cost: {
        fontSize: 20,
        alignSelf: 'flex-end'
    },

});

export default BasketItem
