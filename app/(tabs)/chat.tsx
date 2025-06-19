import React, { useState, useRef } from 'react';
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
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const topics = [
    { title: 'Tell me', subtitle: 'what you can do' },
    { title: 'Help me', subtitle: 'find my class' },
    { title: 'How can I', subtitle: 'connect to PFH WiFi' },
    { title: 'Translate', subtitle: 'the text' },
];

const screenWidth = Dimensions.get('window').width;
const drawerWidth = screenWidth * 0.8;

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const drawerAnim = useRef(new Animated.Value(screenWidth)).current;
    const router = useRouter();

    const toggleDrawer = () => {
        if (drawerVisible) {
            Animated.timing(drawerAnim, {
                toValue: screenWidth,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setDrawerVisible(false));
        } else {
            setDrawerVisible(true);
            Animated.timing(drawerAnim, {
                toValue: screenWidth - drawerWidth,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

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
                <TouchableOpacity onPress={toggleDrawer}>
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
            </View>

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

            {/* Right Side Drawer */}
            {drawerVisible && (
                <Pressable style={styles.overlay} onPress={toggleDrawer}>
                    <Animated.View style={[styles.drawer, { left: drawerAnim }]}>
                        {/* Drawer Header */}
                        <View style={styles.drawerHeader}>
                            <Text style={styles.drawerTitle}>
                                Chat history <Text style={{ color: '#888' }}>(496)</Text>
                            </Text>
                            <TouchableOpacity>
                                <Ionicons name="trash-outline" size={20} color="#888" />
                            </TouchableOpacity>
                        </View>

                        {/* Tabs */}
                        <View style={styles.tabRow}>
                            <Text style={[styles.tabItem, styles.activeTab]}>All</Text>
                            <Text style={styles.tabItem}>Starred</Text>
                        </View>

                        {/* Search */}
                        <View style={styles.searchBox}>
                            <Ionicons name="search" size={16} color="#888" style={{ marginRight: 8 }} />
                            <TextInput
                                placeholder="Search"
                                style={styles.searchInput}
                                placeholderTextColor="#888"
                            />
                        </View>

                        {/* Scrollable List */}
                        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={true}>
                            <Text style={styles.earlierLabel}>Earlier</Text>
                            {Array.from({ length: 20 }).map((_, index) => (
                                <View key={index} style={styles.historyItemBox}>
                                    <Text style={styles.historyTitle}>
                                        {index % 2 === 0
                                            ? 'translate to english: ممنون بابت پیگیری آن را پیدا کردم'
                                            : 'correct it: Dear Stefanie, Hope you are great.'}
                                    </Text>
                                    <Text style={styles.historyPreview}>
                                        {index % 2 === 0
                                            ? 'The correct translation is: **"Thank you for following up..."'
                                            : "Here's a corrected version of your message..."}
                                    </Text>
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
        paddingBottom: 6,
    },
    topicButton: {
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        paddingVertical: 4,
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
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
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
