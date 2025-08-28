import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import indianCities from '../../public/assets/js/citiesList';

const LocationDropdown = () => {
    const [selectedCity, setSelectedCity] = useState('');

  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={selectedCity}
        onValueChange={(itemValue) => setSelectedCity(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Location" value="" style={{color:'grey' , fontSize:18}} enabled={false}/>
        {indianCities.map((city , index)=>(
            <Picker.Item key={index} label={city.label} value={city.value} style={{fontSize:18}}/>
        ))}
      </Picker>
    </View>
  );
};

export default LocationDropdown;

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
