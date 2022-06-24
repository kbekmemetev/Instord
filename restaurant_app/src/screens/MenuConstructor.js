import React, {useEffect, useState, useContext} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native'
import MenuCategoryItem from '../components/MenuCategoryItem'
import {getCategoriesWhere} from "../http/categoryAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../root";

const MenuConstructor = observer(({navigation}) => {

    const {user} = useContext(Context)
    const [category, setCategory] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getCategoriesWhere(user.info.person_id, 0)
        .then(data => setCategory(data))
        .finally(() => setLoading(false))
        .catch(error => console.log('Error:', error))
    }, [])


    const onRefresh = () => {
        setRefreshing(true)
        getCategoriesWhere(user.info.person_id, 0)
        .then(data => setCategory(data))
        .then(console.log(category))
        .finally(() => setRefreshing(false))
        .catch(error => console.log('Error:', error))
    } 

    if (loading) {
        return (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        )
    }

    return (
        <View  style={styles.container}>
        <Text style={styles.header}>Menu</Text>
        
        <FlatList
            style={{width: '100%', marginBottom: 79}}
            keyExtractor={(item) => item.category_id}
            refreshControl = {
                <RefreshControl
                refreshing = {refreshing}
                onRefresh = {onRefresh}
                />
            }
            data = {category}
            renderItem={({item}) => (
                <MenuCategoryItem catName={item.name} catId={item.category_id} catInfo={item} />
            )}
        />


            <View style={styles.bottomButtons}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('NewCategory')} style={styles.button}>
                        <Text style={styles.buttonText}>Добавить категорию</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('NewDish')} style={styles.button}>
                        <Text style={styles.buttonText}>Добавить позицию</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      height: '100%',
      flex: 1,
    },

    header: {
        backgroundColor: '#fff',
        fontWeight: 'bold',
        fontSize: 35,
        margin: 25
    },


    bottomButtons: {
        width: '100%',
        height: 80,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: '#fff',
        borderTopColor: 'gray',
        borderTopWidth: 1,
        borderStyle: 'solid',
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

    buttonText: {
        fontWeight: '500',
        color: '#fff'
    },
      


  });

export default MenuConstructor
