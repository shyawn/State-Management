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

  const [selectedSun, setSelectedSun] = useState(
    lifestyle.is_daily_exposure ? 'yes_sun' : 'no_sun',
  );
  const [selectedSmoke, setSelectedSmoke] = useState(
    lifestyle.is_smoke ? 'yes_smoke' : 'no_smoke',
  );
  const [selectedAlcohol, setSelectedAlcohol] = useState(lifestyle.alcohol);

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
    // console.log('Store: ', lifestyle);
  };

  const handleSmokeChange = (id: string) => {
    setSelectedSmoke(id);
    dispatch(setSmokingStatus(id === 'yes_smoke'));
    // console.log('Store: ', lifestyle);
  };

  const handleAlcoholChange = (id: string) => {
    setSelectedAlcohol(id);
    dispatch(setAlcoholConsumption(id));
    // console.log('Store: ', lifestyle);
  };

  const handlePress = () => {
    const fullStore = {
      is_daily_exposure: lifestyle.is_daily_exposure,
      is_smoke: lifestyle.is_smoke,
      alcohol: lifestyle.alcohol,
    };
    console.log('Fullstore: ', fullStore);
  };
  return (
    <View style={styles.lifestyleContainer}>
      <Text>Is your daily exposure to sun limited?*</Text>
      <RadioGroup
        radioButtons={radioButtons1}
        onPress={handleSunChange}
        selectedId={selectedSun}
      />
      <Text>Do you currently smoke (tobacco or marijuana)?*</Text>
      <RadioGroup
        radioButtons={radioButtons2}
        onPress={handleSmokeChange}
        selectedId={selectedSmoke}
      />
      <Text>
        On average, how many alcoholic beverages do you have in a week?*
      </Text>
      <RadioGroup
        radioButtons={radioButtons3}
        onPress={handleAlcoholChange}
        selectedId={selectedAlcohol}
      />
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
});
