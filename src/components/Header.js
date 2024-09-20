import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {verticalScale} from '../utils/responsiveSize';

const Header = ({leftIcon, title, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {leftIcon && <Image source={leftIcon} style={styles.iconStyle} />}
      </TouchableOpacity>

      <Text style={styles.titleStyle}>{title}</Text>
      <View style={styles.iconView}>
        <Image
          source={require('../assets/images/search.png')}
          style={styles.iconStyle}
        />
        <Image
          source={require('../assets/images/bag.png')}
          style={styles.iconStyle}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    marginHorizontal: 10,
    height: verticalScale(20),
    width: verticalScale(20),
  },
  iconView: {
    flexDirection: 'row',
  },
});
