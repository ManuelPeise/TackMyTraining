import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const flexContainerCenter: StyleProp<ViewStyle> = {
  display: 'flex',
  justifyContent: 'center',
};

export const textCentered: StyleProp<TextStyle> = {
  textAlign: 'center',
};

type ContainerStyles = {
  formStyle: StyleProp<ViewStyle>;
  pageContainerStyle: StyleProp<ViewStyle>;
  flexContainerStyle: StyleProp<ViewStyle>;
  gridRow: StyleProp<ViewStyle>;
};

type InputStyles = {
  formItemContainer: StyleProp<ViewStyle>;
  formInputField: StyleProp<TextStyle>;
  placeholderStyle: StyleProp<TextStyle>;
  saveCancelButton: StyleProp<ViewStyle>;
  saveCancelButtonLabel: StyleProp<TextStyle>;
};

type LabelStyles = {
  formHeaderContainer: StyleProp<ViewStyle>;
  formHeader: StyleProp<TextStyle>;
};

type Colors = {
  red: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  yellow: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  gray: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  primary: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  greenAccent: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  redAccent: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  blueAccent: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  chartColors: {
    red: string;
    blue: string;
    green: string;
    purple: string;
    yellow: string;
    orange: string;
    light: string;
  };
};

export type ContextStyles = {
  containerStyles: ContainerStyles;
  inputStyles: InputStyles;
  labelStyles: LabelStyles;
  colors: Colors;
};
