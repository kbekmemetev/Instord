import React, { useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import MenuItemElement from './MenuItemElement';
import { useNavigation } from '@react-navigation/native';
import { deleteCategory, getCategoryByParent } from '../http/categoryAPI';
import { getDishes } from '../http/itemAPI';
import {observer} from "mobx-react-lite";


const MenuCategoryItem = observer(({categoryInfo}) => {

    const navigation = useNavigation();
    const [category, setCategory] = useState()
    const [dishes, setDishes] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCategoryByParent(categoryInfo.category_id)
        .then(data => setCategory(data))
        getDishes(categoryInfo.category_id)
        .then(data => setDishes(data))
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
        <ScrollView style={{width: '100%'}}>
        <Collapse style = {styles.collapse}>
                <CollapseHeader style = {styles.categoryTitleContainer}>
                    <Text style={styles.categoryTitle}>{categoryInfo.name}</Text>
                    <View style={styles.categoryIconElement}>
                        <TouchableOpacity style={styles.categoryIconHolder} onPress={() => navigation.navigate('EditCategory', categoryInfo)}>
                            <Image style={styles.categoryIcon} source={require('../assets/edit.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.categoryIconHolder}
                        onPress={() => {
                            let data = deleteCategory(categoryInfo.category_id)
                            navigation.navigate('MenuConstructor')
                        }}  
                        >
                            <Image style={styles.categoryIcon} source={require('../assets/delete.png')} />
                        </TouchableOpacity>
                    </View>
                </CollapseHeader>
                <CollapseBody style = {styles.body}>
                    <ScrollView style={{width: '100%'}} contentContainerStyle={styles.scrollInside}>


                    <FlatList 
                        style={{width: '100%', marginBottom: 15}}
                        keyExtractor={(item) => item.category_id}
                        data = {category}
                        renderItem={({item}) => (

                            <MenuCategoryItem categoryInfo={item} />

                        )}
                    />

                    <FlatList 
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        numColumns={2}
                        style={{width: '100%'}}
                        keyExtractor={(item) => item.item_id}
                        data = {dishes}
                        renderItem={({item}) => (
                            <MenuItemElement itemData = {item} />
                        )}
                    />


                    </ScrollView>
                </CollapseBody>
            </Collapse>
            </ScrollView>
    )
})

const styles = StyleSheet.create({

    collapse: {
        backgroundColor: '#fff',
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    categoryTitleContainer: {
        backgroundColor: '#fff',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    categoryTitle: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 20
    },

    categoryIconElement: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },

    categoryIconHolder: {
        marginRight: 25,
        height: '100%',
        aspectRatio: 1,
        padding: 10,
        
    },

    categoryIcon: {
        height: '100%',
        width: '100%'
    },

    body: {
        backgroundColor: '#fff',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 20,
    
    },

    scrollInside: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }


  });

export default MenuCategoryItem
