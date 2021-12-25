import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import auth from '@react-native-firebase/auth'

export default function ChatRoom() {
    return (
        <View style={styles.container}>
            <Text>Chat Room</Text>
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