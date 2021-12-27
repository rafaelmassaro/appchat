import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import FabButton from '../../components/FabButton'
import ModalNewRoom from '../../components/ModalNewRoom'

export default function ChatRoom() {
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    const [user, setUser] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    const [threads, setThreads] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null

        // console.log(hasUser)
        setUser(hasUser)
    }, [isFocused])

    useEffect(() =>{
        let isActive = true

        function getChats(){
            firestore()
            .collection('MESSAGE_THREADS')
            .orderBy('lastMessage.createdAt', 'desc')
            .limit(10)
            .get()
            .then((snapshot) => {
                const threads = snapshot.docs.map( documentSnapshot => {
                    return{
                        _id: documentSnapshot.id,
                        name: '',
                        lastMessage: {text: ''},
                        ...documentSnapshot.data()
                    }
                })

                if(isActive){
                    setThreads(threads)
                    setLoading(false)
                    console.log(threads)
                }
            })
        }

        getChats()

        return () => {
            isActive = false
        }

    }, [isFocused])

    function handleSignOut() {
        auth()
            .signOut()
            .then(() => {
                setUser(null)
                navigation.navigate('SignIn')
            })
            .catch(() => {
                console.log('Não possui nenhum usuário')
            })
    }

    if(loading){
        return(
            <ActivityIndicator size="large" color="#555"/>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerRoom}>
                <View style={styles.headerRoomLeft}>

                    {user && (
                        <TouchableOpacity onPress={handleSignOut}>
                            <MaterialIcons name="arrow-back" size={28} color="#fff" />
                        </TouchableOpacity>
                    )}

                    <Text style={styles.title}>Grupos</Text>
                </View>

                <TouchableOpacity>
                    <MaterialIcons name="search" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            <FabButton setVisible={() => setModalVisible(true)} userStatus={user} />

            <Modal visible={modalVisible} animationType='fade' transparent={true}>
                <ModalNewRoom setVisible={() => setModalVisible(false)} />
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRoom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#2e54d4',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    headerRoomLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        paddingLeft: 10,
    }
})