import { useState, useLayoutEffect, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
} from 'react-native';
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [faceIdAvailable, setFaceIdAvailable] = useState(false);

    const router = useRouter();
    const navigation = useNavigation();
    const params = useLocalSearchParams();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    // Face ID support check
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();
            if (Platform.OS === 'ios' && compatible && enrolled) {
                setFaceIdAvailable(true);
                authenticateWithFaceID();
            }
        })();
    }, []);

    const authenticateWithFaceID = async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Face ID',
        });

        if (result.success) {
            // Autofill (you can load from SecureStore or hardcoded for testing)
            setEmail('student@pfh.de');
            setPassword('securePassword123');
        }
    };

    const handleLogin = () => {
        if (!email.endsWith('@pfh.de')) {
            Alert.alert('Invalid Email', 'Please use your PFH email (e.g., name@pfh.de).');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Invalid Password', 'Password must be at least 8 characters.');
            return;
        }

        Alert.alert('Login Success', 'Welcome back!');
        router.replace('/(tabs)');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Login to YUNO</Text>

            {params.registered === 'true' && (
                <Text style={styles.successMessage}>
                    ✅ You're officially part of the YUNO family. Now log in like a champ!
                </Text>
            )}

            <TextInput
                style={styles.input}
                placeholder="Your PFH email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="username"
                autoComplete="email"
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Your password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    textContentType="password"
                    autoComplete="password"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#555"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() =>
                    Alert.alert('Coming Soon', 'Password reset feature will be available soon.')
                }
                style={styles.forgotPassword}
            >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
        padding: 20, backgroundColor: '#fff',
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
        fontSize: 24, fontWeight: 'bold',
        color: '#133b89', marginBottom: 20,
    },
    successMessage: {
        backgroundColor: '#e0ffe5',
        borderColor: '#3cb371',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        color: '#2e8b57',
        fontSize: 14,
        textAlign: 'center',
    },
    input: {
        width: '100%', padding: 15,
        borderWidth: 1, borderColor: '#555',
        borderRadius: 10, color: '#000',
        marginBottom: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
    },
    passwordInput: {
        flex: 1,
        padding: 15,
        color: '#000',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#133b89',
        textDecorationLine: 'underline',
        fontSize: 14,
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#133b89',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff', fontWeight: 'bold',
        fontSize: 16,
    },
});
