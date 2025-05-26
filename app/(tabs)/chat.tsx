import React, { useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const Chat = () => {
    const navigation = useNavigation();

    useEffect(() => {
        // Hide bottom tab bar when entering this screen
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' },
        });

        // Show tab bar again when leaving this screen
        return () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'flex' },
            });
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Chat with AI Bot</Text>
            </View>

            {/* Empty Chat Area */}
            <View style={styles.chatArea} />

            {/* Input Bar */}
            <View style={styles.inputBar}>
                <TouchableOpacity>
                    <Ionicons name="attach" size={20} color="#666" />
                </TouchableOpacity>

                <TextInput
                    style={styles.textInput}
                    placeholder="Type your message..."
                    placeholderTextColor="#999"
                />

                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="mic" size={20} color="#666" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                    <FontAwesome name="send" size={20} color="#666" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 16,
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    chatArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopColor: '#eee',
        borderTopWidth: 1,
        backgroundColor: '#f5f5f5',
    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 20,
        color: '#000',
    },
    iconButton: {
        marginLeft: 8,
    },
});
