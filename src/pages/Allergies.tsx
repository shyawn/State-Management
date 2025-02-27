import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {chooseAllergies} from '../store/allergies/allergiesSlice';
import allergies from '../utils/allergies.json';
import {useNavigation} from '@react-navigation/native';

export default function MultiSelectDropdown() {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: any) => state.allergies);

  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(allergies.data);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredList(allergies.data);
    } else {
      const filtered = allergies.data.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredList(filtered);
    }
  }, [searchText]);

  const handleSelect = (selectedItem: any) => {
    dispatch(chooseAllergies(selectedItem));
    setSearchText('');
    setShowDropdown(false);
  };

  const navigation = useNavigation();

  const handleBack = () => {
    return navigation.goBack();
  };
  const handlePress = () => {
    return navigation.navigate('Lifestyle');
  }; // todo: refactor for multiple cases

  return (
    <View style={styles.allergiesContainer}>
      <Text style={styles.allergiesHeader}>
        Write any specific allergies or sensitivity towards specific things.
        (optional)
      </Text>
      <View style={styles.inputContainer}>
        <FlatList
          horizontal
          data={selectedItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.name}</Text>
              <TouchableOpacity onPress={() => dispatch(chooseAllergies(item))}>
                <Text style={styles.removeTag}> ✕ </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TextInput
          style={styles.input}
          placeholder={selectedItems.length ? '' : 'Search...'}
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            setShowDropdown(true);
          }}
        />
      </View>

      {showDropdown && (
        <FlatList
          data={filteredList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleSelect(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={styles.navigationContainer}>
        <Button title="Go Back" onPress={handleBack} />
        <Button title="Next" onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  allergiesContainer: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#d2f1e5',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    minHeight: 50,
  },
  allergiesHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#33455d',
  },
  input: {
    flex: 1,
    padding: 5,
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#33455d',
    padding: 6,
    borderRadius: 20,
    marginRight: 5,
    alignItems: 'center',
  },
  tagText: {
    marginRight: 5,
    color: 'white',
  },
  removeTag: {
    color: 'red',
    fontWeight: 'bold',
  },
  listItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fefefd',
  },
});
