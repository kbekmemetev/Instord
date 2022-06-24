import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const CurrentGuest = ({tableNumber, time, personID, needsWaiter}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Guest', {
            personID: personID,
            tableNumber: tableNumber,
        })}
        style={needsWaiter ? styles.order_needs_waiter : styles.order} >
            <View style={styles.topRow} >
                <View style={styles.orderBlock}>
                    <Text style={{fontSize: 35}}>
                        {tableNumber}
                    </Text>
                </View>
                <View style={styles.orderBlock}>
                    <Text style={styles.orderTextLarge}>
                        {time.slice(11, 16)}
                    </Text>
                </View>
            </View>
            <View style={styles.bottomRow} >
                <View style={styles.orderBlock}>
                    <Text style={styles.orderTextSmall}>
                        стол
                    </Text>
                </View>
                <View style={styles.orderBlock}>
                    <Text style={styles.orderTextSmall}>
                        посадка
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
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
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 0,
    },

    order_needs_waiter: {
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
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 3,
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
        width: '50%',
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

export default CurrentGuest
