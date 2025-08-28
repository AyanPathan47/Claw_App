import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

import Paw from 'react-native-vector-icons/Fontisto';
import CameraIcon from 'react-native-vector-icons/Feather';
import GalleryIcon from 'react-native-vector-icons/Ionicons';

import CategoryDropdown from '../components/CategoryDropdown';
import GenderDropdown from '../components/GenderDropdown';
import NeuteredDropdown from '../components/NeuteredDropdown';

const AddPet = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    breed: '',
    color: '',
    category: '',
    gender: '',
    neutered: '',
    age: '',
    weight: '',
    price: '',
    address: '',
    about: '',
  });

  const handleInput = (key, value, type = 'text') => {
    let updatedValue = value;

    if (type === 'number') {
      updatedValue = value.replace(/[^0-9]/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [key]: updatedValue
    }));
  };

  const toggleModal = () => setModalVisible(!isModalVisible);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // iOS handles it differently
    }
  };

  const handleCamera = async () => {
    toggleModal();

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log('Camera permission denied');
      return;
    }
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    });

    if (!result.didCancel && result.assets) {
      setLoading(true);
      const uri = result.assets[0].uri;
      console.log("Selected Image URI:", uri);
      setSelectedImage(uri);
      console.log(selectedImage);
      sendImageToServer(uri);
      setLoading(false);
    }
  };

  const handleGallery = async () => {
    toggleModal();
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel && result.assets) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      sendImageToServer(uri);
    }
  };

  const sendImageToServer = async (imageUri) => {
    try {
      setLoading(true);
      if (!imageUri) {
        setLoading(false);
        Alert.alert('Error', 'No image selected.');
        return;
      }

      const formDataToSend = new FormData();

      // Add image file to FormData
      formDataToSend.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `${Date.now()}.jpg`,
      });

      console.log("Selected Image URI server:", imageUri);
      const mediaUploadResponse = await fetch(
        "https://backend.yourclaw.tech/api/media",
        {
          method: 'POST',
          body: formDataToSend,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${await AsyncStorage.getItem('authToken')}`,
          },
        },
      );

      const mediaData = await mediaUploadResponse.json();
      const imageUrl = mediaData.doc.url;
      console.log("Image URL from s3 :", imageUrl);
      setFormData(prev => ({
        ...prev,
        image: `https://backend.yourclaw.tech${imageUrl}`,
      }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  }

  const handleSubmit = async () => {
    setLoading(true);
    const petDetails = {
      pet_name: formData.name,
      pet_breed: formData.breed,
      pet_color: formData.color,
      pet_category: formData.category,
      pet_gender: formData.gender,
      pet_neutering: formData.neutered,
      pet_age: formData.age,
      pet_weight: formData.weight,
      pet_price: formData.price,
      pet_address: formData.address,
      pet_image: formData.image, // Send media ID
      pet_bio: formData.about,
    };
    console.log("Pet Details:", petDetails);
    const petResponse = await fetch(
      "https://backend.yourclaw.tech/api/pets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petDetails),
      },
    );

    const petData = await petResponse.json();

    if (!petResponse.ok) {
      setLoading(false);
      Alert.alert("Failed to add pet.");
      setFormData({
        image: '',
        name: '',
        breed: '',
        color: '',
        category: '',
        gender: '',
        neutered: '',
        age: '',
        weight: '',
        price: '',
        address: '',
        about: '',
      });
      return;
    }
    if (petResponse.ok) {
      setLoading(false);
      Alert.alert("Pet Added Successfully!!! Thank You for your contribution.");
      setFormData({
        image: '',
        name: '',
        breed: '',
        color: '',
        category: '',
        gender: '',
        neutered: '',
        age: '',
        weight: '',
        price: '',
        address: '',
        about: '',
      });
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 100, backgroundColor: 'white', flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {loading && <Loader />}
      <View style={{ paddingHorizontal: '5%', padding: '10%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ backgroundColor: '#F6F2FF', padding: 15, borderRadius: 100 }}>
            <Paw name="paw" size={30} color="#BAABE4" />
          </View>
          <Text style={{ fontSize: 35, fontWeight: '600', color: 'black' }}>Claw</Text>
        </View>

        <Text style={{ marginTop: 30, fontSize: 35, fontWeight: '500', color: 'black' }}>Add Pet</Text>

        <View>
          <Text style={styles.formLabel}>Photo</Text>
          <TouchableOpacity
            onPress={toggleModal}
            style={{
              alignSelf: 'center'
            }}
          >
            <View
              style={{
                backgroundColor: '#F6F2FF',
                height: 120,
                width: 120,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CameraIcon name="camera" size={45} color="#7D5DA1" />
            </View>
          </TouchableOpacity>

          <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Choose Option</Text>

              <View style={{
                flexDirection: 'row', justifyContent: 'space-around',
                alignItems: 'center'
              }}>
                <TouchableOpacity onPress={handleCamera} style={styles.optionButton}>
                  <CameraIcon name="camera" size={45} color="#7D5DA1" />
                  <Text style={styles.optionText}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleGallery} style={styles.optionButton}>
                  <GalleryIcon name="image-outline" size={50} color="#7D5DA1" />
                  <Text style={styles.optionText}>Gallery</Text>
                </TouchableOpacity>

              </View>

            </View>
          </Modal>

          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 100, height: 100, marginTop: 10, borderRadius: 10 }}
            />
          )}
        </View>

        <View>
          <Text style={styles.formLabel}>Name</Text>
          <TextInput
            placeholder='Tommy'
            placeholderTextColor={'grey'}
            maxLength={50}
            value={formData.name}
            onChangeText={(text) => handleInput('name', text, 'text')}
            style={{
              backgroundColor: '#F6F2FF',
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
              fontSize: 20,
              color: 'black'
            }}
          />
        </View>

        <View>
          <Text style={styles.formLabel}>Breed</Text>
          <TextInput
            placeholder='Golden Retriever'
            placeholderTextColor={'grey'}
            maxLength={50}
            value={formData.breed}
            onChangeText={(text) => handleInput('breed', text, 'text')}
            style={{
              backgroundColor: '#F6F2FF',
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
              fontSize: 20,
              color: 'black'
            }}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, width: '100%' }}>
          <View style={{ width: '48%' }}>
            <Text style={styles.formLabel}>Color</Text>
            <TextInput
              placeholder='White'
              placeholderTextColor={'grey'}
              maxLength={50}
              value={formData.color}
              onChangeText={(text) => handleInput('color', text, 'text')}
              style={{
                backgroundColor: '#F6F2FF',
                width: '',
                borderRadius: 10,
                padding: 15,
                marginTop: 10,
                fontSize: 20,
                color: 'black'
              }}
            />
          </View>

          <View style={{ width: '48%' }}>
            <Text style={styles.formLabel}>Category</Text>
            <CategoryDropdown
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                category: value,
              }))}
              selectedValue={formData.category}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, width: '100%' }}>
          <View style={{ width: '48%' }}>
            <Text style={styles.formLabel}>Gender</Text>
            <GenderDropdown
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                gender: value,
              }))}
              selectedValue={formData.gender}
            />
          </View>

          <View style={{ width: '48%' }}>
            <Text style={styles.formLabel}>Neutered</Text>
            <NeuteredDropdown
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                neutered: value,
              }))}
              selectedValue={formData.neutered}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, width: '100%' }}>
          <View style={{ width: '48%' }}>
            <Text style={styles.formLabel}>Age</Text>
            <TextInput
              placeholder='2 years '
              placeholderTextColor={'grey'}
              value={formData.age}
              onChangeText={(text) => handleInput('age', text, 'number')}
              inputMode='numeric'
              maxLength={50}
              style={{
                backgroundColor: '#F6F2FF',
                borderRadius: 10,
                padding: 15,
                marginTop: 10,
                fontSize: 20,
                color: 'black',
              }}
            />
          </View>

          <View style={{ width: '48%' }}>
            <Text style={styles.formLabel}>Weight</Text>
            <TextInput
              placeholder='10 kg'
              placeholderTextColor={'grey'}
              value={formData.weight}
              onChangeText={(text) => handleInput('weight', text, 'number')}
              inputMode='numeric'
              maxLength={50}
              style={{
                backgroundColor: '#F6F2FF',
                borderRadius: 10,
                padding: 15,
                marginTop: 10,
                fontSize: 20,
                color: 'black',
              }}
            />
          </View>
        </View>

        <View>
          <Text style={styles.formLabel}>Price</Text>
          <TextInput
            placeholder='Enter Pet Price'
            placeholderTextColor={'grey'}
            value={formData.price}
            onChangeText={(text) => handleInput('price', text, 'number')}
            inputMode='numeric'
            maxLength={50}
            style={{
              backgroundColor: '#F6F2FF',
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
              fontSize: 20,
              color: 'black',
            }}
          />
        </View>

        <View>
          <Text style={styles.formLabel}>Address</Text>
          <TextInput
            placeholder='Enter Pet Address'
            placeholderTextColor={'grey'}
            value={formData.address}
            onChangeText={(text) => handleInput('address', text, 'text')}
            maxLength={50}
            style={{
              backgroundColor: '#F6F2FF',
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
              fontSize: 20,
              color: 'black'
            }}
          />
        </View>

        <View>
          <Text style={styles.formLabel}>About Pet</Text>
          <TextInput
            placeholder="Enter About Pet"
            placeholderTextColor={'grey'}
            multiline={true}
            value={formData.about}
            onChangeText={(text) => handleInput('about', text, 'text')}
            style={{
              backgroundColor: '#F6F2FF',
              borderRadius: 10,
              padding: 15,
              marginTop: 10,
              fontSize: 18,
              height: 150,
              textAlignVertical: 'top',
              color: 'black'
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#7D5DA1',
            marginTop: 30,
            padding: 15,
            borderRadius: 15,
          }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default AddPet

const styles = StyleSheet.create({
  formLabel: {
    fontSize: 22,
    fontWeight: '500',
    color: 'grey',
    marginTop: 20
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  optionText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 20,
  },
});
