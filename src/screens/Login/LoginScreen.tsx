import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {loginUser} from "../../services/user/users.service";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);
        try {
            const result = await loginUser({ email, senha });
            if (result.error) {
                Alert.alert("Erro", result.error);
            } else {
                Alert.alert("Sucesso", "Login realizado com sucesso!");
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Ocorreu um erro desconhecido.";
            Alert.alert("Erro", errorMessage);
        } finally {
            setLoading(false);
        }
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Bem-vindo!</Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        label="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <TextInput
                        label="Senha"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                        mode="outlined"
                        style={styles.input}
                    />
                    <Button
                        mode="contained"
                        onPress={handleLogin}
                        loading={loading}
                        disabled={loading}
                        style={styles.button}
                    >
                        Entrar
                    </Button>
                    <Text
                        onPress={() => navigation.navigate('SignUp')}
                        style={styles.signUpText}
                    >
                        Não tem uma conta? Cadastre-se
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    form: {
        marginHorizontal: 30,
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
        paddingVertical: 8,
    },
    signUpText: {
        marginTop: 15,
        textAlign: 'center',
        color: '#6200ee',
        fontWeight: '600',
    },
});
