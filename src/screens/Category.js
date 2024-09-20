import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoryData} from '../redux/slices/categorySlice';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/responsiveSize';
import {useNavigation} from '@react-navigation/native';

const Category = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {categoryData} = useSelector(state => state.category);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categoryColors = {
    1: '#efcf8d',
    2: '#9cb6c6',
    3: '#c6b29c',
    4: '#a1bd6f',
  };

  const categoryImages = {
    1: require('../assets/images/1.png'),
    2: require('../assets/images/2.jpg'),
    3: require('../assets/images/3.png'),
    4: require('../assets/images/1.png'),
  };

  useEffect(() => {
    dispatch(getCategoryData());
  }, [dispatch]);

  const handleCategoryPress = category => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const renderData = () => {
    return categoryData.categories?.flatMap(category => {
      return [
        {type: 'category', data: category},
        ...(expandedCategory === category ? category.child : []).map(child => ({
          type: 'childCategory',
          data: child,
        })),
      ];
    });
  };

  const renderItem = ({item}) => {
    let backgroundColor;
    if (item.type === 'category') {
      backgroundColor = categoryColors[item.data.category_id] || '#f0f0f0';
      const imageSource = categoryImages[item.data.category_id] || null;
      return (
        <TouchableOpacity
          style={[styles.categoryItem, {backgroundColor}]}
          onPress={() => handleCategoryPress(item.data)}>
          <View style={styles.textView}>
            <Text style={styles.categoryText}>{item.data.category_name}</Text>
          </View>

          {imageSource && (
            <Image source={imageSource} style={styles.categoryImage} />
          )}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.childCategoryItem}>
        <Text style={styles.childCategoryText}>{item.data.category_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon={require('../assets/images/back.png')}
        title={'Category'}
        onPress={() => navigation.goBack()}
      />
      <FlatList
        data={renderData()}
        keyExtractor={(item, index) =>
          item.type === 'category'
            ? item.data.category_id
            : `${item.data.category_id}-child-${index}`
        }
        renderItem={renderItem}
        style={{marginVertical: verticalScale(20)}}
      />
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryItem: {
    marginBottom: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-between',
  },
  categoryText: {
    textAlign: 'center',
    fontSize: moderateScale(16),
  },
  childCategoryItem: {
    borderRadius: 5,
    padding: verticalScale(15),
    backgroundColor: '#e0e0e0',
    marginBottom: verticalScale(10),
  },
  childCategoryText: {
    fontSize: moderateScale(14),
  },
  categoryImage: {
    width: verticalScale(100),
    height: verticalScale(100),
    marginRight: horizontalScale(10),
  },
  textView: {
    shadowRadius: 4,
    shadowOpacity: 0.3,
    borderTopRightRadius: 20,
    borderBottomEndRadius: 20,
    width: horizontalScale(200),
    shadowOffset: {width: 0, height: 2},
  },
});
