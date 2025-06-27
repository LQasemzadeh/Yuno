import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Dimensions,
    ScrollView,
    SafeAreaView,
    Image,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { askChatGPT } from '../../hooks/useChatGPT';
import HistoryDrawer from '../../components/HistoryDrawer';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface Topic {
    title: string;
    subtitle: string;
}

const topics: Topic[] = [
    { title: 'Tell me', subtitle: 'what you can do' },
    { title: 'Help me', subtitle: 'find my class' },
    { title: 'How can I', subtitle: 'connect to PFH WiFi' },
    { title: 'Translate', subtitle: 'the text' },
];

const screenWidth = Dimensions.get('window').width;
const drawerWidth = screenWidth * 0.75;

const ChatScreen: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [streamedText, setStreamedText] = useState<string>('');
    const router = useRouter();
    const inputRef = useRef<TextInput>(null);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages, streamedText]);

    const saveChatToHistory = async (messageText: string) => {
        try {
            const existingData = await AsyncStorage.getItem('chat_history');
            const parsed = existingData ? JSON.parse(existingData) : [];

            const newChat = {
                id: uuid.v4(),
                title: messageText.slice(0, 30),
                timestamp: Date.now(),
            };

            await AsyncStorage.setItem('chat_history', JSON.stringify([newChat, ...parsed]));
        } catch (err) {
            console.error('Error saving chat:', err);
        }
    };

    const handleSend = async () => {
        if (!message.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: message.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage('');

        try {
            setIsLoading(true);
            setStreamedText('');

            await saveChatToHistory(userMessage.content);

            const reply = await askChatGPT(userMessage.content, (chunk: string) => {
                setStreamedText((prev) => prev + chunk);
            });

            const botMessage: Message = {
                id: Date.now().toString() + '-bot',
                role: 'assistant',
                content: reply,
            };

            setMessages((prev) => [...prev, botMessage]);
            setStreamedText('');
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTopicPress = (topic: Topic) => {
        setMessage(`${topic.title} ${topic.subtitle}`);
        inputRef.current?.focus();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainContainer}>
                {drawerVisible && (
                    <Animated.View style={[StyleSheet.absoluteFill, { zIndex: 100 }]}>
                        <HistoryDrawer onClose={() => setDrawerVisible(false)} />
                    </Animated.View>
                )}

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.keyboardAvoidingView}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                >
                    <View style={styles.contentContainer}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>YUNO</Text>
                            <TouchableOpacity onPress={() => setDrawerVisible((prev) => !prev)}>
                                <Ionicons name="ellipsis-vertical" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.chatArea}>
                            <ScrollView
                                contentContainerStyle={{ paddingVertical: 10 }}
                                ref={scrollViewRef}
                            >
                                {messages.map((msg) => (
                                    <View
                                        key={msg.id}
                                        style={{
                                            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                                            alignItems: 'flex-end',
                                            marginVertical: 4,
                                            marginHorizontal: 8,
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: msg.role === 'user'
                                                    ? 'https://i.pravatar.cc/40?u=user'
                                                    : 'https://cdn-icons-png.flaticon.com/512/4712/4712027.png',
                                            }}
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: 16,
                                                marginHorizontal: 6,
                                            }}
                                        />
                                        <View
                                            style={{
                                                backgroundColor: msg.role === 'user' ? '#2f2f2f' : '#3a3a3a',
                                                padding: 10,
                                                borderRadius: 12,
                                                maxWidth: '75%',
                                            }}
                                        >
                                            <Text style={{ color: '#fff' }}>{msg.content}</Text>
                                        </View>
                                    </View>
                                ))}

                                {isLoading && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'flex-end',
                                            marginLeft: 16,
                                            marginTop: 4,
                                        }}
                                    >
                                        <Image
                                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4712/4712027.png' }}
                                            style={{ width: 32, height: 32, borderRadius: 16, marginRight: 6 }}
                                        />
                                        <View
                                            style={{
                                                backgroundColor: '#3a3a3a',
                                                padding: 10,
                                                borderRadius: 12,
                                                maxWidth: '75%',
                                            }}
                                        >
                                            <Text style={{ color: '#aaa' }}>{streamedText || 'YUNO is typing...'}</Text>
                                        </View>
                                    </View>
                                )}
                            </ScrollView>
                        </View>

                        <View style={styles.bottomSection}>
                            <View style={styles.topicContainer}>
                                <FlatList
                                    horizontal
                                    data={topics}
                                    keyExtractor={(item) => item.title}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.topicList}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.topicButton}
                                            onPress={() => handleTopicPress(item)}
                                        >
                                            <Text style={styles.topicTitle}>{item.title}</Text>
                                            <Text style={styles.topicSubtitle}>{item.subtitle}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

                            <View style={styles.inputBarContainer}>
                                <View style={styles.inputBar}>
                                    <TouchableOpacity>
                                        <MaterialIcons name="add" size={24} color="#aaa" />
                                    </TouchableOpacity>

                                    <TextInput
                                        ref={inputRef}
                                        style={styles.input}
                                        placeholder="Ask anything"
                                        placeholderTextColor="#888"
                                        value={message}
                                        onChangeText={setMessage}
                                        onSubmitEditing={handleSend}
                                        editable={!isLoading}
                                        multiline
                                    />

                                    <TouchableOpacity>
                                        <Ionicons name="mic" size={24} color="#aaa" />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={handleSend}
                                        disabled={!message.trim() || isLoading}
                                    >
                                        <Ionicons
                                            name="send"
                                            size={24}
                                            color={message.trim() && !isLoading ? "#0A84FF" : "#555"}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    chatArea: {
        flex: 1,
    },
    bottomSection: {
        marginTop: 'auto',
        paddingBottom: Platform.OS === 'ios' ? 8 : 10,
    },
    inputBarContainer: {
        paddingHorizontal: 10,
        paddingBottom: Platform.OS === 'ios' ? 8 : 10,
        backgroundColor: '#000',
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        borderRadius: 25,
        paddingHorizontal: 12,
        paddingVertical: 6,
        minHeight: 50,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#fff',
        maxHeight: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingTop: Platform.OS === 'ios' ? 20 : 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        color: 'white',
    },
    topicContainer: {
        marginBottom: 12,
    },
    topicList: {
        paddingVertical: 8,
    },
    topicButton: {
        backgroundColor: '#2d2d2d',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginRight: 8,
        justifyContent: 'center',
    },
    topicTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff',
    },
    topicSubtitle: {
        fontSize: 11,
        color: '#aaa',
    },
});

export default ChatScreen;
