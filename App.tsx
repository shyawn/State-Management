import React from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import HealthConcern from './src/pages/HealthConcern';
import Diet from './src/pages/Diet';
import Allergies from './src/pages/Allergies';
import Lifestyle from './src/pages/Lifestyle';
import {store} from './src/store/store';
import {Provider} from 'react-redux';

function App(): React.JSX.Element {
  // type RootStackParamList = {
  //   Home: undefined;
  //   HealthConcern: undefined;
  //   Diet: undefined;
  //   Allergies: undefined;
  //   OtherOptions: undefined;
  // };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="HealthConcern" component={HealthConcern} />
          <Stack.Screen name="Diet" component={Diet} />
          <Stack.Screen name="Allergies" component={Allergies} />
          <Stack.Screen name="Lifestyle" component={Lifestyle} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
