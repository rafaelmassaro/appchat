import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import auth from '@react-native-firebase/auth'

export default function ChatRoom() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text>Chat Room</Text>
            <Button title='Login' onPress={() => navigation.navigate('SignIn')} />
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