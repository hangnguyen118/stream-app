import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen, CameraScreen, ChatScreen, LiveScreen} from '../screens';
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
        <Tab.Screen name="Live" component={LiveScreen}/>               
    </Tab.Navigator>
  )
}
export default MainTabNavigator;