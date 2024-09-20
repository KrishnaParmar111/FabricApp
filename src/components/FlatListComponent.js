import React from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {horizontalScale} from '../utils/responsiveSize';

const FlatListComponent = ({data, renderItem}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}>
      <FlatList
        bounces={false}
        scrollEnabled={false}
        data={data}
        renderItem={renderItem}
        numColumns={Math.ceil(data?.length / 2)}
        key={Math.ceil(data?.length / 2)}
        style={{paddingHorizontal: horizontalScale(15)}}
      />
    </ScrollView>
  );
};

export default FlatListComponent;

const styles = StyleSheet.create({});
