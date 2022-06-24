import React, {useContext, useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {Formik} from 'formik'
import {createCategory, getCategories} from "../http/categoryAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../root";
import {Picker} from '@react-native-picker/picker';




const NewCategory = observer(({navigation}) => {
    
    const {user} = useContext(Context)
    const [selectedCategory, setSelectedCategory] = useState()
    const [category, setCategory] = useState() 
    let isNull = true

    useEffect(() => {
        getCategories(user.info.person_id)
        .then(data => setCategory(data))
        .catch(error => console.log('Error:', error))
    }, [])

    
    try {
        if (category.length != 0) {
          isNull = false
        }    
      } catch (e) {
        console.log(e);
      }

    
    return (

        
        <View style={styles.container}>
            <Formik
                initialValues={{name: ''}}
                onSubmit={
                    async (values) => {
                        if (selectedCategory) {
                            const data = createCategory(values.name, selectedCategory, user.info.person_id)
                            .then(() => navigation.navigate('MenuConstructor'))
                            .catch(error => console.log('Error:', error))

                        } else {
                            const data = createCategory(values.name, 0, user.info.person_id)
                            .then(() => navigation.navigate('MenuConstructor'))
                            .catch(error => console.log('Error:', error))

                        }   
                }} 
            >

                {(props) => (
                <View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.dataLabel}>Название новой категории</Text>
                        <TextInput style={styles.dataInput}
                            value={props.values.name}
                            onChangeText={props.handleChange('name')}
                        />

                        { (!isNull) &&
                        <View>
                            <Text style={styles.dataLabel}>Родительская категория (необязательно)</Text>
                            <Picker
                                style = {styles.picker}
                                selectedValue={selectedCategory}
                                onValueChange={(itemValue, itemIndex) =>
                                setSelectedCategory(itemValue)
                            }>
                                
                                <Picker.Item label={'Без родителя'} value={null} />
                                {category.map(item => (
                                    <Picker.Item label={item.name} value={item.category_id} key={item.category_id} />
                                    
                                ))}
                                
                                
                            </Picker>
                        </View>
                        }

                    </View>
                

                    <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={props.handleSubmit} style={styles.button}>
                                <Text style={styles.buttonText}>Добавить</Text>
                            </TouchableOpacity>
                    </View>
                </View>
                )}
            </Formik>
        </View>
    )
})


const styles = StyleSheet.create({

    container: {
      backgroundColor: '#fff',
      height: '100%'
    },

    dataContainer: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 90
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

    buttonContainer: {
        width: '100%',
        height: 40,
        marginTop: 50
    },

    button: {
        backgroundColor: 'green',
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 18,
    },

  });

export default NewCategory


