import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBottomHomeData,
  getMiddleHomeData,
  getTopHomeData,
} from '../redux/slices/homeSlice';
import {
  SCREENWIDTH,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/responsiveSize';
import {strings} from '../utils/strings';
import TextComponent from '../components/TextComponent';
import {ScrollView} from 'react-native-gesture-handler';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FlatListComponent from '../components/FlatListComponent';
import CarouselComponent from '../components/CarouselComponent';

const HomePage = () => {
  const isCarousel = useRef();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {topData, middleData, bottomData} = useSelector(state => state.home);

  useEffect(() => {
    dispatch(getTopHomeData());
    dispatch(getMiddleHomeData());
    dispatch(getBottomHomeData());
  }, []);

  const handleFlatListItemPress = index => {
    setCurrentIndex(index);
  };

  const topDataRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.topView}
        onPress={() => handleFlatListItemPress(index)}>
        <Image source={{uri: item.image}} style={styles.topViewImage} />
        <Text style={styles.topTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const carouselRenderItem = ({item}) => {
    return (
      <View style={[styles.item, {marginTop: verticalScale(20)}]}>
        <ImageBackground
          source={{uri: item.image}}
          style={styles.itemImage}
          imageStyle={{borderRadius: 8}}
          resizeMode="cover">
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.cta}>{item.cta}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const unstitchedcarouselRenderItem = ({item}) => {
    return (
      <View style={[styles.item, {marginRight: -10}]}>
        <ImageBackground
          source={{uri: item.image}}
          style={styles.unstitchedImage}
          resizeMode="cover">
          <View
            style={[
              styles.itemContentUnstitched,
              {backgroundColor: '#00000099'},
            ]}>
            <Text style={styles.itemTitileUn} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const CarouselCardItem = ({item}) => {
    const dividedString = item.name.split(' for ');
    return (
      <View style={{height: horizontalScale(350)}}>
        <ImageBackground
          source={{uri: item.banner_image}}
          style={styles.carouselCard}>
          <View style={styles.carouselCaredTextView}>
            <Text style={styles.carouselText}>
              {dividedString[0]} for
              <Text style={{fontWeight: '900'}}> {dividedString[1]}</Text>
            </Text>
            <Text style={{color: 'white'}}>{item.cta}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const shopCategoryRenderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: item.tint_color
              ? item.tint_color
              : 'rgba(0, 0, 0, 0.01)',
            flex: 1,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Image source={{uri: item.image}} style={styles.shopCategoryImage} />
        <Text style={styles.shopCategoryText} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.shopCategoryText}>+ Explore</Text>
      </TouchableOpacity>
    );
  };

  const shopFabricRenderItem = ({item}) => {
    return (
      <ImageBackground
        source={{uri: item.image}}
        style={styles.shopFabricImage}
        imageStyle={{borderRadius: verticalScale(130)}}>
        <Text style={styles.shopFabricTitle} numberOfLines={1}>
          {item.name}
        </Text>
      </ImageBackground>
    );
  };

  if (
    !topData ||
    !topData.main_sticky_menu ||
    topData.main_sticky_menu.length === 0
  ) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle1}>
            {'FAB'}
            <Text style={styles.headerTitle2}>CURATE</Text>
          </Text>
          <View style={styles.iconView}>
            <View style={styles.dotView} />
            <Text style={styles.subText}>CREATE YOUR OWN FABRIC</Text>
            <View style={styles.dotView} />
          </View>
        </View>

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginVertical: verticalScale(20)}}>
        <FlatList
          bounces={false}
          horizontal
          data={topData.main_sticky_menu}
          renderItem={topDataRenderItem}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: horizontalScale(15)}}
        />
        <CarouselComponent
          carouselData={topData.main_sticky_menu[currentIndex].slider_images}
          carouselRenderItem={carouselRenderItem}
          itemWidth={300}
        />
        <TextComponent text={strings.shopByCategory} />
        <FlatListComponent
          data={middleData?.shop_by_category}
          renderItem={shopCategoryRenderItem}
        />

        <TextComponent text={strings.shopByFabricMaterial} />
        <FlatListComponent
          data={middleData?.shop_by_fabric}
          renderItem={shopFabricRenderItem}
        />
        <TextComponent text={strings.unstitched} />
        <CarouselComponent
          carouselData={middleData.Unstitched}
          carouselRenderItem={unstitchedcarouselRenderItem}
          itemWidth={200}
        />
        <TextComponent text={strings.boutiqueCollection} />

        <Carousel
          layout="default"
          data={middleData.boutique_collection}
          renderItem={CarouselCardItem}
          sliderWidth={SCREENWIDTH}
          itemWidth={SCREENWIDTH}
          onSnapToItem={index => setIndex(index)}
          useScrollView={true}
        />
        <Pagination
          dotsLength={middleData?.boutique_collection?.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#525152',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />

        <TextComponent text={strings.rangeOfPattern} />
        <FlatListComponent
          data={bottomData?.range_of_pattern}
          renderItem={shopFabricRenderItem}
        />

        <TextComponent text={strings.designAsPerOccasion} />

        <FlatList
          data={bottomData?.design_occasion}
          renderItem={shopCategoryRenderItem}
          keyExtractor={item => item.id}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  topView: {
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  topViewImage: {
    height: verticalScale(70),
    width: horizontalScale(130),
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  topTitle: {
    marginVertical: verticalScale(3),
  },
  unstitchedImage: {width: '100%', height: verticalScale(310)},
  shopFabricImage: {
    height: verticalScale(130),
    width: horizontalScale(130),
    marginRight: horizontalScale(12),
    marginTop: verticalScale(12),
  },
  shopFabricTitle: {
    bottom: 10,
    color: 'white',
    fontWeight: '700',
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: verticalScale(3),
  },
  carouselCard: {
    width: '100%',
    height: horizontalScale(350),
  },
  carouselText: {
    color: 'white',
    fontSize: moderateScale(20),
  },
  shopCategoryView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    width: horizontalScale(130),
    marginRight: horizontalScale(12),
    marginTop: verticalScale(15),
  },
  shopCategoryText: {
    marginVertical: verticalScale(3),
  },
  shopCategoryImage: {
    height: verticalScale(110),
    width: horizontalScale(120),
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    marginBottom: verticalScale(5),
  },
  item: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: verticalScale(200),
    borderRadius: 8,
  },
  itemContent: {
    backgroundColor: 'white',
    marginHorizontal: horizontalScale(35),
    marginTop: verticalScale(120),
    paddingVertical: verticalScale(10),
  },
  itemContentUnstitched: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingVertical: verticalScale(10),
  },
  itemTitileUn: {
    color: '#79aac0',
    fontSize: moderateScale(18),
    fontWeight: '700',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  itemTitle: {
    fontSize: moderateScale(14),
    marginLeft: horizontalScale(10),
  },
  cta: {
    marginLeft: horizontalScale(10),
    marginTop: verticalScale(5),
    fontSize: 12,
    color: 'gray',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item2: {
    height: verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    margin: 5,
  },
  itemText: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  carouselCaredTextView: {
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
  iconStyle: {
    height: verticalScale(20),
    width: verticalScale(20),
    marginHorizontal: 10,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(12),
  },
  headerTitle1: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#c6c795',
  },
  headerTitle2: {
    color: '#959588',
    fontWeight: '400',
  },
  dotView: {
    height: verticalScale(5),
    width: verticalScale(5),
    borderRadius: 5,
    backgroundColor: '#c6c795',
  },
  subText: {
    fontSize: moderateScale(10),
    marginHorizontal: horizontalScale(2),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
