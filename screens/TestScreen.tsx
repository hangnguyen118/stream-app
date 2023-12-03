'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import Video from 'react-native-video';
import config from '../apiconfig';

const TestScreen = () => {
  const cameraRef = useRef<RNCamera|null>(null);
  const [file,setFile] = useState<string|undefined>();

  // const takePicture = async () => {
  //   while(true){
  //     const options = { quality: 0.5, base64: true };
  //     const file = await cameraRef.current?.takePictureAsync(options);    
  //     if(file){
  //       console.log(file.uri);
  //     }
  //   }    
  // }

  const uploadVideo = async (videoUri: string) => {
    const formData = new FormData();
    formData.append('video', {
      hostId: "hang@gmail.com",
      uri: videoUri,
      type: 'video/mp4',
      name: 'video.mp4',
    });
    const response = await fetch(config.API_URL+'/api/auth/host', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Video uploaded successfully:', data);
      } else {
        console.error('Error uploading video. Status:', response.status);
      }
  };

  const startRecord = async () => {
      const option = {
        //maxFileSize: 20*1024*1024, //2MB`
        //maxDuration: 1
      };
      const video = await cameraRef.current?.recordAsync();      
      if(video){
        console.log(video.uri);
        uploadVideo(video.uri);
      }    
  }
  const startLive = async (event:any) => {
    console.log("VIDEO START HERE");
    const { uri, videoOrientation, deviceOrientation } = event.nativeEvent;
    console.log("LINK: "+ uri);
    const data= await fetch(uri);
  }

  const stopRecord = () => {
    cameraRef.current?.stopRecording();
  }

    return (
      <RNCamera ref={cameraRef} style={styles.camera} type={RNCamera.Constants.Type.back} onRecordingStart={startLive}>
        {
          file && <Video style={styles.image} source={{uri: file}}/>
        }
        <TouchableOpacity style={styles.bottomContainer} onPress={startRecord}>
          <Text style={{color:'white'}}>Start Record</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomContainer} onPress={stopRecord}>
          <Text style={{color:'white'}}>Stop</Text>
        </TouchableOpacity>
      </RNCamera>
    ); 
}

export default TestScreen;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200
  },
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
    height: 70,
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
