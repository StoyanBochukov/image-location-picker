import { Alert, Image, StyleSheet, View, Text } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { getMapPreview } from "../../util/location";
import { useState } from "react";

const LocationPicker = () => {

    const [location, setLocation] = useState()

    const [permissionInfo, requestPermission] = useForegroundPermissions()

    const verifyPermissions = async() => {
        if(permissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(permissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions.', 'The App needs your permission to use your Location.');
            return false
        }
        return true
    }

    const getLocationHandler = async() => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const location = await getCurrentPositionAsync();
        setLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }
    
    const pickOnMapHandler = () => {

    }

    let locationPreview = <Text>No Location picked yet</Text>;
    if(location){
        locationPreview = <Image style={styles.image} source={{uri: getMapPreview(location.lat, location.lng)}} />
    }

  return (
    <View>
        <View style={styles.mapPreview}>
            {locationPreview}
        </View>
        <View style={styles.actions}>
            <OutlinedButton onPress={getLocationHandler} icon='location'>Locate User</OutlinedButton>
            <OutlinedButton onPress={pickOnMapHandler} icon='map'>Pick on Map</OutlinedButton>
        </View>
    </View>
  )
}

export default LocationPicker


const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
})