import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen, ChatScreen} from '../screens';
import { MainTabParamList } from './types';
import HomeStackNavigator from './HomeStackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator<MainTabParamList>();
const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{headerShown: false}}/>         
        <Tab.Screen name="Chat" component={ChatScreen}/>      
        <Tab.Screen name="Profile" component={ProfileScreen}/>        
    </Tab.Navigator>
  )
}
export default MainTabNavigator;