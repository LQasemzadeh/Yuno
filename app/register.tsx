import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleRegister = () => {
        if (!email.endsWith('@student.pfh.de')) {
            Alert.alert('Invalid Email', 'Please use your PFH student email.');
            return;
        }

        Alert.alert('Success', 'Account created. You can now log in.');
        router.push('/login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create PFH Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Your PFH email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#000' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#FFE600', marginBottom: 30 },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        color: '#fff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FFE600',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
    },
    buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});
