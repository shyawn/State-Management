import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {
  setConcernOrder,
  HealthConcern,
} from '../store/healthConcern/healthSlice';
import {AppDispatch} from '../store/store';

export default function DraggableList() {
  const dispatch = useDispatch<AppDispatch>();

  const selectedConcerns = useSelector(
    (state: RootState) => state.healthConcern.selectedConcerns,
  );

  function keyExtractor(item: HealthConcern) {
    return item.id;
  }

  function renderItem(info: DragListRenderItemInfo<HealthConcern>) {
    const {item, onDragStart, onDragEnd} = info;
    console.log('ITEM: ', item);
    console.log('DATA: ', selectedConcerns);

    return (
      <TouchableOpacity
        key={item.id}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}
        style={styles.dragContainer}>
        <Text style={styles.dragText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  function onReordered(fromIndex: number, toIndex: number) {
    const reorderedList = [...selectedConcerns]; // Make a copy of store data instead of modifying
    const [movedItem] = reorderedList.splice(fromIndex, 1);
    reorderedList.splice(toIndex, 0, movedItem); // Insert movedItem at new position to reorder

    dispatch(setConcernOrder(reorderedList));
  }

  return (
    <View>
      <DragList
        data={selectedConcerns}
        keyExtractor={item => keyExtractor(item)}
        onReordered={onReordered}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dragContainer: {
    padding: 10,
    marginVertical: 2,
    backgroundColor: '#fefefd',
    borderRadius: 5,
    flex: 1,
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: '#91a0a6',
  },
  dragText: {
    backgroundColor: '#33455d',
    alignSelf: 'flex-start',
    padding: 10,
    paddingVertical: 6,
    borderRadius: 20,
    color: '#fefefd',
  },
});
