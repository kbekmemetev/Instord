import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const MenuItemElement = ({link, itemPrice, itemImg, itemWeight, itemLiquid, itemName, itemPass}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style = {styles.menuItem} onPress={() => navigation.navigate('Dish', itemPass)}>
            <Image source={{uri: 'http://192.168.0.102:8000/' + itemImg}} style = {styles.itemImage} />
            <View style = {styles.itemTextContainer}>
                <Text style = {styles.itemTitle}>{itemName}</Text>
                <Text style = {styles.itemPrice}>{itemPrice}₽</Text>
                { itemLiquid ? <Text style = {styles.itemWeight}>{itemWeight} мл</Text> : <Text style = {styles.itemWeight}>{itemWeight} гр</Text>} 
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    menuItem: {
        backgroundColor: '#fff',
        width: '45%', 
        borderRadius: 15,
        alignContent: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'solid',
        marginBottom: 20,
    },

    itemImage: {
        height: 120,
        width: '85%',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    itemTextContainer: {
        backgroundColor: '#fff',
        width: '85%',
        marginBottom: 15
    },

    itemTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginLeft: 20
    },

    itemPrice: {
        fontSize: 18,
        backgroundColor: '#fff',
        color: 'gray',
        marginBottom: 30,
        marginLeft: 20
    },

    itemWeight: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 20
    },


  });



export default MenuItemElement
