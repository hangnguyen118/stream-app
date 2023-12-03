import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SquareButton, Logo } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../AuthContext';
import { RootStackScreenProps } from '../navigation/types';
import config from '../apiconfig';

const RegisterScreen = ({navigation, route}: RootStackScreenProps<'Register'>) => {
  const { dispatch } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleButtonPressRegister = async () => {
    console.log("Nhấn đăng ký")
    try {
      const response = await fetch(config.API_URL+'/api/auth/register',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        phone: phone
      }),
      });
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }
      const data = await response.json();
      console.log(data.content)
      dispatch({ type: 'LOGIN', payload: data });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Logo/>  
      
      <TextInput placeholder={'Name'} value={username} onChangeText={(text) => setUsername(text)} style={styles.textInput}></TextInput> 
      <TextInput placeholder={'Email'} value={email} onChangeText={(text) => setEmail(text)} style={styles.textInput}></TextInput> 
      <TextInput placeholder={'Password'} value={password} onChangeText={(text) => setPassword(text)} style={styles.textInput}></TextInput> 
      
      <TextInput placeholder={'phone'} value={phone} onChangeText={(text) => setPhone(text)} style={styles.textInput}></TextInput> 
      <SquareButton title=" Continue " handleButtonPress={handleButtonPressRegister}/>
      <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 16}}>
      <Text>______________________ or ______________________</Text>
      </View>
      <TouchableOpacity style={styles.linkButton} onPress={()=> navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login now</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    flex: 1
  },
  textInput: {
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
  link: {
    color: "blue"
  },
  linkButton: {
    height: 40,
    alignItems: "center"
  }
})