import React, {useContext} from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { addToBasket } from '../http/basketAPI'
import {Context} from "../../root";
import {observer} from "mobx-react-lite";

const MenuItem = observer(({navigation, route}) => {

    const {user} = useContext(Context)
    console.log(route.params)

    const addToCartHandle = () => {
        addToBasket(user.info.person_id, route.params.item_id)
    }

    return (
        <View style={styles.body} >
            <View style={styles.imageContainer} >
                <Image resizeMode={'contain'} style={styles.image}  source={{uri: 'http://192.168.0.102:8000/' + route.params.image}} />
            </View>
            <View style={styles.mainContainer} >
                <Text style={styles.title} > {route.params.name} </Text>
                { route.params.is_liquid ? <Text style = {styles.description}>{route.params.weight} мл</Text> : <Text style = {styles.description}>{route.params.weight} гр</Text>} 
                { route.params.description ? <Text style={styles.description} > {route.params.description} </Text> : null }
                { route.params.composition ? <Text style={styles.description} > {route.params.composition} </Text> : null }
            </View>
            <TouchableOpacity onPress={() => addToCartHandle()} style={styles.buttonContainer}> 
                <View style={styles.button}>
                    <Text style={styles.buttonText} >Добавить в корзину</Text>
                    <Text style={styles.buttonText} >{route.params.price}₽</Text>
                </View>
            </TouchableOpacity>
        </View>
    ) 
})

const styles = StyleSheet.create({
    
    body: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },

    imageContainer: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 300,
        marginTop: 20,
        marginBottom: 50

    },

    image: {
        width: '100%',
        height: '100%'
    },

    mainContainer: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    title: {
        width: '100%',
        marginBottom: 30,
        fontSize: 30,
        fontWeight: 'bold'
    },

    description: {
        width: '100%',
        marginBottom: 20,
        fontSize: 20,
        fontWeight: '300',
        color: 'gray'
    },

    buttonContainer: {
        width: '80%',
        height: 50,
        marginLeft: '10%',
        position: 'absolute',
        bottom: 50
    },

    button: {
        height: '100%',
        width: '100%',
        backgroundColor: '#007125',
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: 'center',

    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '300'
    },


});

export default MenuItem
