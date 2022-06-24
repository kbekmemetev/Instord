import React, {useContext, useState, useEffect} from 'react'
import { Text, TouchableOpacity, View, StyleSheet, FlatList, RefreshControl } from 'react-native'
import BasketItem from '../components/BasketItem'
import { getBasketItems, CarttoOrder } from '../http/basketAPI'
import { getDish } from '../http/itemAPI'
import { getUserData } from '../http/userAPI'
import {Context} from "../../root";
import {observer} from "mobx-react-lite";

const Basket = observer(({navigation}) => {

    const {user} = useContext(Context)
    const [basketItems, setBasketItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [totalCost, setTotalCost] = useState(0)

    const handleOrder = () => {
        CarttoOrder(user.info.person_id)
        .then(navigation.navigate('CompleteOrder'))
    }

    

    function getTotalPrice() {
        let total = 0

        for (let i = 0; i < basketItems.length; i++) {
            getDish(basketItems[i].item_id)
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
        getBasketItems(user.info.person_id)
        .then(data => setBasketItems(data))
        .then(getTotalPrice())
        .finally(() => setLoading(false))
    }, [])


    const onRefresh = () => {
        setRefreshing(true)
        getBasketItems(user.info.person_id)
        .then(data => setBasketItems(data))
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
        <View style={{flex: 1, backgroundColor: '#fff'}} >
            <View style={styles.body}>
                <FlatList 
                    style={{width: '100%',minHeight:300, marginBottom: 119}}
                    keyExtractor={(item) => item.bi_id}
                    data = {basketItems}
                    refreshControl = {
                        <RefreshControl
                        refreshing = {refreshing}
                        onRefresh = {onRefresh}
                    />}

                    renderItem={({item}) => (    
                        <BasketItem basket_item={item} />
                    )}
                />
                
            </View>


            <View style={styles.bottom} >
                <View style={styles.totalContainer}>  
                    <Text style={styles.totalText} >ИТОГО</Text>
                    <Text style={styles.totalText} >{totalCost}₽</Text>
                </View> 
                <View style={styles.buttonContainer} >
                    <TouchableOpacity onPress={() => handleOrder()} style={styles.button} >
                        <Text style={styles.buttonText} >Заказать</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
})

const styles = StyleSheet.create({

    body: {
        backgroundColor: '#ffffff',
        width: '100%'
    },

    scrollView: {
        width: '100%'
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

export default Basket
