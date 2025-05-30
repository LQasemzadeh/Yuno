import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

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
        router.push('/home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login to YUNO</Text>

            <TextInput
                style={styles.input}
                placeholder="Your PFH email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Your password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
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
    title: {
        fontSize: 24, fontWeight: 'bold',
        color: '#133b89', marginBottom: 30,
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
