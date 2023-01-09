import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from '../screen/MainScreen.js';
import EnlistSetScreen from '../screen/EnlistSetScreen';

const Stack = createNativeStackNavigator();
const RootStack = ({screen}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screen}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="EnlistSetScreen" component={EnlistSetScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
