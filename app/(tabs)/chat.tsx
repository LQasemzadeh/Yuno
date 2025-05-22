import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet
} from 'react-native';

export default function ChatScreen() {
    const [messages, setMessages] = useState([
        { id: '1', sender: 'bot', text: '🚀 Thanks for reaching out to Yuno Support! What can I help you with?' }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim() === '') return;
        const newMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: input
        };
        setMessages([...messages, newMessage]);
        setInput('');
    };

    const renderItem = ({ item }: any) => (
        <View
            style={[
                styles.messageBubble,
                item.sender === 'user' ? styles.userBubble : styles.botBubble
            ]}
        >
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
        >
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatContainer}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Ask a question..."
                    placeholderTextColor="#999"
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>↑</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    chatContainer: { padding: 10 },
    messageBubble: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 15,
        marginVertical: 4,
    },
    userBubble: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    botBubble: {
        backgroundColor: '#E5E5EA',
        alignSelf: 'flex-start',
    },
    messageText: { fontSize: 16 },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textInput: {
        flex: 1,
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    sendButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
