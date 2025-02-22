import {View, Text, StyleSheet, Image} from 'react-native';
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
        <View>
          <Text style={styles.homeHeader}>Welcome to DailyVita</Text>
          <Text style={styles.homeSubheader}>
            Hello, we are here to make your life healthier and happier
          </Text>
          {/* <Image source={''}/> */}
        </View>
        <Text style={styles.homeDescription}>
          We will ask couple of questions to better understand your vitamin
          need.
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
    justifyContent: 'space-around',
  },
  homeHeader: {
    fontSize: 24,
    fontWeight: 600,
  },
  homeSubheader: {
    fontSize: 13,
    fontWeight: 600,
  },
  homeDescription: {
    fontSize: 13,
  },
});
