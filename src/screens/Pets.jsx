import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';

import Paw from 'react-native-vector-icons/Fontisto';
import Calendar from 'react-native-vector-icons/AntDesign';
import Price from 'react-native-vector-icons/Entypo';
import ChevronRight from 'react-native-vector-icons/Feather';
import TypeDropdown from '../components/TypeDropdown';
import LocationDropdown from '../components/LocationDropdown';

const Pets = () => {
  const [selectedPetType, setSelectedPetType] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [petData, setpetData] = useState([])
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://backend.yourclaw.tech/api/pets?limit=100');
      const apiData = await response.json();

      const filteredPet = selectedPetType
        && selectedPetType !== 'All' ? apiData.docs.filter((item) => item.pet_category === selectedPetType)
        : apiData.docs;
      setpetData(filteredPet);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [selectedPetType]);

  const HeaderComponent = () => (
    <View style={{ flex: 1, paddingHorizontal: '5%', padding: '10%' }}>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ backgroundColor: '#F6F2FF', padding: 15, borderRadius: 100 }}>
          <Paw name="paw" size={30} color="#BAABE4" />
        </View>
        <Text style={{ fontSize: 35, fontWeight: '600', color: 'black' }}>Claw</Text>
      </View>

      <Text style={{ marginTop: 30, fontSize: 35, fontWeight: '500', color : 'black' }}>Pets</Text>

      <View style={{ flexDirection: 'row', gap: 20 }}>
        <LocationDropdown />
        <TypeDropdown
          onValueChange={(value) => setSelectedPetType(value)}
          selectedValue={selectedPetType}
        />
      </View>
    </View>
  )

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'white',
    }}>
      {loading && <Loader />}
      <FlatList
        ListHeaderComponent={HeaderComponent}
        showsVerticalScrollIndicator={false}
        data={petData}
        contentContainerStyle={{ gap: 5, paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: 'grey' }}>
            Pets Not Found For Selected Type 😿
          </Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchData();
              setRefreshing(false);
            }}
            colors={['#BAABE4']}
            progressBackgroundColor={'#F6F2FF'}
            progressViewOffset={80}
            tintColor={'#BAABE4'}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PetDetails', { petId: item.id})}
            activeOpacity={0.6}
            style={{
              shadowOffset: { width: 0, height: 1 },
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
              backgroundColor: 'white',
              borderRadius: 10,
              marginHorizontal: 20,
              marginBottom: 20,
              paddingLeft: 10,
              width: 'auto',
              height: 130,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>

            <Image source={{ uri: item.pet_image }} style={{ width: 110, height: 110, borderTopLeftRadius: 10, borderRadius: 15, resizeMode: 'cover' }} />

            <View style={{ padding: 12, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <View>
                  <Text style={{ fontSize: 23, fontWeight: '600', color: 'black' }}>{item.pet_name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: '500', color: 'grey' }}>{item.pet_breed}</Text>
                </View>
              </View>


              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 15 }} >

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}><Calendar
                  style={{ marginRight: 5 }}
                  name="calendar" size={25} color="#7D5DA1" />
                  <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>
                    {item.pet_age} Years
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Price
                    style={{ marginRight: 5 }}
                    name="price-tag" size={25} color="#7D5DA1" />
                  <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>
                    {item.pet_price} ₹
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default Pets

const styles = StyleSheet.create({})
