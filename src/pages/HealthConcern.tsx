import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import {
  chooseOption,
  setConcernOrder,
} from '../store/healthConcern/healthSlice';
import {AppDispatch, RootState} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';
import DraggableList from '../components/DraggableList';

export default function HealthConcern() {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const healthConcerns = useSelector(
    (state: RootState) => state.healthConcern.allConcerns,
  );
  const selectedConcerns = useSelector(
    (state: RootState) => state.healthConcern.selectedConcerns,
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBack = () => navigation.goBack();
  const handlePress = () => {
    if (selectedConcerns.length === 0) {
      setErrorMessage('Please select at least one health concern.');
      return;
    }
    setErrorMessage(null);
    navigation.navigate('Diet');
  };

  return (
    <View style={styles.healthContainer}>
      <Text style={styles.healthHeader}>
        Select the top health concerns.<Text style={styles.asterisk}>*</Text>{' '}
        {'\n'}
        (up to 5)
      </Text>

      <View style={styles.buttonContainer}>
        {healthConcerns.map(concern => (
          <TouchableOpacity
            key={concern.id}
            style={[
              styles.button,
              selectedConcerns.some(item => item.id === concern.id) &&
                styles.selectedButton,
            ]}
            onPress={() => {
              dispatch(chooseOption(concern));
              setErrorMessage(null);
            }}>
            <Text
              style={[
                styles.buttonText,
                selectedConcerns.some(item => item.id === concern.id) &&
                  styles.selectedButtonText,
              ]}>
              {concern.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedConcerns.length > 0 && (
        <View>
          <Text style={styles.healthHeader}>Prioritize</Text>
          <DraggableList
            data={selectedConcerns}
            onReordered={updatedData => dispatch(setConcernOrder(updatedData))}
          />
        </View>
      )}

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

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
    backgroundColor: '#d2f1e5',
  },
  healthHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#33455d',
  },
  asterisk: {
    color: '#FF6B6B',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    paddingVertical: 6,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#91a0a6',
    color: '#33455d',
  },
  buttonText: {
    color: '#33455d',
  },
  selectedButton: {
    backgroundColor: '#33455d',
  },
  selectedButtonText: {
    color: '#d2f1e5',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
