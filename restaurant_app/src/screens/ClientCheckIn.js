import React, {useState, useContext} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import {observer} from "mobx-react-lite";
import {Context} from "../../root";
import { Formik } from 'formik';
import { checkClientIn } from '../http/userAPI';


const ClientCheckIn = observer(({navigation, route}) => {

    const {user} = useContext(Context)
    const [reachedMajorityAge, setReachedMajorityAge] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    

    return (
        <View style={styles.container}> 

            <Formik
                initialValues={{table: ''}}
                onSubmit={
                async (values) => {
                    const data = checkClientIn(user.info.person_id, route.params, values.table, reachedMajorityAge)
                    .then(() => navigation.navigate('CurrentGuests'))
                    .catch(error => console.log('Error:', error))
                }} 
                >
                {(props) => (
                <View style={styles.body}>
                    <View style={styles.tableBlock}>
                        <Text style={styles.tableBlockText}>Номер столика</Text>
                        <TextInput
                        style={styles.tableBlockInput}
                        value={props.values.table}
                        onChangeText={props.handleChange('table')}
                        />
                    </View>

                    <View style={styles.reachedMajorityAgeBlock}>
                        <Text style={styles.reachedMajorityAgeText}>Клиенту больше 18</Text>
                        <Switch onValueChange={setReachedMajorityAge} value={reachedMajorityAge} />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={props.handleSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Далее</Text>
                        </TouchableOpacity>
                    </View>
                
                </View>)}
            </Formik>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      height: '100%'
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginTop: 45,
        width: '100%',
    },

    headerText: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    body: {
        width: '100%',
    },

    tableBlock: {
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%'
    },

    tableBlockText: {
        fontSize: 18,
        marginBottom: 15,
        marginLeft: 10
    },

    tableBlockInput: {
        fontSize: 18,
        marginBottom: 50,
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        height: 40
    },

    reachedMajorityAgeBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    reachedMajorityAgeText: {
        fontSize: 18,
        marginBottom: 15,
    }, 

    buttonContainer: {
        width: '100%',
        height: 40,
        marginTop: 100
    },

    button: {
        backgroundColor: '#85ffad',
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 18,
    },
    

    

  });

export default ClientCheckIn
