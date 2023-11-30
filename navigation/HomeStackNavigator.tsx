import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, WatchLive, WatchVideo } from '../screens';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();
const HomeStackNavigator = () => {
  return (
        <Stack.Navigator>        
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="WatchVideo" component={WatchVideo} />
            <Stack.Screen name="WatchLive" component={WatchLive} />              
        </Stack.Navigator>
  )
}

export default HomeStackNavigator;

