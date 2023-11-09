import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, RadioButton, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Esquema de validação com yup
const signUpSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
    senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    telefone: yup.string().required('Telefone Obrigatorio'),
    tipo: yup.string().required('Tipo de usuário é obrigatório'),
});

export default function SignUpScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
    });
    const { colors } = useTheme();
    const [tipo, setTipo] = React.useState('cliente');

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <Controller
                control={control}
                name="nome"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Nome"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={!!errors.nome}
                        style={styles.input}
                        mode="outlined"
                    />
                )}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}

            {/* Repita para os outros campos */}

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="E-mail"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={!!errors.email}
                        style={styles.input}
                        mode="outlined"
                        keyboardType="email-address"
                    />
                )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            <Controller
                control={control}
                name="senha"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Senha"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={!!errors.senha}
                        style={styles.input}
                        mode="outlined"
                        secureTextEntry
                    />
                )}
            />
            {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}

            <Controller
                control={control}
                name="telefone"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Telefone"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={!!errors.telefone}
                        style={styles.input}
                        mode="outlined"
                        keyboardType="phone-pad"
                    />
                )}
            />

            <RadioButton.Group onValueChange={newValue => setTipo(newValue)} value={tipo}>
                <View style={styles.radioContainer}>
                    <RadioButton value="cliente" color={colors.primary} />
                    <Text style={styles.radioLabel}>Cliente</Text>
                </View>
                <View style={styles.radioContainer}>
                    <RadioButton value="profissional" color={colors.primary} />
                    <Text style={styles.radioLabel}>Profissional</Text>
                </View>
            </RadioButton.Group>

            <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
                Cadastrar
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    radioTitle: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioLabel: {
        fontSize: 16,
        marginLeft: 8,
    },
});
