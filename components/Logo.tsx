import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { logoIcon } from '../assets'

const Logo = () => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View style={styles.logo}>
            <Image style={styles.logoIcon}source={logoIcon}/>
            <Text style={styles.textLogo}>LaxStream</Text>
        </View> 
    </View>        
  )
}

export default Logo

const styles = StyleSheet.create({
    logo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "auto",
        height: 160,
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 16,
    },
    textLogo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    logoIcon: {
      width: 60,
      height: 60
    }
})