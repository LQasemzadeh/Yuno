import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const drawerWidth = screenWidth * 0.75;

interface ChatItem {
    id: string;
    title: string;
    timestamp: number;
}

interface Props {
    onClose: () => void;
}

const HistoryDrawer: React.FC<Props> = ({ onClose }) => {
    const [history, setHistory] = useState<ChatItem[]>([]);

    const loadHistory = async () => {
        try {
            const data = await AsyncStorage.getItem('chat_history');
            const parsed = data ? JSON.parse(data) : [];
            setHistory(parsed);
        } catch (err) {
            console.error('Error loading chat history:', err);
        }
    };

    const deleteChat = async (id: string) => {
        try {
            const filtered = history.filter((item) => item.id !== id);
            setHistory(filtered);
            await AsyncStorage.setItem('chat_history', JSON.stringify(filtered));
        } catch (err) {
            console.error('Error deleting chat:', err);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    return (
        <View style={styles.drawer}>
            <View style={styles.header}>
                <Text style={styles.title}>History</Text>
                <TouchableOpacity onPress={onClose}>
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {history.length === 0 ? (
                <Text style={styles.emptyText}>No chats yet</Text>
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.title}</Text>
                            <TouchableOpacity onPress={() => deleteChat(item.id)}>
                                <MaterialIcons name="delete-outline" size={22} color="#aaa" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    drawer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: drawerWidth,
        backgroundColor: '#111',
        padding: 16,
        zIndex: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1a1a1a',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemText: {
        color: '#fff',
        fontSize: 15,
        flexShrink: 1,
    },
    emptyText: {
        color: '#888',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    },
});

export default HistoryDrawer;
