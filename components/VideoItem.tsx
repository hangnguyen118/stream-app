import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { VideoItemProps } from '../navigation/types';
import config from '../apiconfig';

const VideoItem = ({title, preview, authorName, handleOpenVideo, views, likes, sourceUri, id}: VideoItemProps) => {   
    return (
    <TouchableOpacity key={id} onPress={handleOpenVideo} style={styles.item}>      
      <Image width={500} height={250} source={{uri: `${config.API_URL}/api/auth/images?sourceuri=${preview}`}} />
      {/* <Image width={200} height={500} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/stream-project-4fba2.appspot.com/o/videoImages%2Fcookingvideo.jpg?alt=media&token=70af72c5-c077-4587-9907-3a3f58d81e51'}}/> */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>Author: {authorName}</Text>
      <Text style={styles.author}>Views: {views}</Text>
    </TouchableOpacity>  
    )
  };

export default VideoItem;

const styles = StyleSheet.create({
    item: {
        marginBottom: 20
    },
    title: {
        fontWeight: "500",
        fontSize: 14
    },
    author: {
        fontWeight: "300",
        fontSize: 12
    }
})