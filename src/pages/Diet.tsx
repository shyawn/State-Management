import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';

export default function Diet() {
  const navigation = useNavigation();
  const handleBack = () => {
    return navigation.goBack();
  };
  const handlePress = () => {
    return navigation.navigate('Allergies');
  }; // todo: refactor for multiple cases
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Select the diets you follow.*</Text>
      <Button title="Go Back" onPress={handleBack} />
      <Button title="Next" onPress={handlePress} />
    </View>
  );
}
