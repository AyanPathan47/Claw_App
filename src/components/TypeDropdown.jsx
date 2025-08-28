import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

const TypeDropdown = ({ selectedValue, onValueChange }) => {

  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Type" value="" style={{color:'grey' , fontSize:18}} enabled={false}/>
        <Picker.Item label="Dogs" value="Dog" style={{fontSize:18}}/>
        <Picker.Item label="Cats" value="Cat" style={{fontSize:18}}/>
        <Picker.Item label="Others" value="Others" style={{fontSize:18}}/>
        <Picker.Item label="All Pets" value="All" style={{fontSize:18}}/>

      </Picker>
    </View>
  );
};

export default TypeDropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '46%',
    marginTop: 15,
    backgroundColor: '#F6F2FF',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 55,
    width: '100%',
    color: 'black',
  },
});
