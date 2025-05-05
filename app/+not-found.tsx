import { StyleSheet, Text } from 'react-native';

import { Link } from 'expo-router';

import { Box } from '@/components';

import { useIsLoggedIn } from '@/store/auth';

export default function NotFoundScreen() {
  const isLoggedIn = useIsLoggedIn();
  const href = isLoggedIn ? '/(tabs)' : '/';

  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Página não encontrada</Text>
      <Link href={href} asChild>
        <Text style={styles.link}>Voltar para a página inicial</Text>
      </Link>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    color: '#007AFF',
    fontSize: 16,
  },
});
