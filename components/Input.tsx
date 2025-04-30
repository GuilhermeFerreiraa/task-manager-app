import { TextInput, TextInputProps, Text, StyleSheet } from 'react-native';
import { Box } from './Box';
import { useController, Control, FieldValues, Path } from '../libs/form';

interface InputProps<T extends FieldValues> extends Omit<TextInputProps, 'defaultValue'> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  error?: string;
}

export function Input<T extends FieldValues>({
  name,
  control,
  label,
  error,
  style,
  ...props
}: InputProps<T>) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <Box>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...props}
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </Box>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  error: {
    color: '#ff3b30',
    fontSize: 14,
    marginBottom: 10,
  },
}); 