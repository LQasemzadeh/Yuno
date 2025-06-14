import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';

export default function HomeScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>YUNO</Text>

            <Image
                source={require('@/app/assets/YUNO.png')}
                style={styles.botImage}
                resizeMode="contain"
            />

            <Text style={styles.title}>
                Let’s start the Yuno <Text style={styles.ai}>AI</Text>
            </Text>
            <Text style={styles.subtitle}>
                Lost at PFH? Don’t worry, Yuno's got your back!
            </Text>

            <TouchableOpacity
                style={styles.getStartedButton}
                onPress={() => router.push('/login')}
            >
                <Text style={styles.getStartedText}>Join Us</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimerText}>
                By continuing, you accept the{' '}
                <Text
                    style={styles.linkText}
                    onPress={() => setModalVisible(true)}
                >
                    Terms and Policy
                </Text>
                .
            </Text>

            {/* Terms and Rules Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <ScrollView>
                            <Text style={styles.modalTitle}>YUNO Terms and Rules</Text>
                            <Text style={styles.modalText}>1. Use YUNO only for academic and campus-related purposes.</Text>
                            <Text style={styles.modalText}>2. Do not share personal or sensitive information through the chatbot.</Text>
                            <Text style={styles.modalText}>3. YUNO is a support tool — always verify important information through official PFH channels.</Text>
                            <Text style={styles.modalText}>4. Respect others. Harassment, hate speech, or abusive language will not be tolerated.</Text>
                            <Text style={styles.modalText}>5. Chat logs may be used anonymously to improve the system.</Text>
                            <Text style={styles.modalText}>6. Do not attempt to exploit or bypass chatbot security or limitations.</Text>
                            <Text style={styles.modalText}>7. Use of YUNO implies consent to PFH’s data protection and IT usage policies.</Text>
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    getStartedButton: {
        backgroundColor: '#133b89',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 10,
    },
    getStartedText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    disclaimerText: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'center',
        marginTop: 10,
    },
    linkText: {
        color: '#133b89',
        textDecorationLine: 'underline',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#133b89',
    },
    modalText: {
        fontSize: 14,
        marginBottom: 10,
        color: '#333',
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#133b89',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
