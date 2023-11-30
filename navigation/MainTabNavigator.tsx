import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen, CameraScreen, ChatScreen, WatchVideo, HomeScreen} from '../screens';
import { MainTabParamList } from './types';
import HomeStackNavigator from './HomeStackNavigator';
const Tab = createBottomTabNavigator<MainTabParamList>();
const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{headerShown: false}}/>
        <Tab.Screen name="Camera" component={CameraScreen} options={{headerShown: false}} /> 
        <Tab.Screen name="Chat" component={ChatScreen}/>      
        <Tab.Screen name="Profile" component={ProfileScreen}/>                
    </Tab.Navigator>
  )
}
export default MainTabNavigator;