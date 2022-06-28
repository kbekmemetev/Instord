import {DADATA_TOKEN, DADATA_SECRET_KEY} from '@env'
import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Formik} from 'formik'
import {observer} from "mobx-react-lite";
import { createRestaurant } from '../http/restaurantAPI'
import {Context} from "../../root";



const RestaurantSignUp = observer(({ navigation }) => {
  
  const {user} = useContext(Context)
  console.log(process.env.DADATA_TOKEN, process.env.DADATA_SECRET_KEY)
  var url = "https://cleaner.dadata.ru/api/v1/clean/address";
  var token = process.env.DADATA_TOKEN;
  var secret = process.env.DADATA_SECRET_KEY;


  return (
    <SafeAreaView style={styles.container}>

      <View>

      <Text style={{fontSize: 18}}>Complete information about your restaurant</Text>

      <Formik
      initialValues={{name: '', address: '', hours: ''}}
      onSubmit={
      async (values) => {

        const user_id = `${user.info.person_id}`
        
        var options = {
          method: "POST",
          mode: "cors",
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Token " + token,
              "X-Secret": secret
          },
          body: JSON.stringify([values.address])
        }

        

        fetch(url, options)
          .then(response => response.text())
          .then(result => {
            const data = createRestaurant(user_id, values.name, `${JSON.parse(result)[0].geo_lat} ${JSON.parse(result)[0].geo_lon}`, `${JSON.parse(result)[0].result}`, values.hours)
            user.setIsAuth(true)
          })
          .catch(error => console.log("error", error));

        
      }} 
      >
      {(props) => (
        <View>
          <TextInput
          style={{width: '100%'}}
            label="Restraunt Name"
            returnKeyType="next"
            value={props.values.name}
            onChangeText={props.handleChange('name')}
            placeholder="Restraunt Name"
          />

          <TextInput
            style={{width: '100%'}}
            label="Working hours"
            returnKeyType="next"
            value={props.values.hours}
            onChangeText={props.handleChange('hours')}
            placeholder="Working hours"
          />

          <TextInput
            style={{width: '100%'}}
            label="Address"
            returnKeyType="done"
            value={props.values.address}
            onChangeText={props.handleChange('address')}
            placeholder="Address"
          />

          

          <Button
            mode="contained"
            onPress={props.handleSubmit}
            style={{ marginTop: 24 }}
          >
            Finish Registration
          </Button> 

        </View>
      )} 
      </Formik>

      
    </View>
    </SafeAreaView>
  )
})

export default RestaurantSignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },

  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

 