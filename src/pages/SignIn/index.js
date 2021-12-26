import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Platform
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import auth from '@react-native-firebase/auth'

export default function SignIn() {
    const [type, setType] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    function handleLogin() {
        if (type) {

            if (name === '' || email === '' || password === '') return

            auth()
                .createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    user.user.updateProfile({
                        displayName: name
                    })
                        .then(() => {
                            navigation.goBack()
                        })
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('E-mail já em uso!')
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('E-mail inválido!')
                    }
                })
        }
        else {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    navigation.goBack()
                })
                .catch((error) => {
                    if (error.code === 'auth/invalid-email') {
                        console.log('E-mail inválido!')
                    }
                })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.logo}>HeyGrupos</Text>
            <Text style={{ marginBottom: 20 }}>Ajude, colabore, faça networking!</Text>

            {type && (
                <TextInput
                    style={styles.input}
                    placeholder='Qual o seu nome?'
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholderTextColor="#99999b"
                />
            )}


            <TextInput
                style={styles.input}
                placeholder='Seu e-mail'
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="#99999b"
            />

            <TextInput
                style={styles.input}
                placeholder='Sua senha'
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="#99999b"
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={[styles.buttonLogin, { backgroundColor: type ? "#f53745" : "#57dd86" }]}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>
                    {type ? "Cadastrar" : "Acessar"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setType(!type)}>
                <Text>
                    {type ? "Já possuo um conta" : "Criar uma nova conta"}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    logo: {
        fontSize: 28,
        marginTop: Platform.OS === 'android' ? 55 : 80,
        color: '#121212',
        fontWeight: 'bold'
    },
    input: {
        color: '#121212',
        backgroundColor: '#ebebeb',
        width: '90%',
        borderRadius: 6,
        marginBottom: 10,
        paddingHorizontal: 8,
        height: 50,
    },
    buttonLogin: {
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 19,
    }
})