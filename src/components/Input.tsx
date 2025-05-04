import { StyleSheet, Text, TextInput, TextInputProps } from 'react-native';

import React from 'react';
import { Controller, Path, Control } from 'react-hook-form';

function applyDateMask(text: string): string {
  const cleaned = text.replace(/\D/g, '');

  if (cleaned.length <= 2) {
    return cleaned;
  } else if (cleaned.length <= 4) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  } else {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  }
}

interface InputProps extends TextInputProps {
  label: string;
  name: Path<any>;
  control: Control<any>;
}

export const Input = ({
  name,
  control,
  label,
  secureTextEntry,
  autoCapitalize,
  multiline,
  numberOfLines = 1,
  keyboardType,
  maxLength,
  ...rest
}: InputProps) => {
  const handleTextChange = (text: string, field: any) => {
    if (name === 'due_date') {
      const maskedText = applyDateMask(text);
      field.onChange(maskedText);
    } else {
      field.onChange(text);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <React.Fragment>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            style={[
              styles.input,
              multiline && styles.multiline,
              fieldState.error && styles.inputError,
            ]}
            onChangeText={(text) => handleTextChange(text, field)}
            value={field.value}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
            maxLength={maxLength}
            {...rest}
          />
          {fieldState.error && (
            <Text style={styles.errorText}>{fieldState.error.message}</Text>
          )}
        </React.Fragment>
      )}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  multiline: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 5,
  },
});
