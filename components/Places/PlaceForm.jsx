import { useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import Input from "../ui/Input";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = () => {

  const [inputValues, setInputValues] = useState({
    title: {
      value: ''
    }
  })
  const inputChangeHandler = (identifier, enteredText) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [identifier]: {value: enteredText}
      }
    })
  }

  return (
    <ScrollView style={styles.form}>
      <View>
       <Input label='Title' textInputConfig={{
        placeholder: 'Enter Title',
        onChangeText: inputChangeHandler.bind(this, 'title'),
        value: inputValues.title.value
       }} />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  )
}

export default PlaceForm


const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  // label: {
  //   fontWeight: 'bold',
  //   marginBottom: 4,
  //   color: Colors.primary500
  // },
  // input: {
  //   marginVertical: 8,
  //   paddingHorizontal: 4,
  //   paddingVertical: 8,
  //   fontSize: 16,
  //   borderBottomColor: Colors.primary700,
  //   borderBottomWidth: 2,
  //   backgroundColor: Colors.primary100
  // }
})