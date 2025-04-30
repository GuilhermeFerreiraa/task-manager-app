import { Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Box } from 'components';

export default function NotFoundScreen() {
  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Página não encontrada</Text>
      <Link href="/" asChild>
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
