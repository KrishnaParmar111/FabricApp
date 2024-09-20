import {Image, StyleSheet} from 'react-native';
import HomePage from '../screens/HomePage';
import Category from '../screens/Category';
import Curate from '../screens/Curate';
import Sale from '../screens/Sale';
import More from '../screens/More';
import {verticalScale} from '../utils/responsiveSize';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#c6c795',
        tabBarInactiveTintColor: 'gray',
      }}
      initialRouteName="HomePage">
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/images/1.png')}
              style={[styles.iocnStyle, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/images/cat.png')}
              style={[styles.iocnStyle, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Curate"
        component={Curate}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/images/3.png')}
              style={[styles.iocnStyle, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sale"
        component={Sale}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/images/sale.png')}
              style={[styles.iocnStyle, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/images/more.png')}
              style={[styles.iocnStyle, {tintColor: color}]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigation;

const styles = StyleSheet.create({
  iocnStyle: {
    height: verticalScale(20),
    width: verticalScale(20),
  },
});
