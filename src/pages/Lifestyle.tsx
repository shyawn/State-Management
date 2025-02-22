import {View, Text, StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {
  setDailyExposure,
  setSmokingStatus,
  setAlcoholConsumption,
} from '../store/lifestyle/lifestyleSlice';

export default function Lifestyle() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const lifestyle = useSelector((state: RootState) => state.lifestyle);
  const healthConcerns = useSelector(
    (state: RootState) => state.healthConcern.selectedConcerns,
  );
  const diets = useSelector((state: RootState) => state.diet);

  const allergies = useSelector((state: RootState) => state.allergies);

  const [selectedSun, setSelectedSun] = useState<string | undefined>(undefined);
  const [selectedSmoke, setSelectedSmoke] = useState<string | undefined>(
    undefined,
  );
  const [selectedAlcohol, setSelectedAlcohol] = useState<string | undefined>(
    undefined,
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const radioButtons1: RadioButtonProps[] = [
    {id: 'yes_sun', label: 'Yes', value: 'yes'},
    {id: 'no_sun', label: 'No', value: 'no'},
  ];

  const radioButtons2: RadioButtonProps[] = [
    {id: 'yes_smoke', label: 'Yes', value: 'yes'},
    {id: 'no_smoke', label: 'No', value: 'no'},
  ];

  const radioButtons3: RadioButtonProps[] = [
    {id: '0-1', label: '0-1', value: '0-1'},
    {id: '2-5', label: '2-5', value: '2-5'},
    {id: '5+', label: '5+', value: '5+'},
  ];

  const handleSunChange = (id: string) => {
    setSelectedSun(id);
    dispatch(setDailyExposure(id === 'yes_sun'));
  };

  const handleSmokeChange = (id: string) => {
    setSelectedSmoke(id);
    dispatch(setSmokingStatus(id === 'yes_smoke'));
  };

  const handleAlcoholChange = (id: string) => {
    setSelectedAlcohol(id);
    dispatch(setAlcoholConsumption(id));
  };

  const handlePress = () => {
    if (!selectedSun || !selectedSmoke || !selectedAlcohol) {
      setErrorMessage('Please answer all questions before continuing.');
      return;
    }

    const fullStore = {
      health_concerns: healthConcerns,
      diets: diets,
      is_daily_exposure: lifestyle.is_daily_exposure,
      is_smoke: lifestyle.is_smoke,
      alcohol: lifestyle.alcohol,
      allergies: allergies,
    };
    console.log('Fullstore: ', fullStore);
    return navigation.navigate('Home');
  };
  return (
    <View style={styles.lifestyleContainer}>
      <Text style={styles.lifestyleHeader}>
        Is your daily exposure to sun limited?
        <Text style={styles.asterisk}>*</Text>
      </Text>
      <View style={styles.optionContainer}>
        <RadioGroup
          radioButtons={radioButtons1}
          onPress={handleSunChange}
          selectedId={selectedSun}
        />
      </View>
      <Text style={styles.lifestyleHeader}>
        Do you currently smoke (tobacco or marijuana)?
        <Text style={styles.asterisk}>*</Text>
      </Text>
      <View style={styles.optionContainer}>
        <RadioGroup
          radioButtons={radioButtons2}
          onPress={handleSmokeChange}
          selectedId={selectedSmoke}
        />
      </View>
      <Text style={styles.lifestyleHeader}>
        On average, how many alcoholic beverages do you have in a week?
        <Text style={styles.asterisk}>*</Text>
      </Text>
      <View style={styles.optionContainer}>
        <RadioGroup
          radioButtons={radioButtons3}
          onPress={handleAlcoholChange}
          selectedId={selectedAlcohol}
        />
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <Button title="Get my personalized vitamin" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  lifestyleContainer: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  asterisk: {
    color: '#FF6B6B',
  },
  lifestyleHeader: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});
