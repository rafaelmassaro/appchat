import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'

export default function ModalNewRoom({ setVisible }) {
    const [roomName, setRoomName] = useState('')

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => setVisible()}>
                <View style={styles.modal}>

                </View>
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Criar um novo grupo</Text>
                <TextInput
                    value={roomName}
                    onChangeText={(text) => setRoomName(text)}
                    placeholder="Nome para sua sala"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.buttonCreate}>
                    <Text style={styles.buttonText}>Criar sala</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(34, 34, 34, 0.4)'
    },
    modal: {
        flex: 1,
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 19,
        marginTop: 14,
    },
    input: {
        borderRadius: 4,
        height: 45,
        backgroundColor: '#ddd',
        marginVertical: 15,
        fontSize: 16,
        paddingHorizontal: 5,
    },
    buttonCreate: {
        borderRadius: 4,
        backgroundColor: '#2e34d4',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
    }
})