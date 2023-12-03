import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Camera, useMicrophonePermission, useCameraDevice, useCameraPermission, useCameraFormat, useFrameProcessor, Frame, runAsync } from 'react-native-vision-camera'
import { useEffect, useRef, useState } from 'react'
import { NoCameraDeviceError } from '../components';
import { flip, recordButton, picture, stopButton } from '../assets'
import { useIsFocused } from '@react-navigation/native';
import { AppState } from 'react-native';


const LiveScreen = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraDevice, setCameraDevice] = useState<'back' | 'front'>('back');
  const device = useCameraDevice(cameraDevice, {});
  const format = useCameraFormat(device, [{ fps: 60 }]);
  const cameraRef = useRef<Camera|null>(null);
  const [onRecord, setOnRecord] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const isFocused = useIsFocused()
  const appState = AppState.currentState;
  const isActive = isFocused && appState === "active"

  if(!hasPermission) {
    requestPermission();
  }
  // if(!hasMicrophonePermission){
  //   requestMicrophonePermission();
  // }
  if(device == null) return <NoCameraDeviceError/>
  const startLive = () => {
    setOnRecord(true);
  }
  const stopLive = () => {
    console.log(seconds);
    setSeconds(0)
    setOnRecord(false);
  }
const flipCamera = () => {
  setCameraDevice((prevDevice) => (prevDevice === 'back' ? 'front' : 'back'));
};
const frameProcessor = useFrameProcessor((frame) => {
  'worklet'
  console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`)
}, [])
  return (
      <View>
        <Camera frameProcessor={frameProcessor} style={styles.camera} ref={cameraRef} device={device} isActive={false} format={format} video={true} audio={false} />    
        <View style={styles.bottomContainer}>
            <View>
                <Text style={styles.timeLive}>{seconds}</Text>
            </View>
            {
                onRecord ? 
                <TouchableOpacity onPress={stopLive} style={styles.iconButton}>
                    <Image source={stopButton} style={styles.iconButton}/>
                </TouchableOpacity> : 
                <TouchableOpacity onPress={startLive} style={styles.iconButton}>
                    <Image source={recordButton} style={styles.iconButton}/>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={flipCamera} style={styles.iconButton}>
                <Image source={flip} style={styles.iconButton}/>
            </TouchableOpacity>          
        </View>
      </View>
  )
}

export default LiveScreen;

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
  },
  timeLive: {
    color: 'white',
    fontSize: 14
  }
})
