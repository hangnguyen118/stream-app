import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState, useReducer, createContext, useContext } from 'react';
import { SquareButton, Logo } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../AuthContext';
import { facebookIcon, googleIcon } from '../assets';
import { RootStackScreenProps } from '../navigation/types';
import config from '../apiconfig';

const LoginScreen = ({ navigation, route }: RootStackScreenProps<'Login'>) => {
    const { dispatch } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleButtonPressLogin = async () => {
      try {
        const response = await fetch(config.API_URL+'/api/auth/login',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          email: email,
          password: password,
        }),
        });
        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          return;
        }
        const data = await response.json();
        dispatch({ type: 'LOGIN', payload: data });
      } catch (error) {
        console.error(error);
      }
    }
    return (
      <SafeAreaView style={styles.container}>
        <Logo/>
        <TextInput placeholder={'Username or Email'} placeholderTextColor={'#c5c5d2'} value={email} onChangeText={(text) => setEmail(text)} style={styles.textInput}></TextInput> 
        <TextInput placeholder={'Password'} placeholderTextColor={'#c5c5d2'} value={password} onChangeText={(text) => setPassword(text)} style={styles.textInput}></TextInput>   
        <SquareButton title=" Login " handleButtonPress={handleButtonPressLogin} />
        <TouchableOpacity><Text>Forgot your password?</Text></TouchableOpacity>
        
        <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 16}}>
          <Text>______________________ or ______________________</Text>
        </View>
  
        <SquareButton title=" Login with Google " color="#F2F3F5" textColor="black" iconRight={<Image source={facebookIcon} style={styles.icon}/>} borderWidth={1}/>
        <SquareButton title=" Login with Facebook " color="#F2F3F5" textColor="black" iconRight={<Image source={googleIcon} style={styles.icon}/>} borderWidth={1} />
        <View style={{marginTop: 56}}></View>
        <TouchableOpacity style={styles.linkButton} onPress={()=> navigation.navigate('Register')}><Text style={styles.link}>Don't have an account? Register now</Text></TouchableOpacity>
      </SafeAreaView>
    )
  }
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    container: {
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: 'white',
      flex: 1
    },
    textInput: {
      color: 'black',
      height: 48,
      borderRadius: 8,       
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 6,
      marginTop: 6,
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
    },
    icon: {
      width: 20,
      height: 20
    },
    link: {
      color: "blue"
    },
    linkButton: {
      height: 40,
      alignItems: "center"
    }
  })