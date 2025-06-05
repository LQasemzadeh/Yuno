import { useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    const handleRegister = async () => {
        if (!email.endsWith('@pfh.de')) {
            Alert.alert('Invalid Email', 'Please use your PFH email');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Weak Password', 'Password must be at least 8 characters.');
            return;
        }

        try {
            const storedUsers = await AsyncStorage.getItem('users');
            let users = [];

            if (storedUsers) {
                try {
                    const parsed = JSON.parse(storedUsers);
                    if (Array.isArray(parsed)) {
                        users = parsed;
                    } else {
                        console.warn('Stored users is not an array:', parsed);
                    }
                } catch (err) {
                    console.warn('Error parsing stored users:', err);
                }
            }

            const alreadyRegistered = users.find(
                user => user.email === email.trim().toLowerCase()
            );

            if (alreadyRegistered) {
                Alert.alert(
                    'Account Exists',
                    'This email is already registered. Try logging in instead.'
                );
                return;
            }

            const newUser = {
                email: email.trim().toLowerCase(),
                password,
            };

            const updatedUsers = [...users, newUser];
            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

            Alert.alert('Success', 'You registered successfully.');

            setTimeout(() => {
                router.push({ pathname: '/login', params: { registered: 'true' } });
            }, 1500);
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Your PFH email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                autoComplete="email"
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    textContentType="newPassword"
                    autoComplete="password-new"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#555"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 10,
        zIndex: 1,
    },
    backText: {
        fontSize: 24,
        color: '#133b89',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#133b89',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        color: '#000',
        marginBottom: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '100%',
    },
    passwordInput: {
        flex: 1,
        padding: 15,
        color: '#000',
    },
    button: {
        backgroundColor: '#133b89',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
