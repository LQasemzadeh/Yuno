import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const topics = [
    { title: 'Tell me', subtitle: 'what you can do' },
    { title: 'Help me', subtitle: 'find my class' },
    { title: 'How can I', subtitle: 'connect to PFH WiFi' },
    { title: 'Translate', subtitle: 'the text' },
];

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const router = useRouter();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>YUNO</Text>
                <TouchableOpacity>
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Spacer */}
            <View style={{ flex: 1 }} />

            {/* Topic Buttons */}
            <FlatList
                horizontal
                data={topics}
                keyExtractor={(item) => item.title}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.topicList}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.topicButton}>
                        <Text style={styles.topicTitle}>{item.title}</Text>
                        <Text style={styles.topicSubtitle}>{item.subtitle}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Input Bar */}
            <View style={styles.inputBar}>
                <TouchableOpacity>
                    <MaterialIcons name="add" size={24} color="gray" />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Ask anything"
                    placeholderTextColor="#888"
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity>
                    <Ionicons name="mic" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="send" size={24} color="gray" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    topicList: {
        paddingBottom: 12,
    },
    topicButton: {
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 14,
        marginRight: 8,
    },
    topicTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000',
    },
    topicSubtitle: {
        fontSize: 11,
        color: '#666',
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#000',
    },
});

export default ChatScreen;
