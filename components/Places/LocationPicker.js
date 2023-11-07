import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import OutlineButton from '../UI/OutlineButton'
import { Colors } from '../../constants/colors'
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location'
import { useState } from 'react'
import { getMapPreview } from '../../util/location'

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState()
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions()

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status ===
      PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }

    if (
      locationPermissionInformation.status ===
      PermissionStatus.DENIED
    ) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant locationpermissions to use this app.',
      )
      return false
    }

    return true
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    const location = await getCurrentPositionAsync()

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }

  function pickOnMapHandler() {}

  let locationPreview = <Text>No location picked yet.</Text>

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(
            pickedLocation.lat,
            pickedLocation.lng,
          ),
        }}
      />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlineButton
          icon='location'
          onPress={getLocationHandler}
        >
          Locate User
        </OutlineButton>
        <OutlineButton
          icon='map'
          onPress={pickOnMapHandler}
        >
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 8,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
})
