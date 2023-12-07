import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen, RegisterScreen, CameraScreen, LiveScreen } from '../screens';
import { useAuth } from '../AuthContext';
import { RootStackParamList } from './types';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootStackNavigator = () => {
const { state } = useAuth();    
  return (
    <NavigationContainer>
        <Stack.Navigator>        
            { state.isAuthenticated ? 
            (
              <>
                <Stack.Screen name="MainTab" component={MainTabNavigator} options={{headerShown: false, headerTitleAlign:'center'}}/>
                <Stack.Screen name="Camera" component={CameraScreen} options={{headerShown: false}} />  
                <Stack.Screen name="Live" component={LiveScreen} options={{headerShown: false}} />                             
              </>
            ) : (
            <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />                           
            </>
          )
        }  
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStackNavigator;

