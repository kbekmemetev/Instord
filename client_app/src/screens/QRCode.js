import React, {useContext} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import SvgQRCode from 'react-native-qrcode-svg';
import {observer} from "mobx-react-lite";
import {Context} from "../../root";
import { getUserData } from '../http/userAPI';

const QRCode = ({navigation}) => {

    const {user} = useContext(Context)

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
    
    const qr = `${user.info.person_id}`


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Покажите этот код хостес</Text>
            <SvgQRCode style={styles.text} value={qr} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleCheckIn(user.info.person_id)} style={styles.button}>
                    <Text style={styles.buttonText}>Перейти к меню</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },

    text: {
        fontSize: 25,
        marginBottom: 40
    },

    qr: {
        width: 300,
        height: 300,
    },

    buttonContainer: {
        width: '70%',
        height: 50,
        marginTop: 75
    },

    button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 15
    },

    buttonText: {
        color: '#fff',
        fontSize: 20
    }
})




export default QRCode
