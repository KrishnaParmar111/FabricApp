import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {SCREENWIDTH} from '../utils/responsiveSize';

const CarouselComponent = ({carouselData, carouselRenderItem, itemWidth}) => {
  return (
    <Carousel
      loop
      layout="default"
      data={carouselData}
      useScrollView={true}
      itemWidth={itemWidth}
      sliderWidth={SCREENWIDTH}
      renderItem={carouselRenderItem}
    />
  );
};

export default CarouselComponent;
