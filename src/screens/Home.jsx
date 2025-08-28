import { StyleSheet, Text, View, TextInput, FlatList, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useEffect, useState, } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

import Paw from 'react-native-vector-icons/Fontisto';
import Search from 'react-native-vector-icons/Feather';
import Mic from 'react-native-vector-icons/FontAwesome';
import RightArrow from 'react-native-vector-icons/AntDesign';
import Calendar from 'react-native-vector-icons/AntDesign';
import Price from 'react-native-vector-icons/Entypo';
import Envelope from 'react-native-vector-icons/FontAwesome';
import ChevronRight from 'react-native-vector-icons/Feather';
import Care from 'react-native-vector-icons/FontAwesome5';



const Home = () => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Data, setData] = useState([])
    const [userName, setUserName] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://backend.yourclaw.tech/api/pets');
            const apiData = await response.json();
            setData(apiData.docs.slice(0, 5));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 70 }}
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
        >
            <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: '5%', padding: '10%' }}>
                {/* {loading && <Loader />} */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={{ backgroundColor: '#F6F2FF', padding: 15, borderRadius: 100 }}>
                        <Paw name="paw" size={30} color="#BAABE4" />
                    </View>
                    <Text style={{ fontSize: 35, fontWeight: '600', color: 'black' }}>Claw</Text>
                </View>

                <View style={{ marginTop: 30, gap: 10 }}>
                    <Text style={{ fontSize: 35, fontWeight: '500', color: 'black' }}>Hey, {userName || "User"}!</Text>
                    <Text style={{ fontSize: 20, fontWeight: '400', color: 'grey' }}>
                        Find your new best friend
                    </Text>
                </View>

                <View style={{ marginTop: 30, backgroundColor: '#F6F2FF', paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', borderRadius: 100, alignItems: 'center', gap: '8' }}>
                    <Search name="search" size={25} color="grey" />
                    <TextInput
                        style={{ fontSize: 20, fontWeight: '400', width: '80%', paddingHorizontal: 10 }}
                        maxLength={50}
                        placeholder='Search for a pet'
                        placeholderTextColor={'grey'}
                    />
                    <Mic name="microphone" size={30} color="#BAABE4" />
                </View>

                <View style={{ marginTop: 50 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 28, fontWeight: '500' , color: 'black'}}>Recent Pets</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Pets')}>
                            <RightArrow name="arrowright" size={35} color="#BAABE4" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={Data}
                        style={{ marginTop: 30 }}
                        contentContainerStyle={{ gap: 5 }}
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
                                    width: 250, height: 320
                                }}>
                                <Image source={{ uri: item.pet_image }} style={{ width: 250, height: 180, borderTopLeftRadius: 10, borderTopRightRadius: 10, resizeMode: 'cover' }} />
                                <View style={{ padding: 10 }}>
                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ fontSize: 25, fontWeight: '600', color: 'black' }}>{item.pet_name}</Text>
                                    </View>

                                    <Text style={{ fontSize: 19, fontWeight: '500', color: 'grey' }}>{item.pet_breed}</Text>

                                    <View
                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', fontSize: 18, marginTop: 10 }}><Calendar
                                            style={{ marginRight: 5 }}
                                            name="calendar" size={25} color="#7D5DA1" />
                                            <Text style={{ fontSize: 18, fontWeight: '500', color: 'grey' }}>
                                                {item.pet_age} Years
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', fontSize: 18, marginTop: 10 }}><Price
                                            style={{ marginRight: 5 }}
                                            name="price-tag" size={25} color="#7D5DA1" />
                                            <Text style={{ fontSize: 18, fontWeight: '500', color: 'grey' }}>
                                                {item.pet_price} ₹
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 28, fontWeight: '500', color: 'black' }}>Trending Breeds</Text>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: '100%',
                    }}>
                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', padding: 5 }}>

                            <Image
                                source={require('../../public/assets/images/Golden-avater.jpg')}
                                style={{
                                    width: 90, height: 90, borderRadius: 100,
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowColor: '#000',
                                    shadowOpacity: 0.3,
                                    shadowRadius: 1.41,
                                    elevation: 5,
                                    backgroundColor: 'white',
                                    borderRadius: 100,
                                }}
                            />

                            <Text style={{
                                fontSize: 18,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 10,
                                width: 100,
                                textAlign: 'center',
                                color: 'black'
                            }}>
                                Golden Retriever
                            </Text>
                        </View>

                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', padding: 5 }}>

                            <Image
                                source={require('../../public/assets/images/persian-avater.jpg')}
                                style={{
                                    width: 90, height: 90, borderRadius: 100,
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowColor: '#000',
                                    shadowOpacity: 0.3,
                                    shadowRadius: 1.41,
                                    elevation: 5,
                                    backgroundColor: 'white',
                                    borderRadius: 100,
                                }}
                            />

                            <Text style={{
                                fontSize: 18,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 10,
                                width: 100,
                                textAlign: 'center',
                                color: 'black'
                            }}>
                                Persian Cat
                            </Text>
                        </View>

                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', padding: 5 }}>

                            <Image
                                source={require('../../public/assets/images/Labrador-avater.jpeg')}
                                style={{
                                    width: 90, height: 90, borderRadius: 100,
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowColor: '#000',
                                    shadowOpacity: 0.3,
                                    shadowRadius: 1.41,
                                    elevation: 5,
                                    backgroundColor: 'white',
                                    borderRadius: 100,
                                }}
                            />

                            <Text style={{
                                fontSize: 18,
                                fontWeight: '400',
                                textAlign: 'center',
                                marginTop: 10,
                                width: 100,
                                textAlign: 'center',
                                color: 'black'
                            }}>
                                Labrador
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 28, fontWeight: '500', color: 'black' }}>your Requests</Text>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: '100%',
                        backgroundColor: '#F6F2FF', paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10, marginTop: 20, shadowOffset: { width: 0, height: 1 },
                    }}>
                        <Envelope name="envelope" size={30} color="#BAABE4" />
                        <Text style={{
                            fontSize: 22, fontWeight: '500', color : "#BAABE4"
                        }}>
                            2 Pending Requests
                        </Text>
                        <ChevronRight name="chevron-right" size={35} color="#BAABE4" />
                    </View>
                </View>

                <View style={{ marginVertical: 20 }}>
                    <Text style={{ fontSize: 28, fontWeight: '500', color : "#BAABE4" }}>Pet Tips</Text>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: '100%',
                        backgroundColor: '#F6F2FF', paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10, marginTop: 20, shadowOffset: { width: 0, height: 1 },
                    }}>
                        <Care name="hand-holding-heart" size={40} color="#BAABE4" />
                        <Text style={{
                            fontSize: 22,
                            fontWeight: '500',
                            width: '65%',
                            color: "#BAABE4"
                        }}>
                            How to adopt responsibly
                        </Text>
                        <ChevronRight name="chevron-right" size={35} color="#BAABE4" />
                    </View>
                </View>
            </View>
            <View
                style={{
                    backgroundColor: '#F6F8FA',
                    height: 500,
                    width: '100%',
                    paddingTop: 80,
                    paddingBottom: 20,
                    paddingLeft: 20,
                    gap: 20,
                }}
            >
                <Text
                    style={{
                        color: '#DDE3E9',
                        fontSize: 60,
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        width: '60%',
                    }}
                >
                    claw,truly indian app
                </Text>
                <Text
                    style={{
                        color: '#B6C2CD',
                        textTransform: 'uppercase',
                        fontSize: 20,
                    }}
                >
                    made with ♥️ by Ayann
                </Text>
                <Text
                    style={{
                        color: '#B6C2CD',
                        textTransform: 'uppercase',
                        fontSize: 16,
                    }}
                >
                    @2025 app version 09.03.47
                </Text>
            </View>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({})