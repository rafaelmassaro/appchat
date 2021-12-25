import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function SignIn() {
    return (
        <View style={styles.container}>
            <Text>Login</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})