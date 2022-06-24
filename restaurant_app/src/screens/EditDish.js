import React, { useState, useEffect, useContext } from 'react';
import { Button, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import {Formik} from 'formik'
import {getCategories} from "../http/categoryAPI";
import { updateDish } from '../http/itemAPI';
import {observer} from "mobx-react-lite";
import {Context} from "../../root";
import {Picker} from '@react-native-picker/picker';

const EditDish = observer(({navigation, route}) => {


  const {user} = useContext(Context)
  const [category, setCategory] = useState()
  const [loading, setLoading] = useState(true)
  const [uri, setUri] = useState(true)
  const [imageType, setImageType] = useState(true)
  const [fileName, setFileName] = useState(true)


  useEffect(() => {
    getCategories(user.info.person_id)
    .then(data => setCategory(data))
    .finally(() => setLoading(false))
  }, [])
  
  // Image
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri)
      setUri(localUri)
      setImageType(type)
      setFileName(filename)
      
    }
  };


  // Switch
  const [allowedUnderaged, setAllowedUnderaged] = useState(route.params.is_allowed_underaged);
  const toggleSwitch = () => setAllowedUnderaged(previousState => !previousState);

  //Pickers
  const [selectedCategory, setSelectedCategory] = useState(route.params.category_id)
  const [isLiquid, setIsLiquid] = useState(route.params.is_liquid)

  // Previous values

  const [name, setName] = useState(route.params.name)
  const [weight, setWeight] = useState(route.params.weight)
  const [price, setPrice] = useState(route.params.price)
  const [description, setDescription] = useState(route.params.description)
  const [composition, setComposition] = useState(route.params.composition)


  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading</Text>
      </View>
    )
  }

  
  return(
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Новая позиция</Text>

      <Formik
      initialValues={{name: '', weight: '', price: '', description: '', composition: ''}}
      onSubmit={ async (values) => {
        
        const data = new FormData();
        data.append('id', route.params.item_id)
        data.append('name', name)
        data.append('category', selectedCategory)
        data.append('weight', weight)
        data.append('isLiquid', isLiquid)
        data.append('price', price)
        data.append('allowedUnderaged', allowedUnderaged)
        data.append('description', description)
        data.append('composition', composition)
        data.append('image', { uri: uri, name: fileName, imageType })
        
        updateDish(data)
        navigation.navigate('MenuConstructor')

      }}
      >
      { (props) => (
      <ScrollView>
        <View style={styles.dataBlock}>
          <Text style={styles.dataText}>Наименование</Text>
          <TextInput
            style={styles.dataInput}
            value={name}
            onChangeText={setName}
          />
        </View>


        <View style={styles.dataBlock}>
          <Text style={styles.dataText}>Категория</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }>

          {category.map(item => (
            <Picker.Item label={item.name} value={item.category_id} key={item.category_id} />
                                    
          ))}
            
                                                    
          </Picker>
        </View>


        <View style={styles.weightBlock}>
          <View style={styles.firstWeight}>
            <Text style={styles.dataText}>Вес / объем</Text>
            <TextInput
              style={styles.dataInput}
              value={weight}
              onChangeText={setWeight}
            />
          </View>
          <View style={styles.secondWeight}>
            <Text style={styles.dataText}>гр / мл</Text>
            <Picker
            selectedValue={isLiquid}
            onValueChange={(itemValue, itemIndex) =>
            setIsLiquid(itemValue)
          }>
              <Picker.Item label={'гр'} value={false}/>
              <Picker.Item label={'мл'} value={true}/>
                                                    
          </Picker>
          </View> 
        </View>


        <View style={styles.dataBlock}>
          <Text style={styles.dataText}>Цена</Text>
          <TextInput
            style={styles.dataInput}
            value={price}
            onChangeText={setPrice}
          />
        </View>


        <View style={styles.weightBlock}>
          <Text style={styles.dataText} >Разрешен до 18 лет</Text>
          <Switch
            onValueChange={toggleSwitch}
            value={allowedUnderaged} 
          />
        </View>


        <View style={styles.dataBlock}>
          <Text style={styles.dataText}>Описание</Text>
          <TextInput
            multiline
            style={styles.dataLargeInput}
            value={description}
            onChangeText={setDescription}
          />
        </View>


        <View style={styles.dataBlock}>
          <Text style={styles.dataText}>Состав</Text>
          <TextInput
            multiline
            style={styles.dataLargeInput}
            value={composition}
            onChangeText={setComposition}
          />
        </View>


        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
            <Text style={styles.buttonText}>Сохранить изменения</Text>
          </TouchableOpacity>
          </View>
      </ScrollView>
      )}
      </Formik>
    </ScrollView>
    
  )



})

export default EditDish

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },

  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
    marginTop: 15
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  dataBlock: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30
  },

  dataText: {
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 15,
    fontWeight: '500',
  },

  dataInput: {
    fontSize: 18,
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 40,
  },

  dataLargeInput: {
    fontSize: 18,
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 120,
  },

  weightBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
    width: '80%'

  },

  firstWeight: {
    width: '65%'
  },

  secondWeight: {
    width: '35%'
  },

  buttonContainer: {
    width: '100%',
    height: 40,
    marginTop: 30,
    marginBottom: 30,
},

button: {
    backgroundColor: 'green',
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
