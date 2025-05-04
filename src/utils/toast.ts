import Toast from 'react-native-toast-message';

export const showSuccess = (message: string) => {
  Toast.show({
    type: 'success',
    text1: 'Sucesso!',
    text2: message,
    position: 'top',
    visibilityTime: 3000,
  });
};

export const showError = (message: string) => {
  Toast.show({
    type: 'error',
    text1: 'Erro!',
    text2: message,
    position: 'top',
    visibilityTime: 4000,
  });
};

export const showInfo = (message: string) => {
  Toast.show({
    type: 'info',
    text1: 'Informação',
    text2: message,
    position: 'top',
    visibilityTime: 3000,
  });
};
