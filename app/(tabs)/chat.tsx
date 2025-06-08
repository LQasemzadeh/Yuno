import React, { useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

export default function ChatScreen() {
    const navigation = useNavigation();
    const router = useRouter();

    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarStyle: { display: 'none' },
            headerShown: false,
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={80}
            >
                {/* ✅ Back Arrow */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>YUNO</Text>
                </View>

                {/* Content area */}
                <View style={styles.chatContent}>
                    <View style={styles.messageBox}>
                        <Text style={styles.botName}>YUNO</Text>
                        <Text style={styles.botMessage}>
                            Lost at PFH? Don’t worry, Yuno's got your back! How can I assist you?
                        </Text>
                    </View>
                </View>

                {/* Input bar */}
                <View style={styles.inputWrapper}>
                    <TouchableOpacity style={styles.plusButton}>
                        <Text style={styles.plusText}>+</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Write your message"
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity>
                        <Text style={styles.sendText}>📤</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 10,
        padding: 10,
    },
    backText: {
        fontSize: 24,
        color: '#133b89',
    },
    header: {
        paddingTop: 60,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    chatContent: {
        flex: 1,
        paddingTop: 20,
    },
    messageBox: {
        backgroundColor: '#f1f1f1',
        borderRadius: 12,
        padding: 15,
        alignSelf: 'flex-start',
    },
    botName: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    botMessage: {
        fontSize: 16,
        color: '#333',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    plusButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    plusText: {
        fontSize: 18,
        color: '#555',
    },
    input: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        color: '#000',
    },
    sendText: {
        fontSize: 20,
        marginLeft: 10,
        color: '#007AFF',
    },
});
