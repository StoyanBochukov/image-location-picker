import { View, Alert, Image, Text, StyleSheet } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

const ImagePicker = () => {
  const [cameraPermissionIfon, requestPermission] = useCameraPermissions();
  const [picketImage, setPicketImage] = useState('');

  const veryfyPermissions = async () => {
    if (cameraPermissionIfon.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionIfon.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to give the App permissions to access camera.'
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await veryfyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    const imageUri = image.assets[0].uri;
    setPicketImage(imageUri);
  };

  let imagePreview = <Text>No Image Selected</Text>;
  if (picketImage !== '') {
    imagePreview = (
      <Image
        style={styles.image}
        source={{ uri: picketImage }}
        width={50}
        height={50}
      />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={takeImageHandler} icon='camera'>
        TAKE IMAGE
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  },
});
