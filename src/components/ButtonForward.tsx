import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import React, { forwardRef } from 'react';

import { getButtonStyle } from '@/utils/getColors';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
};

export const ButtonForward = forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonProps
>(({ title, isLoading = false, variant = 'primary', style, disabled, ...rest }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      style={[
        styles.button,
        getButtonStyle(variant),
        (disabled || isLoading) && styles.buttonDisabled,
        style,
      ]}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
});

ButtonForward.displayName = 'ButtonForward';

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
