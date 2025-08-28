import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';

import Paw from 'react-native-vector-icons/Fontisto';
import Calendar from 'react-native-vector-icons/AntDesign';
import Price from 'react-native-vector-icons/Entypo';


const SavedPets = () => {
  const [savedPetIds, setSavedPetIds] = useState(['68013a00578db7654edc476d','680082066698f9d54fae1299','67e647b0457f8d583a081bea']);
  const [allPets, setAllPets] = useState([]);
  const [savedPets, setSavedPets] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://backend.yourclaw.tech/api/pets?limit=100'); // Replace with actual API URL
        const data = await response.json();

        // Ensure data is an array before setting it to allPets
        if (Array.isArray(data.docs)) {
          setAllPets(data.docs);
          setLoading(false);
        } else {
          setLoading(false);
          console.error('Unexpected API response format:', data);
          setAllPets([]);
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
        setAllPets([]);
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  useEffect(() => {
    if (Array.isArray(allPets)) {
      setLoading(true);
      const filteredPets = allPets.filter(pet => savedPetIds.includes(pet.id));
      setSavedPets(filteredPets);
      setLoading(false);
    } else {
      setSavedPets([]);
      setLoading(false);
    }
  }, [savedPetIds, allPets]);

  return (
    <SafeAreaView style={{
      flex: 1, paddingHorizontal: '5%', padding: '10%' , backgroundColor: 'white',
    }}>
      {loading && <Loader />}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ backgroundColor: '#F6F2FF', padding: 15, borderRadius: 100 }}>
          <Paw name="paw" size={30} color="#BAABE4" />
        </View>
        <Text style={{ fontSize: 35, fontWeight: '600', color: 'black' }}>Claw</Text>
      </View>

      <Text style={{ marginVertical: 30, fontSize: 35, fontWeight: '500', color: 'black' }}> Saved Pets</Text>

      {savedPets.length === 0 ? (
        <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 10, color: 'grey', textAlign: 'center' }}>
          You have no saved pets yet.
        </Text>
      ) : (
        <FlatList
          data={savedPets}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 , marginHorizontal: 'auto', paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('PetDetails', { petId: item.id })}
              activeOpacity={0.8}
              style={{
                shadowOffset: { width: 0, height: 1 },
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
                backgroundColor: 'white',
                borderRadius: 10,
                marginRight: 20,
                marginBottom: 20,
                width: 370, height: 330
              }}>
              <Image source={{ uri: item.pet_image }} style={{ width: 370, height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10, resizeMode: 'cover' }} />
              <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}>
                  <Text style={{ fontSize: 25, fontWeight: '600', color: 'black' }}>{item.pet_name}</Text>
                </View>

                <Text style={{ fontSize: 19, fontWeight: '500', color: 'grey' }}>{item.pet_breed}</Text>

                <View
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5 }} >
                  <View style={{ flexDirection: 'row', alignItems: 'center', fontSize: 18, marginTop: 10 }}><Calendar
                    style={{ marginRight: 5 }}
                    name="calendar" size={25} color="#7D5DA1" />
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>
                      {item.pet_age} Years
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', fontSize: 18, marginTop: 10 }}><Price
                    style={{ marginRight: 5 }}
                    name="price-tag" size={25} color="#7D5DA1" />
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>
                      {item.pet_price} ₹
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SavedPets

const styles = StyleSheet.create({})