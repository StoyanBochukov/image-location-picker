import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const Input = ({ label, textInputConfig }) => {
  return (
    <View>
        <Text style={styles.label} >{label}</Text>
        <TextInput style={styles.input} {...textInputConfig}/>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    label: {
      fontWeight: 'bold',
      marginBottom: 4,
      color: Colors.primary500
    },
    input: {
      marginVertical: 8,
      paddingHorizontal: 4,
      paddingVertical: 8,
      fontSize: 16,
      borderBottomColor: Colors.primary700,
      borderBottomWidth: 2,
      backgroundColor: Colors.primary100
    }
  })