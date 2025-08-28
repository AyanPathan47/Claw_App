import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

const NeuteredDropdown = ({ selectedValue, onValueChange }) => {

    return (
        <View style={styles.dropdownContainer}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => onValueChange(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Yes or No" value="" style={{ color: 'grey', fontSize: 18 }} enabled={false} />
                <Picker.Item label="Yes" value="Yes" style={{ fontSize: 18 }} />
                <Picker.Item label="No" value="No" style={{ fontSize: 18 }} />
            </Picker>
        </View>
    );
};

export default NeuteredDropdown;

const styles = StyleSheet.create({
    dropdownContainer: {
        width: '100%',
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
