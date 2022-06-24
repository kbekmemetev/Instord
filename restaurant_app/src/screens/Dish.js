import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { deleteDish } from '../http/itemAPI'

const Dish = ({navigation, route}) => {

    const passDish = route.params
    const handleDelete = (id) => {
        deleteDish(id)
        navigation.navigate('MenuConstructor')
    }

    return (
        <View style={styles.body} >
            <View style={styles.imageContainer} >
                <Image resizeMode={'contain'} style={styles.image}  source={{uri: 'http://192.168.0.102:8000/' + route.params.image}} />
            </View>
            <View style={styles.mainContainer} >
                <Text style={styles.title} > {route.params.name} </Text>
                { route.params.is_liquid ? <Text style = {styles.description}>{route.params.weight} мл</Text> : <Text style = {styles.description}>{route.params.weight} гр</Text>} 
                { route.params.description ? <Text style={styles.description} > {route.params.description} </Text> : null}
                { route.params.composition ? <Text style={styles.description} > {route.params.composition} </Text> : null}
            </View>


            <View style={styles.bottomButtons}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditDish', passDish)} style={styles.button}>
                        <Text style={styles.buttonText}>Изменить</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {handleDelete(route.params.id)}} style={styles.deleteButton}>
                        <Text style={styles.buttonText}>Удалить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

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

    bottomButtons: {
        width: '100%',
        height: 40,
        position: 'absolute',
        bottom: 40,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',

    },

    buttonContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
    },

    button: {
        width: '95%',
        height: '95%',
        backgroundColor: 'green',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },

    deleteButton: {
        width: '95%',
        height: '95%',
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },

    buttonText: {
        fontWeight: '500',
        color: '#fff'
    },


});

export default Dish
