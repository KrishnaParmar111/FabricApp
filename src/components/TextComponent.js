import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/responsiveSize';

const TextComponent = ({text}) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default TextComponent;

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
    color: 'dark-gray',
    fontSize: moderateScale(16),
    marginVertical: verticalScale(15),
    marginHorizontal: horizontalScale(15),
  },
});
