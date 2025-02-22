import {View, Text, StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import dietJSON from '../utils/Diets.json';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {chooseDiet} from '../store/diet/dietSlice';

export default function Diet() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const selectedDiet = useSelector((state: RootState) => state.diet);

  //   useMemo to only update when new value selected
  const radioButtons = useMemo(() => {
    return dietJSON.data.map(item => ({
      id: item.id.toString(),
      label: item.name,
      value: item.name,
    }));
  }, []);

  const [selectDiet, setSelectDiet] = useState<string | undefined>(
    selectedDiet,
  );

  //   console.log('DIET', selectDiet);

  const handleSelection = (id: string) => {
    setSelectDiet(id);
    const selectedDiet = dietJSON.data.find(diet => diet.id.toString() === id);
    if (selectedDiet) {
      dispatch(chooseDiet(selectedDiet));
    }
  };

  const handleBack = () => {
    return navigation.goBack();
  };

  const handlePress = () => {
    return navigation.navigate('Allergies');
  }; // todo: refactor for multiple cases

  return (
    <View style={styles.dietContainer}>
      <Text>Select the diets you follow.*</Text>

      <RadioGroup
        radioButtons={radioButtons}
        onPress={handleSelection}
        selectedId={selectDiet}
      />

      <View style={styles.navigationContainer}>
        <Button title="Go Back" onPress={handleBack} />
        <Button title="Next" onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dietContainer: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
  navigationContainer: {
    flex: 1,
    gap: 5,
    marginTop: 20,
  },
});
