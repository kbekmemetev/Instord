import React, {useState, useEffect, useContext} from 'react'
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native';
import CurrentGuest from '../components/CurrentGuest';
import { getCurrentOrders } from '../http/orderAPI';
import {observer} from "mobx-react-lite";
import {Context} from "../../root";

const CurrentGuests = observer(({navigation}) => {

    const {user} = useContext(Context)
    const [guests, setGuests] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentOrders(user.info.person_id)
        .then(data => setGuests(data))
        .finally(() => setLoading(false))
        .catch(error => console.log("Error:", error))
    }, [])


    const onRefresh = () => {
        setRefreshing(true)
        getCurrentOrders(user.info.person_id)
        .then(data => setGuests(data)) 
        .then(() => setRefreshing(false)) 
        .catch(error => console.log("Error:", error))
    } 

    if (loading) {
        return (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        )
    }
    
  return (

    <View style={styles.container}>

    <FlatList
        style={{width: '100%', marginBottom: 79}}
        keyExtractor={(item) => item.order_id}
        refreshControl = {
            <RefreshControl
                refreshing = {refreshing}
                onRefresh = {onRefresh}
            />}
        data = {guests}
        renderItem={({item}) => (

            <CurrentGuest personID = {item.person_id} time = {item.time}
            tableNumber = {item.table_number} needsWaiter = {item.needs_waiter}  />

        )}
    />
          
        

    </View>
  )
})

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        height: '100%'
    },
    
    order: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 110,
        borderRadius: 15,
        shadowColor: "#20344B",
        shadowOffset: {
            width: 4,
            height: 11
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 5,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d6dfff',
    },

    topRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '75%'
    },

    bottomRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '25%',
        alignItems: 'center',
    },

    orderBlock: {
        width: '33%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    orderTextLarge: {
        fontSize: 25,
    },

    orderTextSmall: {
        fontSize: 18,
        fontWeight: '500',
    },


});

export default CurrentGuests


