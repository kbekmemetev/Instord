import React, {useState, useContext, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native'
import MenuCategoryItem from '../components/MenuCategoryItem'
import {observer} from "mobx-react-lite";
import {Context} from "../../root";
import { getRootCategories } from '../http/categoryAPI';
import { getUserData } from '../http/userAPI';


const MenuConstructor = observer(({navigation}) => {

    const {user} = useContext(Context)
    const [category, setCategory] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [reachedMajorityAge, setReachedMajorityAge] = useState(false)


    useEffect(() => {
        getUserData(user.info.person_id)
        .then(data => {
            if (!data.status) {
                user.setIsIn(false)
            }
            setReachedMajorityAge(data.reached_majority_age)
            getRootCategories(data.status)
            .then(data => setCategory(data))
        })
        .finally(() => setLoading(false))
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        getUserData(user.info.person_id)
        .then(data => {
            if (!data.status) {
                user.setIsIn(false)
            }
            setReachedMajorityAge(data.reached_majority_age)
            getRootCategories(data.status)
            .then(data => setCategory(data))
        })
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
        <ScrollView style = {styles.container}>
            <FlatList
                style={{width: '100%', marginBottom: 79}}
                refreshControl = {
                    <RefreshControl
                        refreshing = {refreshing}
                        onRefresh = {onRefresh}
                    />
                }
                data = {category}
                keyExtractor={(item) => item.category_id}
                renderItem={({item}) => (
                    <MenuCategoryItem categoryInfo={item} reachedMajorityAge={reachedMajorityAge} />
                )}
            />
            
        </ScrollView>
    )
})


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      height: '100%',
      paddingTop: 30,
    },

    header: {
        backgroundColor: '#fff',
        fontWeight: 'bold',
        fontSize: 35,
        margin: 25
    },

    collapse: {
        backgroundColor: '#fff',
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
    },

    categoryTitleContainer: {
        backgroundColor: '#fff',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        height: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

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
        width: 40,
        padding: 3
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
        marginTop: 20,
        marginBottom: 20,
    
    },

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

    bottomButtons: {
        width: '100%',
        height: 40,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15
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
      
    scrollInside: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }

  });

export default MenuConstructor