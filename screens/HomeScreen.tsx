import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { HomeStackScreenProps, VideoItemProps } from '../navigation/types';
import config from '../apiconfig';
import { VideoItem } from '../components';
import { fireIcon, logoCamera, liveIcon } from '../assets';

const HomeScreen = ({navigation, route}: HomeStackScreenProps<'Home'>) => {
  const [videos, setVideos] = useState<VideoItemProps[]>([]);
  useEffect(() => {
    getVideoData();
  },[]);
  
  const getVideoData = async () => {
  const response = await fetch(config.API_URL+'/api/videos/all');
  if(response.ok){
    response.json().then((data)=>{
      setVideos(data)
    })
  }  
}
const handleOpenVideo = ({sourceUri, title, authorName, views, likes}: VideoItemProps) => {
  navigation.navigate('WatchVideo', {sourceUri, title, authorName, views, likes});
};
  return (
    <SafeAreaView>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}><Image source={logoCamera} style={styles.cameraIcon}/></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Live')}><Image source={liveIcon} style={styles.cameraIcon}/></TouchableOpacity>
        </View>
        <View>
        <Text style={styles.title}>Hot Today<Image source={fireIcon} style={styles.icon}/></Text>          
          {
            videos!=null && <FlatList data={videos}
            renderItem={({item}) => <VideoItem title={item.title} 
                                    preview={item.preview} 
                                    authorName={item.authorName} 
                                    views={item.views} 
                                    likes={item.likes} 
                                    id={item.id} 
                                    sourceUri={item.sourceUri} 
                                    handleOpenVideo={() => handleOpenVideo(item)}/>} />
          }           
        </View>
        
    </SafeAreaView>
  )
}
export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between'
  },
  container: {    
    backgroundColor: 'white'
  },
  item: {
      flex: 1,
  },
  title: {
    fontSize:20
  },
  videoPreview: {
  },
  icon: {
    width: 28,
    height: 28
  },
  cameraIcon: {
    width: 50,
    height: 50,
  }
})