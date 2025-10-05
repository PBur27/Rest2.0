import React from 'react';
import { Text } from 'react-native';
import { styles } from '../styles/styles';

export default function CustomText({ style, children, fontSize = 14, ...props }) {
  return (
    <Text
      style={[styles.text, { fontSize }, style]} // merge prop style
      {...props}
    >
      {children}
    </Text>
  );
};