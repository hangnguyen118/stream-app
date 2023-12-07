import { View, Text, StyleSheet, AppState, Image, TouchableOpacity } from 'react-native'
import { useState, useRef, useEffect} from 'react'
import { Camera, useCameraDevice, useCameraPermission, VideoFile, useFrameProcessor, runAsync } from 'react-native-vision-camera';
import { flip, closeIcon, recordIcon, recordButton, stopButton, logoCamera, liveIcon} from '../assets'
import { RootStackScreenProps } from '../navigation/types';

const LiveScreen = ({ navigation, route }: RootStackScreenProps<'Live'>) => {  

  const { hasPermission, requestPermission } = useCameraPermission();
  let cameraRef = useRef<Camera | null>(null)

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    console.log('camera start');    
    return () => {       
      setIsActive(false);
      console.log('camers close');
    };
  }, []);

  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>('front');
  let device = useCameraDevice(cameraPosition, {});

  const [video, setVideo] = useState<VideoFile>();
  
  const [onRecord, setOnRecord] = useState(false);

  const [timer, setTimer] = useState(0);
  let intervalRef = useRef<NodeJS.Timeout>();

  const formatTime = () => {
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const remainingSeconds = timer % 60;
    return `${hours} : ${minutes} : ${remainingSeconds}`
  }

  if(!hasPermission){
    requestPermission();  
  }
  
  const flipCamera = () => {
    setCameraPosition((prevDevice) => (prevDevice === 'back' ? 'front' : 'back'));
  };

  const yuvToByteArray = (yuvData: any) => {
    'worklet'  
    const bytes = new Uint8Array(yuvData.length * 4 / 3); // YUV420 có tỷ lệ 4:3
    let byteIndex = 0;
  
    // Copy Y component
    for (let i = 0; i < yuvData.length / 4; i++) {
      bytes[byteIndex++] = yuvData[i];
    }
  
    // Copy U and V components
    for (let i = yuvData.length / 4; i < yuvData.length; i += 2) {
      bytes[byteIndex++] = yuvData[i];
      bytes[byteIndex++] = yuvData[i + 1];
    }
  
    return bytes.buffer;
  };

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'           
    console.log(yuvToByteArray(frame));
    if (frame.pixelFormat === 'rgb') {
      const data = frame.toArrayBuffer()
      console.log(`Pixel at 0,0: RGB(${data[0]}, ${data[1]}, ${data[2]})`)
    }
  }, [])

  const stopCamera = async () => {
    await setCameraPosition('front');
    navigation.goBack();
  }

  const startLive = async () => {
    setOnRecord(true);    
    intervalRef.current = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000);

    if(cameraRef.current){
      
    }
  }

  const stopLive = () => {
    setOnRecord(false);
    clearInterval(intervalRef.current);
    setTimer(0);

    cameraRef.current?.stopRecording();
    console.log(video?.path)
  } 

  if(!device){
    console.log("No camera device");
    return <View></View>
  }
  return (
    <>
    {/* {video && <Video style={{width: 200, height: 200, zIndex: 10}} source={{uri: `file://${video.path}`}}></Video>} */}
      <Camera
      style={StyleSheet.absoluteFill}
      frameProcessor={frameProcessor}
      ref={cameraRef}
      device={device}
      isActive={isActive}
      photo={true}
      video={true}
      pixelFormat='yuv'
      //audio={true}
    />
      <View style={styles.topHeader}>        
        <TouchableOpacity onPress={stopCamera}><Image style={{width: 24, height: 24}} source={closeIcon}/></TouchableOpacity>
        {onRecord && <Text style={{color: 'white'}}>{formatTime()}</Text>}
        <Image style={{width: 40, height: 40}} source={liveIcon}/>
      </View>      
      <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={flipCamera} style={styles.iconButton}>
              <Image source={flip} style={styles.iconButton}/>
            </TouchableOpacity>
                {
                onRecord ? 
                <TouchableOpacity onPress={stopLive} style={styles.iconButton}>
                    <Image source={stopButton} style={styles.iconButton}/>
                </TouchableOpacity> : 
                <TouchableOpacity onPress={startLive} style={styles.iconButton}>
                    <Image source={recordButton} style={styles.iconButton}/>
                </TouchableOpacity>
                }                                       
        </View>          
    </>    
  )
}

export default LiveScreen;

const styles = StyleSheet.create({
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
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  error: {
    color: 'white',
    fontSize: 20
  }, 
  topHeader: {
    width: 'auto',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  }
})

