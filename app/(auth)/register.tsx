import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { router } from 'expo-router';

import { Box, Input } from '@/components';

import { useRegisterForm } from '@/hooks/auth/useRegister';

export default function Register() {
  const { control, onSubmit, errors, handleSubmit } = useRegisterForm();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Box style={styles.content} flex={1} justifyContent="center">
          <Text style={styles.title}>Cadastro</Text>

          <Input
            name="name"
            control={control}
            label="Nome"
            error={errors.name?.message}
            placeholder="Digite seu nome"
            autoCapitalize="words"
          />

          <Input
            name="email"
            control={control}
            label="E-mail"
            error={errors.email?.message}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            name="password"
            control={control}
            label="Senha"
            error={errors.password?.message}
            placeholder="Digite sua senha"
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => router.push('/(auth)/login')}
            accessibilityRole="button"
          >
            <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
