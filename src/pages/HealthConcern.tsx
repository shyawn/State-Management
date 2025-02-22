import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import {chooseOption} from '../store/healthConcern/healthSlice';
import {AppDispatch, RootState} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';

export default function HealthConcern() {
  const navigation = useNavigation();
  const healthConcerns = useSelector(
    (state: RootState) => state.healthConcern.allConcerns,
  );
  const selectedConcerns = useSelector(
    (state: RootState) => state.healthConcern.selectedConcerns,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleBack = () => {
    return navigation.goBack();
  };
  const handlePress = () => {
    return navigation.navigate('Diet');
  }; // todo: refactor for multiple cases

  return (
    <View style={styles.healthContainer}>
      <View>
        <Text>Select the top health concerns.* (up to 5)</Text>
        <View style={styles.buttonContainer}>
          {healthConcerns.map(concern => (
            <TouchableOpacity
              key={concern.id}
              style={[
                styles.button,
                selectedConcerns.some(c => c.id === concern.id) &&
                  styles.selectedButton,
              ]}
              onPress={() => dispatch(chooseOption(concern))}>
              <Text>{concern.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View>
        <Text>Prioritize</Text>
        {selectedConcerns.map(c => (
          <Text key={c.id}>{c.name}</Text>
        ))}
      </View>

      <View style={styles.navigationContainer}>
        <Button title="Go Back" onPress={handleBack} />
        <Button title="Next" onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  healthContainer: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#FF6B6B',
  },
  navigationContainer: {
    flex: 1,
    gap: 5,
    marginTop: 20,
  },
});
