import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';

export default function Home() {
  const navigation = useNavigation();
  const handlePress = () => {
    return navigation.navigate('HealthConcern');
  };
  return (
    <View style={styles.homeContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.homeHeader}>Welcome to DailyVita</Text>
        <Text style={styles.homeDescription}>
          Hello, we are here to make your life healthier and happier
        </Text>
      </View>
      <Button title="Get Started" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    padding: 20,
    paddingVertical: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
  },
  homeHeader: {
    fontSize: 24,
    fontWeight: 600,
  },
  homeDescription: {
    fontSize: 13,
  },
});
