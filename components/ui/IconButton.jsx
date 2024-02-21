import { Pressable, StyleSheet, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'

const IconButton = ({ color, size, name, onPress }) => {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
     <Ionicons color={color} size={size} name={name} />
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    button: {
      padding: 8,
      margin: 4,
      justifyContent: 'center',
      alignItems: 'center' 
    },
    pressed: {
        opacity:0.75
    }
})