import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';

export default function Lifestyle() {
  const navigation = useNavigation();
  const handlePress = () => {
    return navigation.navigate('Home');
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Select the diets you follow.*</Text>
      <Button title="Get my personalized vitamin" onPress={handlePress} />
    </View>
  );
}
