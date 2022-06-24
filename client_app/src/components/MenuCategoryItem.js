import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import MenuItemElement from './MenuItemElement';
import { useNavigation } from '@react-navigation/native';
import { getCategoriesByParent } from '../http/categoryAPI';
import { getDishes, getDishesUnder } from '../http/itemAPI';
import {observer} from "mobx-react-lite";

const MenuCategoryItem = observer(({categoryInfo, reachedMajorityAge}) => {

    const navigation = useNavigation();
    const [category, setCategory] = useState()
    const [dishes, setDishes] = useState()
    const [loading, setLoading] = useState(true)

    if (reachedMajorityAge) {
        useEffect(() => {
            getCategoriesByParent(categoryInfo.category_id)
            .then(data => setCategory(data))
            .then(() => getDishes(categoryInfo.category_id))
            .then(data => setDishes(data))
            .finally(() => setLoading(false))
        }, [])
    } else {
        useEffect(() => {
            getCategoriesByParent(categoryInfo.category_id)
            .then(data => setCategory(data))
            .then(getDishesUnder(categoryInfo.category_id))
            .then(data => setDishes(data))
            .finally(() => setLoading(false))
        }, [])
    }

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
                </CollapseHeader>
                <CollapseBody style = {styles.body}>
                    <ScrollView style={{width: '100%'}} contentContainerStyle={styles.scrollInside}>


                    <FlatList
                        style={{width: '100%', marginBottom: 15}}
                        keyExtractor={(item) => item.category_id}
                        data = {category}
                        renderItem={({item}) => (

                            <MenuCategoryItem categoryInfo={item} reachedMajorityAge={reachedMajorityAge} />

                        )}
                    />

                    <FlatList 
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        numColumns={2}
                        style={{width: '100%'}}
                        keyExtractor={(item) => item.item_id}
                        data = {dishes}
                        renderItem={({item}) => (
                            <MenuItemElement itemInfo={item} />
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
