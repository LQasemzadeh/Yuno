import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>YUNO</Text>

            <Image
                source={require('../assets/YUNO.png')}
                style={styles.botImage}
                resizeMode="contain"
            />

            <Text style={styles.title}>Let’s start the Yuno <Text style={styles.ai}>AI</Text></Text>
            <Text style={styles.subtitle}>
                Lost at PFH? Don’t worry, Yuno's got your back!
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => router.push('/register')}
                >
                    <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => router.push('/login')}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#133b89',
        marginBottom: 20,
    },
    botImage: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    ai: {
        backgroundColor: '#133b89',
        color: '#fff',
        paddingHorizontal: 6,
        borderRadius: 4,
        overflow: 'hidden',
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    registerButton: {
        backgroundColor: '#133b89',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    loginButton: {
        borderColor: '#000',
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    registerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});
