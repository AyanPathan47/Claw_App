import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

const UserRoleDropdown = ({ selectedValue, onValueChange }) => {

  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Choose Who are you" value="" style={{color:'grey' , fontSize:20}} enabled={false}/>
        <Picker.Item label="Donor" value="Giver" style={{fontSize:22}}/>
        <Picker.Item label="Adopter" value="Adopter" style={{fontSize:22}}/>
      </Picker>
    </View>
  );
};

export default UserRoleDropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#F6F2FF',
    borderRadius: 10,
    padding: 5,
  },
  picker: {
    height: 55,
    width: '100%',
    color: 'black',
  },
});
