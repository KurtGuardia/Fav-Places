import {
  View,
  Text,
  Button,
  Alert,
  Image,
  StyleSheet,
} from 'react-native'
import React, { useState } from 'react'
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker'
import { Colors } from '../../constants/colors'
import OutlineButton from '../UI/OutlineButton'

export default function ImagePicker() {
  const [pickedImage, setPickedImage] = useState()
  const [cameraPermissioInformation, requestPermission] =
    useCameraPermissions()

  async function verifyPermissions() {
    if (
      cameraPermissioInformation.status ===
      PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }

    if (
      cameraPermissioInformation.status ===
      PermissionStatus.DENIED
    ) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.',
      )
      return false
    }

    return true
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    })

    setPickedImage(image.assets[0].uri)
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if (pickedImage) {
    imagePreview = (
      <Image
        style={styles.image}
        source={{ uri: pickedImage }}
      />
    )
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <OutlineButton
        icon='camera'
        onPress={takeImageHandler}
      >
        Take Image
      </OutlineButton>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview: {
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
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
