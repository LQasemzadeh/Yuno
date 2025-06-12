
import { useEffect, useLayoutEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Platform,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [faceIdAvailable, setFaceIdAvailable] = useState(false);

    const router = useRouter();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const hasHardware = await LocalAuthentication.hasHardwareAsync();
                const isEnrolled = await LocalAuthentication.isEnrolledAsync();
                setFaceIdAvailable(hasHardware && isEnrolled);
            } catch (error) {
                console.error('Error checking biometric support:', error);
                setFaceIdAvailable(false);
            }
        })();
    }, []);

    const authenticateUser = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: Platform.OS === 'ios' ? 'Authenticate with Face ID' : 'Authenticate with Biometrics',
                disableDeviceFallback: true, // This prevents fallback to passcode
                cancelLabel: 'Cancel',
            });

            return result.success;
        } catch (error) {
            console.error('Authentication error:', error);
            return false;
        }
    };

    const handleSimulatedLogin = async () => {
        if (faceIdAvailable) {
            const authenticated = await authenticateUser();
            if (!authenticated) {
                Alert.alert(
                    'Authentication Failed',
                    Platform.OS === 'ios'
                        ? 'Face ID authentication failed.'
                        : 'Biometric authentication failed.'
                );
                return;
            }
        }

        setIsLoading(true);

        // Simulated login process
        setTimeout(() => {
            setName('Ladan');
            setEmail('zahra.qasemzadeh@pfh.de');

            setTimeout(() => {
                setIsLoading(false);
                router.replace('/(tabs)');
            }, 1500);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Continue as PFH Email</Text>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#133b89" />
                    <Text style={styles.loadingText}>Connecting to PFH Outlook...</Text>
                </View>
            ) : (
                <TouchableOpacity style={styles.continueButton} onPress={handleSimulatedLogin}>
                    <Ionicons name="school-outline" size={24} color="#fff" style={{ marginRight: 10 }} />
                    <Text style={styles.continueText}>Continue as PFH Email</Text>
                </TouchableOpacity>
            )}

            {email !== '' && (
                <View style={styles.userInfo}>
                    <Text style={styles.welcomeText}>Welcome, {name}!</Text>
                    <Text style={styles.emailText}>Email: {email}</Text>
                </View>
            )}
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
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#133b89',
        marginBottom: 40,
    },
    continueButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#133b89',
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    continueText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#555',
    },
    userInfo: {
        marginTop: 30,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#133b89',
    },
    emailText: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
});