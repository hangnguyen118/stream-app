import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Camera, useCameraDevices, useCameraDevice, useCameraPermission, useCameraFormat } from 'react-native-vision-camera'
import { useEffect, useRef, useState } from 'react'
import { NoCameraDeviceError } from '../components'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { flip, photoCamera, picture } from '../assets'
const CameraScreen = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraDevice, setCameraDevice] = useState<'back' | 'front'>('back');
  const device = useCameraDevice(cameraDevice);
  const format = useCameraFormat(device, [
    { fps: 30 },
  ])
  const cameraRef = useRef<Camera|null>(null);
  const [photo, setPhoto] = useState('');
  
  useEffect(()=>{

  },[])
  if (!hasPermission) {
    requestPermission();
  }

  if (device == null) return <NoCameraDeviceError/>

  const takePhoto = async () => {
    console.log("TAKE IMAGE")
    if(cameraRef.current){
      const photo = await cameraRef.current.takePhoto();            
      setPhoto(`file://${photo.path}`)    
  }
}
const flipCamera = () => {
  setCameraDevice((prevDevice) => (prevDevice === 'back' ? 'front' : 'back'));
};
  return (
      <View>
        <Camera style={styles.camera} ref={cameraRef} device={device} photo={true} isActive={true} format={format}/>    
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={picture} style={styles.iconButton}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
            <Image source={photoCamera} style={styles.iconButton}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={flipCamera} style={styles.iconButton}>
            <Image source={flip} style={styles.iconButton}/>
          </TouchableOpacity>
          
        </View>
      </View>
  )
}

export default CameraScreen;

const styles = StyleSheet.create({
  camera: {
    width: 'auto',
    height:'100%'
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    width: 100,
    height:50
  },
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:"auto",
    height: 70  
  },
  iconButton:{
    width: 40,
    height: 40,
  }
})