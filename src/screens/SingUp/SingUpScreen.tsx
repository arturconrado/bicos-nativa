import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import { TextInput, Button, RadioButton, useTheme } from 'react-native-paper';
import {useForm, Controller, FormProvider, useFormContext, useController} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {createUser} from "../../services/user/users.service";

// Esquema de validação com yup
const signUpSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
    senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    telefone: yup.string().required('Telefone obrigatório'),
    tipo: yup.string().required('Tipo de usuário é obrigatório'),
});

const FormInput = ({ name, placeholder, secureTextEntry, keyboardType, style }) => {
    const { control } = useFormContext();
    const { field, fieldState: { error } } = useController({ name, control });
    return (
        <View style={style}>
            <TextInput
                label={placeholder}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                error={!!error}
                mode="outlined"
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
    );
};

export default function SignUpScreen({ navigation }) { // Certifique-se de que `navigation` está sendo recebido aqui
    const methods = useForm({
        // resolver: yupResolver(signUpSchema),
    });
    const { handleSubmit } = methods;
    const { colors } = useTheme();
    const [tipo, setTipo] = useState('cliente');

    const onSubmit = async (data) => {
        const fullData = { ...data, tipo }; // Inclui o estado `tipo` nos dados do formulário

        const result = await createUser(fullData);
        if (result) {
            Alert.alert("Sucesso", "Usuário criado com sucesso!");
            navigation.goBack();
        } else {
            Alert.alert("Erro", "Não foi possível criar o usuário.");
        }
    };

    return (
        <FormProvider {...methods}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Cadastro</Text>
                <FormInput name="nome" placeholder="Nome" style={styles.input} />
                <FormInput name="email" placeholder="E-mail" keyboardType="email-address" style={styles.input} />
                <FormInput name="senha" placeholder="Senha" secureTextEntry style={styles.input} />
                <FormInput name="telefone" placeholder="Telefone" keyboardType="phone-pad" style={styles.input} />

                <Text style={styles.radioTitle}>Tipo de Usuário</Text>
                <RadioButton.Group onValueChange={setTipo} value={tipo}>
                    <View style={styles.radioContainer}>
                        <RadioButton value="Cliente" color={colors.primary} />
                        <Text style={styles.radioLabel}>Cliente</Text>
                    </View>
                    <View style={styles.radioContainer}>
                        <RadioButton value="Prestador" color={colors.primary} />
                        <Text style={styles.radioLabel}>Prestador</Text>
                    </View>
                </RadioButton.Group>

                <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
                    Cadastrar
                </Button>
            </ScrollView>
        </FormProvider>

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
