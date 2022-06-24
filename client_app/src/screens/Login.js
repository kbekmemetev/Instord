import React, { useContext } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import {Formik} from 'formik'
import {login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../root";

const Login = observer(({ navigation }) => {

  const {user} = useContext(Context)

  return (
      <View style={styles.container}>


      <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={
      async (values) => {

        let data
        data = await login(values.email, values.password)
        user.setInfo(data)
        user.setIsAuth(true)     
           

      }} 
      >
      {(props) => (
        <View style={{width: '70%'}}>
          <TextInput
            label="Email"
            value={props.values.email}
            onChangeText={props.handleChange('email')}
            autoCompleteType="email"
            textContentType="emailAddress"
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            value={props.values.password}
            onChangeText={props.handleChange('password')}
            secureTextEntry
            returnKeyType="done"
          />
          <Button mode="contained" onPress={props.handleSubmit}>
            Login
          </Button>
        </View>
      )}
      </Formik>


      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      </View>
  )
})

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})