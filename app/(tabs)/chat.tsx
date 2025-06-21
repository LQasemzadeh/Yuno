import React, { useState, useRef, useEffect, useMemo } from 'react';
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
    Pressable,
    ScrollView,
    AccessibilityRole,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Topic {
    title: string;
    subtitle: string;
}

interface HistoryItem {
    id: string;
    title: string;
    preview: string;
}

const topics: Topic[] = [
    { title: 'Tell me', subtitle: 'what you can do' },
    { title: 'Help me', subtitle: 'find my class' },
    { title: 'How can I', subtitle: 'connect to PFH WiFi' },
    { title: 'Translate', subtitle: 'the text' },
];

const screenWidth = Dimensions.get('window').width;
const drawerWidth = screenWidth * 0.8;

const ChatScreen: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const drawerAnim = useRef(new Animated.Value(screenWidth)).current;
    const router = useRouter();
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        return () => {
            drawerAnim.setValue(screenWidth);
        };
    }, []);

    const toggleDrawer = () => {
        const toValue = drawerVisible ? screenWidth : screenWidth - drawerWidth;

        Animated.timing(drawerAnim, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            if (drawerVisible) {
                setDrawerVisible(false);
            }
        });

        if (!drawerVisible) {
            setDrawerVisible(true);
        }
    };

    const handleSend = async () => {
        if (!message.trim() || isLoading) return;

        try {
            setIsLoading(true);
            // Implement your message sending logic here
            setMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTopicPress = (topic: Topic) => {
        setMessage(topic.title + ' ' + topic.subtitle);
        inputRef.current?.focus();
    };

    const historyItems = useMemo<HistoryItem[]>(() =>
            Array(20).fill(null).map((_, index) => ({
                id: `history-${index}`,
                title: index % 2 === 0
                    ? 'translate to english: ممنون بابت پیگیری آن را پیدا کردم'
                    : 'correct it: Dear Stefanie, Hope you are great.',
                preview: index % 2 === 0
                    ? 'The correct translation is: **"Thank you for following up..."'
                    : "Here's a corrected version of your message..."
            })),
        []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.replace('/(tabs)')}
                    accessibilityLabel="Go back"
                    accessibilityRole="button"
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>YUNO</Text>
                <TouchableOpacity
                    onPress={toggleDrawer}
                    accessibilityLabel="Toggle history drawer"
                    accessibilityRole="button"
                >
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.chatArea} />

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
                            accessibilityLabel={`${item.title} ${item.subtitle}`}
                            accessibilityRole="button"
                        >
                            <Text style={styles.topicTitle}>{item.title}</Text>
                            <Text style={styles.topicSubtitle}>{item.subtitle}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={styles.inputBar}>
                <TouchableOpacity
                    accessibilityLabel="Add attachment"
                    accessibilityRole="button"
                >
                    <MaterialIcons name="add" size={24} color="gray" />
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
                />
                <TouchableOpacity
                    accessibilityLabel="Voice input"
                    accessibilityRole="button"
                >
                    <Ionicons name="mic" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSend}
                    disabled={!message.trim() || isLoading}
                    accessibilityLabel="Send message"
                    accessibilityRole="button"
                >
                    <Ionicons
                        name="send"
                        size={24}
                        color={message.trim() && !isLoading ? "#007AFF" : "gray"}
                    />
                </TouchableOpacity>
            </View>

            {drawerVisible && (
                <Pressable style={styles.overlay} onPress={toggleDrawer}>
                    <Animated.View style={[styles.drawer, { left: drawerAnim }]}>
                        <View style={styles.drawerHeader}>
                            <Text style={styles.drawerTitle}>
                                Chat history <Text style={styles.historyCount}>(496)</Text>
                            </Text>
                            <TouchableOpacity
                                accessibilityLabel="Clear history"
                                accessibilityRole="button"
                            >
                                <Ionicons name="trash-outline" size={20} color="#888" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.tabRow}>
                            <Text style={[styles.tabItem, styles.activeTab]}>All</Text>
                            <Text style={styles.tabItem}>Starred</Text>
                        </View>

                        <View style={styles.searchBox}>
                            <Ionicons name="search" size={16} color="#888" style={styles.searchIcon} />
                            <TextInput
                                placeholder="Search"
                                style={styles.searchInput}
                                placeholderTextColor="#888"
                            />
                        </View>

                        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={true}>
                            <Text style={styles.earlierLabel}>Earlier</Text>
                            {historyItems.map((item) => (
                                <View key={item.id} style={styles.historyItemBox}>
                                    <Text style={styles.historyTitle}>{item.title}</Text>
                                    <Text style={styles.historyPreview}>{item.preview}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </Animated.View>
                </Pressable>
            )}
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
    chatArea: {
        flex: 1,
    },
    topicContainer: {
        marginBottom: 10,
    },
    topicList: {
        paddingBottom: 6,
        paddingTop: 8,
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
    topicButton: {
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 14,
        marginRight: 8,
        height: 36,
        justifyContent: 'center',
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
        gap: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#000',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    drawer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: drawerWidth,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: -2, height: 0 },
        shadowRadius: 4,
        elevation: 5,
    },
    drawerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    drawerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    historyCount: {
        color: '#888',
    },
    tabRow: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 12,
    },
    tabItem: {
        fontSize: 14,
        color: '#888',
    },
    activeTab: {
        color: '#000',
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        paddingBottom: 2,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 36,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
    scrollArea: {
        marginTop: 16,
    },
    earlierLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 10,
    },
    historyItemBox: {
        marginBottom: 16,
    },
    historyTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111',
    },
    historyPreview: {
        fontSize: 13,
        color: '#777',
        marginTop: 2,
    },
});

export default ChatScreen;