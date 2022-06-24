import React, {useContext} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import SettingsItems from '../components/SettingsItems';
import {observer} from "mobx-react-lite";
import {Context} from "../../root";

const Settings = observer(({navigation}) => {

  const {user} = useContext(Context)
  
  const logOut = () => {
      user.setInfo({})
      user.setIsAuth(false)
  }

  return (
    <View style={styles.container}>


      <View style={styles.viewAroundMap}>
          {SettingsItems.map(item => (
            <View key={item.id} style={styles.viewInsideMap}>
              <TouchableOpacity onPress={() => navigation.navigate(item.link)}>
                <Image source={item.image} style={styles.mapImage} />
                <Text style={styles.mapText}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          ))} 
        </View>

        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={() => logOut()}>
              <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
})

export default Settings

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  },
  viewAroundMap: {
    marginTop: 10,
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent:'space-around', 
    flexDirection: "row", 
    width: '100%',
    marginLeft: "auto",
    marginRight: "auto"
  },
  viewInsideMap: {
    width: '45%',
    marginBottom: 25, 
    borderRadius: 15,
    alignContent: "center",
    shadowColor: "#20344B",
    shadowOffset: {
      width: 2,
      height: 7
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
    backgroundColor: '#ffffff'


  },
  mapImage: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 70, 
    height: 70,
    marginBottom: 15,
    marginTop: 15
    
  },
  mapText: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 15,
    marginBottom: 15
  },

  logoutButtonContainer: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 20,
  },

  logoutButton: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: '100%',
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ff3075',
    marginRight: 'auto',
    marginLeft: 'auto'


  },

  logoutText: {
      fontSize: 16,
      color: '#ff3075'
  }
});
