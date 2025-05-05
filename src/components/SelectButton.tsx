import { Pressable, Text, StyleSheet } from 'react-native';

import { Box } from './Box';

type SelectButtonProps = {
  title: string;
  onPress: () => void;
  selected: boolean;
};

export const SelectButton = ({ title, onPress, selected }: SelectButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container} accessibilityRole="button">
      <Box
        marginHorizontal={10}
        justifyContent="center"
        borderWidth={2}
        alignItems="center"
        height={50}
        backgroundColor={selected ? '#404040' : 'transparent'}
        borderColor={selected ? '#404040' : '#cecece'}
        borderRadius={12}
        padding={10}
      >
        <Text style={[styles.text, selected && styles.textSelected]}>{title}</Text>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    borderWidth: 1,
  },
  selected: {
    borderColor: 'red',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cecece',
  },
  textSelected: {
    color: 'white',
  },
});
