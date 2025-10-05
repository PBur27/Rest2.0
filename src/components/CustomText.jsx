import React from 'react';
import { Text } from 'react-native';
import { styles } from '../styles/styles';

export const CustomText = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.text]} {...props}>
      {children}
    </Text>
  );
};
