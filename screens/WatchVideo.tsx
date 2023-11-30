import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HomeStackScreenProps } from '../navigation/types';
import Video from 'react-native-video';

const WatchVideo = ({navigation, route}: HomeStackScreenProps<'WatchVideo'>) => {
  const videoRef = useRef(null);
  useEffect(() => {
  }, [route.params.sourceUri]);

  return (
    <View>
    <Video source={{uri: `http://192.168.1.76:8080/api/videos/watch?sourceuri=${route.params.sourceUri}`}} 
      resizeMode='contain'
      style={styles.video}
      controls={true}
      />  

    <Text style={styles.title}>{route.params.title}</Text>
    <Text style={styles.author}>Author: {route.params.authorName}</Text>
    <Text style={styles.info}>{route.params.info}</Text>
    <Text style={styles.like}>{route.params.likes}</Text>
    </View>
  );
};

export default WatchVideo;

const styles = StyleSheet.create({
  title: {
      fontWeight: "500",
      fontSize: 14
  },
  author: {
      fontWeight: "300",
      fontSize: 12
  },
  info: {
    fontWeight: "300",
    fontSize: 12,
  },
  like: {
    fontWeight: "300",
    fontSize: 24,
    color: "blue"
  },
  video: {
    width: "auto",
    height: 300,
    backgroundColor: 'black'
  }
})