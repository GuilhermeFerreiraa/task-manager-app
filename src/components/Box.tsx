import {
  StyleSheet,
  // eslint-disable-next-line no-restricted-imports
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

type BoxProps = ViewProps & {
  width?: number | string;
  height?: number | string;
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
};

export const Box = ({
  children,
  style,
  width,
  height,
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  backgroundColor,
  borderRadius,
  borderWidth,
  borderColor,
  ...rest
}: BoxProps) => {
  const boxStyle = StyleSheet.create({
    box: {
      width,
      height,
      flex,
      flexDirection,
      justifyContent,
      alignItems,
      padding,
      paddingHorizontal,
      paddingVertical,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      margin,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      backgroundColor,
      borderRadius,
      borderWidth,
      borderColor,
    } as ViewStyle,
  });

  return (
    <View style={[boxStyle.box, style]} {...rest}>
      {children}
    </View>
  );
};
