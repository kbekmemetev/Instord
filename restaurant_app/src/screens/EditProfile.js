import React, {useState, useEffect, useContext} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { getRestaurantData, updateRestaurantData } from '../http/restaurantAPI'; 
import { getUserData, updateUserData } from '../http/userAPI'; 
import {observer} from "mobx-react-lite";
import {Context} from "../../root";
import { Formik } from 'formik';


const EditProfile = observer(({navigation}) => {

    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    // const [personName, setName] = useState();
    const [email, setEmail] = useState(' ');
    const [restaurantName, setRestaurantName] = useState(' ');
    const [hours, setHours] = useState(' ');

    useEffect(() => {
        getUserData(user.info.person_id)
        .then(data => setEmail(data.email))
        .then(getRestaurantData(user.info.person_id))
        .then(data => {
            setRestaurantName(data.name)
            setHours(data.work_hours)
        })
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

        <Formik
            initialValues={{name: ''}}
            onSubmit={ async () => {
                updateUserData(user.info.person_id, email)
                updateRestaurantData(user.info.person_id, restaurantName, hours)
                navigation.navigate('Settings')
            }}
      >
      { (props) => (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Данные профиля</Text>
            </View>
            <View style={styles.dataContainer}>
                {/* <Text style={styles.dataLabel}>Имя</Text>
                <TextInput style={styles.dataInput} value={personName} onChangeText={setName} /> */}
                <Text style={styles.dataLabel}>Почта</Text>
                <TextInput style={styles.dataInput} value={email} onChangeText={setEmail}  />
            </View>

            <View style={styles.headerContainer}>
                <Text style={styles.header}>Данные заведения</Text>
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>Название</Text>
                <TextInput style={styles.dataInput} value={restaurantName} onChangeText={setRestaurantName} />
                <Text style={styles.dataLabel}>Рабочие часы</Text>
                <TextInput style={styles.dataInput} value={hours} onChangeText={setHours} />
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
        width: '100%',
        position: 'absolute',
        bottom: 25
    }

    

   
    


  });

export default EditProfile
