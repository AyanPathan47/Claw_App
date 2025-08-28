import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Paw from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Profile = ({setIsLoggedIn}) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{
            backgroundColor: 'white',
            flex: 1, paddingHorizontal: '5%', padding: '10%'
        }}>
            <View style={{ gap: 10, alignItems: 'center', borderRadius: 100, alignSelf: 'center', marginTop: 50 }}>
                <Paw name="paw" size={70} color="#BAABE4" />
                <Text style={{ fontSize: 40, fontWeight: '500', color: 'black' }}>Claw</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 50, textAlign: 'center' , color:'grey'}}>Profile</Text>
            <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 10, color: 'grey', textAlign: 'center' }}>~~~ Coming Soon ~~~</Text>
            <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 10, color: 'grey', textAlign: 'center' }}>Keep Patience and Stay Tuned !! </Text>
            <TouchableOpacity
                onPress={() => {
                    console.log('Logout Pressed')
                    AsyncStorage.removeItem('authToken')
                    AsyncStorage.clear()
                    setIsLoggedIn(false)
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 10, color: '#BAABE4', textAlign: 'center' }}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Pets')
                    console.log('Pets Pressed')
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 10, color: '#BAABE4', textAlign: 'center' }}>PetDetails</Text>
            </TouchableOpacity>
        </SafeAreaView >
    )
}

export default Profile

const styles = StyleSheet.create({})