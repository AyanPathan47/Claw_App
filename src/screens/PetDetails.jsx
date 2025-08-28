import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationIcon from 'react-native-vector-icons/Entypo';
import ChevronLeft from 'react-native-vector-icons/FontAwesome';
import Rupee from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';

const PetDetails = () => {
  const [petDetail, setPetDetail] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  const { petId } = route.params;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://backend.yourclaw.tech/api/pets/${petId}`);
      const apiData = await response.json();
      setPetDetail(apiData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again later.");
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleAdoptionRequest = (pet_id) => {
    Alert.alert('Adoption Request', 'Are you sure you want to adopt this pet?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          setLoading(true);
          const adoptionRequest = await fetch(
            "https://backend.yourclaw.tech/api/adoption-requests",
            {
              method: "POST",
              credentials: "include",
              headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem('authToken')}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                petId: pet_id,
                status: "pending",
              }),
            },
          );
          const data = await adoptionRequest.json();
          console.log("adoption request", data);
          if (adoptionRequest.ok) {
            setLoading(false);
            Alert.alert(
              "Adoption Request Sent",
              "Your adoption request has been sent successfully. We will get back to you soon."
            );
          } else {
            setLoading(false);
            Alert.alert(
              "Error",
              "Failed to send adoption request. Please try again."
            );
          }
        },
      }
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* {loading && <Loader />} */}
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
        style={styles.backButton}>
        <ChevronLeft name="chevron-left" size={20} color="black" />
      </TouchableOpacity>

      {/* Pet Image */}
      <Image
        source={{ uri: petDetail.pet_image }}
        style={styles.petImage}
      />

      {/* Pet Details */}
      <ScrollView
        style={styles.detailsContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}>
        {/* Pet Name and Info */}
        <Text style={[styles.petName, { color: 'black' }]}>{petDetail.pet_name}</Text>
        <Text style={styles.petInfo}>{petDetail.pet_age} years old {petDetail.pet_breed}</Text>
        <Text style={styles.petLocation}>
          <LocationIcon name="location-pin" size={25} color="#7D5DA1" />
          {petDetail.pet_address}
        </Text>

        {/* Additional Info */}
        <View style={{ flexDirection: 'row', gap: 40, marginBottom: 16, marginTop: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '35%' }}>
            <Text style={{ color: 'grey', fontSize: 18, fontWeight: '600' }}>Category : </Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>{petDetail.pet_category}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'grey', fontSize: 18, fontWeight: '600' }}>Breed : </Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>{petDetail.pet_breed}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 40, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '35%' }}>
            <Text style={{ color: 'grey', fontSize: 18, fontWeight: '600' }}>Color : </Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>{petDetail.pet_color}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'grey', fontSize: 18, fontWeight: '600' }}>Gender : </Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>{petDetail.pet_gender}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 40, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '35%' }}>
            <Text style={{ color: 'grey', fontSize: 18, fontWeight: '600' }}>Age : </Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>{petDetail.pet_age} years</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'grey', fontSize: 18, fontWeight: '600' }}>Weight : </Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>{petDetail.pet_weight} kg</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 40, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '35%' }}>
            <Text style={{ color: 'grey', fontSize: 18, fontWeight: '600' }}>Neutered : </Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>{petDetail.pet_neutering}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'grey', fontSize: 18, fontWeight: '600' }}>Price : </Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>
              <Rupee name="rupee" size={16} /> {petDetail.pet_price}
            </Text>
          </View>
        </View>


        {/* Bio */}
        <View style={{ marginTop: 10, borderTopWidth: 0.2, borderTopColor: 'grey', paddingTop: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: 500, color: 'black'}}>Bio</Text>
          <Text style={{ fontSize: 18, color: 'grey', marginTop: 10 }}>
            {petDetail.pet_bio}
          </Text>
        </View>

        {/* Contact Button */}
        <TouchableOpacity
          onPress={() => handleAdoptionRequest(petDetail.id)}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#7D5DA1',
            marginTop: 30,
            marginBottom: 30,
            padding: 15,
            borderRadius: 15,
          }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
            Adopt {petDetail.pet_name}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PetDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    position: 'absolute',
    top: 40,
    left: 15,
    backgroundColor: '#fff',
    height: 40,
    width: 40,
    borderRadius: 100,
    zIndex: 1,
    paddingRight: 3,
  },
  petImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    flex: 1,
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    marginTop: -25,
  },
  petName: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 4,
  },
  petInfo: {
    fontSize: 20,
    color: 'grey',
    marginBottom: 8,
  },
  petLocation: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  bioText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#7D5DA1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
})