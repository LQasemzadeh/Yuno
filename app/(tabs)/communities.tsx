import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';

const mockCommunities = [
    {
        id: '1',
        name: 'International Students Club',
        description: 'Meet students from around the world 🌍',
    },
    {
        id: '2',
        name: 'Tech & Coding Club',
        description: 'Discuss AI, web dev, and more 💻',
    },
    {
        id: '3',
        name: 'German Language Buddies',
        description: 'Practice German with native speakers 🇩🇪',
    },
    {
        id: '4',
        name: 'Business Networking Group',
        description: 'Connect with future professionals 💼',
    },
];

export default function CommunitiesScreen() {
    const renderItem = ({ item }: { item: typeof mockCommunities[0] }) => (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Communities</Text>
            <FlatList
                data={mockCommunities}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#f2f2f2',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
        color: '#000',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});
