import { View, Text, StyleSheet, AppState, Image, TouchableOpacity } from 'react-native'
import { useState, useRef, useEffect} from 'react'
import { Camera, useCameraDevice, useCameraPermission, VideoFile } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { flip, cameraIcon, closeIcon, recordIcon, recordButton, stopButton, logoCamera, liveIcon} from '../assets'
import { RootStackScreenProps } from '../navigation/types';

const CameraScreen = ({ navigation, route }: RootStackScreenProps<'Camera'>) => {  

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

  const [image, setImage] = useState<string>();
  const [video, setVideo] = useState<VideoFile>();
  
  const [mode, setMode] = useState<'record' | 'photo' | 'live'>('photo');
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
  
  const takePicture = async () =>{
    const photo = await cameraRef.current?.takePhoto();
    console.log(photo?.path)
    if(photo){
      setImage('file://'+ photo.path);
    }
  }

  const flipCamera = () => {
    setCameraPosition((prevDevice) => (prevDevice === 'back' ? 'front' : 'back'));
  };

  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet'
  //   console.log(`${frame.timestamp}: ${frame.width}x${frame.height} ${frame.pixelFormat} Frame (${frame.orientation})`)
  // }, [])

  const stopCamera = async () => {
    await setCameraPosition('front');
    navigation.goBack();
  }
  const [modeIcon, setModeIcon] = useState(logoCamera);

  const changeMode = () => {
  setMode((currentMode) => {
    if (currentMode === 'photo') {
      setModeIcon(recordIcon);
      return 'record';
    } else if (currentMode === 'record') {
      setModeIcon(liveIcon);
      return 'live';
    } else {
      setModeIcon(logoCamera);
      return 'photo';
    }
  });
};

  const startRecord = async () => {
    setOnRecord(true);    
    intervalRef.current = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000);

    if(cameraRef.current){
      cameraRef.current.startRecording({
        onRecordingFinished: (video) => setVideo(video),
        onRecordingError: (error) => console.error(error)
      })
    }
  }

  const stopRecord = () => {
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
      ref={cameraRef}
      device={device}
      isActive={isActive}
      photo={true}
      video={true}
      //audio={true}
    />
      <View style={styles.topHeader}>        
        <TouchableOpacity onPress={stopCamera}><Image style={{width: 24, height: 24}} source={closeIcon}/></TouchableOpacity>
        {onRecord && <Text style={{color: 'white'}}>{formatTime()}</Text>}
        <TouchableOpacity onPress={changeMode}><Image style={{width: 40, height: 40}} source={modeIcon}/></TouchableOpacity>
      </View>      
      <View style={styles.bottomContainer}>
            {image? <Image style={styles.image} source={{uri: image}}/> : <View style={styles.image} />}
            { mode ==='photo' ? 
              <TouchableOpacity onPress={takePicture} style={styles.iconButton}>
              <Image source={cameraIcon} style={styles.iconButton}/>
            </TouchableOpacity> :
              <>
                {
                onRecord ? 
                <TouchableOpacity onPress={stopRecord} style={styles.iconButton}>
                    <Image source={stopButton} style={styles.iconButton}/>
                </TouchableOpacity> : 
                <TouchableOpacity onPress={startRecord} style={styles.iconButton}>
                    <Image source={recordButton} style={styles.iconButton}/>
                </TouchableOpacity>
                }
              </>
            }                                   
            <TouchableOpacity onPress={flipCamera} style={styles.iconButton}>
              <Image source={flip} style={styles.iconButton}/>
            </TouchableOpacity>
        </View>          
    </>    
  )
}

export default CameraScreen;

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

