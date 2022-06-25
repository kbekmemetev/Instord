import React, {useState, useEffect, useContext} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { getUserData, updateUserData } from '../http/userAPI'; 
import {observer} from "mobx-react-lite";
import {Context} from "../../root";
import { Formik } from 'formik';


const EditProfile = observer(({navigation}) => {

    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    // const [personName, setName] = useState();
    const [email, setEmail] = useState(' ');

    useEffect(() => {
        getUserData(user.info.person_id)
        .then(data => setEmail(data.email))
        .then(() => handleCheckIn(user.info.person_id))
        .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        )
    }

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

    return (

        <Formik
            initialValues={{name: ''}}
            onSubmit={ async (values) => {
        
        updateUserData(user.info.person_id, email)
        navigation.navigate('Settings')

      }}
      >
      { (props) => (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Данные профиля</Text>
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>Почта</Text>
                <TextInput style={styles.dataInput} value={email} onChangeText={setEmail}  />
            </View>

            
            
            <TouchableOpacity onPress={ () => props.handleSubmit()} style={styles.buttonContainer}>
                <Text style={styles.button}>Сохранить</Text>
            </TouchableOpacity>
        </View>
        )}
        </Formik>
    )
})

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      height: '100%'
    },

    headerContainer: {
        justifyContent: 'space-between',
        padding: 25,
        paddingBottom: 40,
    },

    header: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },

    dataContainer: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },

    dataLabel: {
        fontSize: 18,
        paddingBottom: 10,
        paddingLeft: 10,
        fontWeight: '500'
    },

    dataInput: {
        fontSize: 18,
        marginBottom: 20,
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },


    button: {
        borderRadius: 15,
        color: '#fff',
        backgroundColor: '#85ffad',
        fontSize: 25,
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },

    buttonContainer: {
        borderRadius: 15,
        width: '100%',
        position: 'absolute',
        bottom: 55
    }

    

   
    


  });

export default EditProfile
