import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
    title: string,
    color?: string,
    textColor?: string,
    iconLeft?: React.ReactNode,
    iconRight?: React.ReactNode,
    borderWidth?: number,
    handleButtonPress?: () => Promise<void>;
}

const SquareButton = ( {title, color = '#1877F2', textColor = "white", iconLeft, iconRight, borderWidth = 0, handleButtonPress }: Props) => {
    return (
        <TouchableOpacity onPress={handleButtonPress} style={{...styles.button, backgroundColor: color, borderWidth: borderWidth}}>
            {iconLeft}
            <Text style={{...styles.text, color: textColor}}>{title}</Text>
            {iconRight}
        </TouchableOpacity>
    )
}

export default SquareButton;

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 8,       
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
        marginTop: 6,
        borderColor: '#DADDE1'
    },
    text: {
        height: 24,
        fontSize: 16,
        fontWeight: '500'
    }
})

