import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Support = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View>
            <Text>С вопросами и предложениями можете обращаться по адресу:</Text>
            <Text style={{fontWeight: 'bold', textAlign: 'left'}}>kbekmemetev@gmail.com</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30
    },
  });

export default Support
