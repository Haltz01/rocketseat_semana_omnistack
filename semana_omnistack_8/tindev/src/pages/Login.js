import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAvoidingView, Platform, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native';
// TouchableOpacity = botão que, ao ser clicado, perde opacidade

import api from '../services/api';

import logo from '../assets/logo.png;'
import { Platform } from 'os';

export default function Login({ navigation }) {
    const [user, setUser] = useState('');
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user });
            }
        })
    }, []); // [] = só executa uma vez

    async function handleLogin() {
        const response = api.post('/devs', { username: user });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { user: _id });
    }

    return (
        <KeyboardAvoidingView // essa box evita que o teclado cubra o conteúdo
            behavior="padding" // conteúdo vai para cima
            enabled={Platform.OS === 'ios'}
            style={styles.container}
        >
            <Image source={logo} />

            <TextInput
                autoCapitalize="none" // tira a primeira letra maiúscula (que acontece por padrão)
                autoCorrect="false" // não sugere correções no texto digitado
                placeholder="Digite seu usuário no Github" 
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity onPress={handleLogin} style={ styles.button }>
                <Text style={ styles.buttonText }> </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30 // em pixels
    },
    input: {
        height: 46,
        alignSelf: 'stretch', // ocupa toda a largura possível
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15 // = padding: 0 15 em css
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});