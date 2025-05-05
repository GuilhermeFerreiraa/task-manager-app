// Mock simples para react-native
const React = require('react');

const mockComponent = (name) => {
  return ({ children, ...props }) => React.createElement(name, props, children);
};

module.exports = {
  StyleSheet: {
    create: (styles) => styles,
    compose: jest.fn(),
    flatten: jest.fn(),
  },
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios),
  },
  Text: mockComponent('Text'),
  View: mockComponent('View'),
  TouchableOpacity: mockComponent('TouchableOpacity'),
  TextInput: mockComponent('TextInput'),
  ScrollView: mockComponent('ScrollView'),
  Image: mockComponent('Image'),
  FlatList: mockComponent('FlatList'),
  Pressable: mockComponent('Pressable'),
  SafeAreaView: mockComponent('SafeAreaView'),
  Modal: mockComponent('Modal'),
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
  },
  NativeModules: {
    SettingsManager: {
      settings: {
        AppleLocale: 'en_US',
        AppleLanguages: ['en'],
      },
    },
  },
  Animated: {
    View: mockComponent('AnimatedView'),
    Text: mockComponent('AnimatedText'),
    createAnimatedComponent: jest.fn((component) => component),
    timing: jest.fn(() => ({
      start: jest.fn(),
    })),
    Value: jest.fn(() => ({
      interpolate: jest.fn(),
      setValue: jest.fn(),
    })),
  },
}; 