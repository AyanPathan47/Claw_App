import { Text, View, TextInput, Pressable, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import Loader from '../components/Loader';
import Paw from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import UserRoleDropdown from '../components/UserRoleDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({setIsLoggedIn}) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [signUpFormData, setSignUpFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: '',
    })

    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);

    const handleChange = (text) => {
        // Sirf numbers ko allow karo
        const numericText = text.replace(/[^0-9]/g, '');
        setSignUpFormData(prev => ({
            ...prev,
            phone: numericText
        }));
    };

    const handleSignUp = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://backend.yourclaw.tech/api/users', {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signUpFormData)
            });

            if (res.ok) {
                // now login to get token
                const loginRes = await fetch('https://backend.yourclaw.tech/api/users/login', {
                    method: 'POST',
                    credentials: "include",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: signUpFormData.email,
                        password: signUpFormData.password
                    })
                });

                const loginData = await loginRes.json();
                console.log('Token:', loginData.token);
                await AsyncStorage.setItem("authToken", loginData.token);
                await AsyncStorage.setItem("userName", loginData.user.name);
                setLoading(false);
                Alert.alert(
                    `Welcome ${loginData.user.name}`,
                    "Sign successful!!",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                setIsLoggedIn(true);
                            }

                        }
                    ]
                );
            } else {
                setLoading(false);
                Alert.alert('Signup failed', 'Please check your details and try again.');
                setSignUpFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    role: ''
                });
            }

        } catch (err) {
            setLoading(false);
            console.error('Signup error:', err);
        }
    }

    return (
        <ScrollView style={{
            backgroundColor: 'white',
            flex: 1, paddingHorizontal: '5%', padding: '10%',
        }}>
            {loading && <Loader />}
            <View style={{ gap: 10, alignItems: 'center', borderRadius: 100, alignSelf: 'center'}}>
                <Paw name="paw" size={70} color="#BAABE4" />
                <Text style={{ fontSize: 40, fontWeight: '500' }}>Claw</Text>
            </View>
            <Text style={{ fontSize: 50, fontWeight: '600', textAlign: 'center', marginTop: 10 }}>Sign Up</Text>

            <TextInput
                placeholder='Name'
                placeholderTextColor={'grey'}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType='next'
                onSubmitEditing={() => emailRef.current.focus()}
                value={signUpFormData.name}
                onChangeText={(text) => setSignUpFormData(prev => ({
                    ...prev,
                    name: text
                }))}
                maxLength={50}
                style={{
                    backgroundColor: '#F6F2FF',
                    borderRadius: 10,
                    padding: 15,
                    paddingVertical:10,
                    marginTop: 20,
                    fontSize: 22,
                    color: 'black'
                }}
            />

            <TextInput
                placeholder='Email address'
                placeholderTextColor={'grey'}
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                onSubmitEditing={() => phoneRef.current.focus()}
                ref={emailRef}
                value={signUpFormData.email}
                onChangeText={(text) => setSignUpFormData(prev => ({
                    ...prev,
                    email: text
                }))}
                maxLength={50}
                style={{
                    backgroundColor: '#F6F2FF',
                    borderRadius: 10,
                    padding: 15,
                    paddingVertical:10,
                    marginTop: 20,
                    fontSize: 22,
                    color: 'black'
                }}
            />

            <TextInput
                placeholder='Phone number'
                placeholderTextColor={'grey'}
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                onSubmitEditing={() => passwordRef.current.focus()}
                ref={phoneRef}
                value={signUpFormData.phone}
                onChangeText={handleChange}
                maxLength={10}
                keyboardType='numeric'
                style={{
                    backgroundColor: '#F6F2FF',
                    borderRadius: 10,
                    padding: 15,
                    paddingVertical:10,
                    marginTop: 20,
                    fontSize: 22,
                    color: 'black'
                }}
            />

            <TextInput
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor={'grey'}
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                ref={passwordRef}
                value={signUpFormData.password}
                onChangeText={(text) => setSignUpFormData(prev => ({
                    ...prev,
                    password: text
                }))}
                maxLength={50}
                style={{
                    backgroundColor: '#F6F2FF',
                    borderRadius: 10,
                    padding: 15,
                    paddingVertical:10,
                    marginTop: 20,
                    fontSize: 22,
                    color: 'black',
                }}
            />

            <UserRoleDropdown
                onValueChange={(value) => setSignUpFormData(prev => (
                    {
                        ...prev,
                        role: value
                    }
                ))}
                selectedValue={signUpFormData.role}
            />

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSignUp}
                style={{
                    backgroundColor: '#7D5DA1',
                    marginTop: 20,
                    padding: 13,
                    borderRadius: 12,
                }}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: '500', textAlign: 'center' }}>
                    Sign up
                </Text>
            </TouchableOpacity>

            <Pressable>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '400',
                    textAlign: 'center',
                    marginTop: 15,
                    color: 'grey',
                }}>
                    Already have an account?
                    <Text
                        onPress={() => navigation.navigate('Login')}
                        style={{ color: '#7D5DA1', fontWeight:500 }}>&nbsp;Login</Text>
                </Text>
            </Pressable>
        </ScrollView >
    )
}

export default SignUp