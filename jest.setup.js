import '@testing-library/jest-native/extend-expect';

// Adding toBeOnTheScreen for compatibility with tests
expect.extend({
  toBeOnTheScreen(received) {
    const pass = received !== null;
    if (pass) {
      return {
        message: () => `expected ${received} not to be on the screen`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be on the screen`,
        pass: false,
      };
    }
  },
});

// Mock for expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useLocalSearchParams: jest.fn().mockReturnValue({}),
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

// Mock for react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    handleSubmit: (fn) => (e) => {
      e?.preventDefault?.();
      return fn();
    },
    formState: { errors: {} },
    watch: jest.fn(),
    setValue: jest.fn(),
    reset: jest.fn(),
  }),
  useController: () => ({
    field: {
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: {},
    },
    fieldState: { error: null },
  }),
  Controller: ({ render }) =>
    render({ field: { value: '', onChange: jest.fn() }, fieldState: { error: null } }),
}));

// Mock for expo-constants
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      apiUrl: 'http://localhost:3000',
    },
  },
}));

// Mock for react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const React = require('react');

  const View = ({ children, ...props }) => React.createElement('View', props, children);

  return {
    View,
    createAnimatedComponent: (Component) => Component,
    useAnimatedStyle: () => ({}),
    useSharedValue: (initialValue) => ({ value: initialValue }),
    withTiming: (val) => val,
    getFlatList: () => require('react-native').FlatList,
    getView: () => View,
    getScrollView: () => require('react-native').ScrollView,
    getImage: () => require('react-native').Image,
    getText: () => require('react-native').Text,
    default: {
      Easing: {
        bezier: jest.fn(),
      },
      Extrapolation: {
        CLAMP: jest.fn(),
      },
    },
  };
});

// Mock for @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock for react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children, ...props }) => React.createElement(View, props, children),
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
  };
});

// Mock for @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
}));

// Mock for @tanstack/react-query
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(() => ({
    data: null,
    isLoading: false,
    isError: false,
  })),
  useMutation: jest.fn(() => ({
    mutate: jest.fn(),
    isLoading: false,
  })),
}));

// Suppress warnings during tests
jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

// Mock for timers
jest.useFakeTimers();
