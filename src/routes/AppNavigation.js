import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigation from './BottomTabNavigation';
import {createStackNavigator} from '@react-navigation/stack';
const AppNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
