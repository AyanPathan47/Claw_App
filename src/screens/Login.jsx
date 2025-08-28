import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Paw from 'react-native-vector-icons/Fontisto';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ setIsLoggedIn }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginpassword, setLoginPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const passwordInputRef = useRef(null);

    const navigation = useNavigation();

    const handleLogin = async () => {
        console.log('Login button pressed')
        try {
            setLoading(true);
            const Login = await fetch(
                "https://backend.yourclaw.tech/api/users/login",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: loginEmail,
                        password: loginpassword,
                    }),
                },
            );
            const data = await Login.json();
            setLoading(false);
            if (Login.ok && data.token) {
                await AsyncStorage.setItem("authToken", data.token);
                await AsyncStorage.setItem("userName", data.user.name);
                Alert.alert(
                    `Login successful!! Welcome Back ${data.user.name}`,
                    "You have logged in successfully!",
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
                Alert.alert(
                    "The email or password provided is incorrect. Please try again.",
                );
                setLoginEmail('');
                setLoginPassword('');
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
            Alert.alert('Error', 'Invalid email or password')
            setLoginEmail('');
            setLoginPassword('');
        }
    }

    return (
        <ScrollView style={{
            backgroundColor: 'white',
            flex: 1, paddingHorizontal: '5%', padding: '10%'
        }}>
            {loading && <Loader />}
            <View style={{ gap: 10, alignItems: 'center', borderRadius: 100, alignSelf: 'center', marginTop: 50 }}>
                <Paw name="paw" size={70} color="#BAABE4" />
                <Text style={{ fontSize: 40, fontWeight: '500' }}>Claw</Text>
            </View>
            <Text style={{ fontSize: 50, fontWeight: '600', textAlign: 'center', marginTop: 30 }}>Login</Text>

            <TextInput
                placeholder='Email address'
                placeholderTextColor={'grey'}
                maxLength={50}
                value={loginEmail}
                onChangeText={setLoginEmail}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType='next'
                onSubmitEditing={() => passwordInputRef.current.focus()}
                style={{
                    backgroundColor: '#F6F2FF',
                    borderRadius: 10,
                    padding: 15,
                    marginTop: 30,
                    fontSize: 22,
                    color: 'black'
                }}
            />

            <TextInput
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor={'grey'}
                maxLength={50}
                value={loginpassword}
                onChangeText={setLoginPassword}
                ref={passwordInputRef}
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                style={{
                    backgroundColor: '#F6F2FF',
                    borderRadius: 10,
                    padding: 15,
                    marginTop: 30,
                    color: 'black',
                    fontSize: 22,
                    color: 'black'
                }}
            />

            <Pressable
                onPress={() => {
                    // navigation.navigate('PetDetails')
                    console.log('Forget Password Pressed')
                }
                }
            >
                <Text style={{
                    fontSize: 20,
                    fontWeight: '500',
                    textAlign: 'left',
                    paddingLeft: 20,
                    marginTop: 20,
                    color: 'grey'
                }}>
                    Forget Password ?
                </Text>
            </Pressable>

            <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.8}
                style={{
                    backgroundColor: '#7D5DA1',
                    marginTop: 50,
                    padding: 15,
                    borderRadius: 12,
                }}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: '500', textAlign: 'center' }}>
                    Log in
                </Text>
            </TouchableOpacity>

            <Pressable>
                <Text style={{
                    fontSize: 20,
                    fontWeight: '500',
                    textAlign: 'left',
                    marginTop: 25,
                    color: 'grey',
                    paddingLeft: 10,
                }}>
                    Don't have an account?
                    <Text
                        onPress={() => navigation.navigate('SignUp')}
                        style={{ color: '#7D5DA1' }}>&nbsp;Sign up</Text>
                </Text>
            </Pressable>
        </ScrollView >
    )
}

export default Login
