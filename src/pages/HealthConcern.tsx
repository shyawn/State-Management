import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import {increment} from '../store/healthConcern/healthSlice';
import {AppDispatch, RootState} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';

export default function HealthConcern() {
  const navigation = useNavigation();
  const count = useSelector((state: RootState) => state.healthConcern);
  const dispatch = useDispatch<AppDispatch>();

  const handleBack = () => {
    return navigation.goBack();
  };
  const handlePress = () => {
    // return navigation.navigate('Diet');
    return dispatch(increment());
  }; // todo: refactor for multiple cases
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Select the top health concerns.* (up to 5)</Text>
      <Button title="Go Back" onPress={handleBack} />
      <Button title="Next" onPress={handlePress} />
      <Text>{count}</Text>
    </View>
  );
}
