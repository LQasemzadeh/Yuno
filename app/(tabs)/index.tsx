import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from 'expo-router';
import {
    Ionicons,
    FontAwesome5,
    MaterialIcons,
    Entypo,
} from '@expo/vector-icons';

const IndexScreen = () => {
    const navigation = useNavigation();

    const topicData = [
        { label: 'Library', icon: <FontAwesome5 name="book" size={24} color="#333" /> },
        { label: 'Secretary', icon: <Ionicons name="person" size={24} color="#333" /> },
        { label: 'Finance', icon: <FontAwesome5 name="money-bill" size={24} color="#333" /> },
        { label: 'Support', icon: <Entypo name="hand" size={24} color="#333" /> },
        { label: 'Laboratories', icon: <FontAwesome5 name="flask" size={24} color="#333" /> },
        { label: 'International Office', icon: <FontAwesome5 name="globe" size={24} color="#333" /> },
        { label: 'Career Services', icon: <MaterialIcons name="work" size={24} color="#333" /> },
        { label: 'IT Services', icon: <MaterialIcons name="computer" size={24} color="#333" /> },
        { label: "Registrar's Office", icon: <MaterialIcons name="description" size={24} color="#333" /> },
        { label: 'Admissions Office', icon: <FontAwesome5 name="user-graduate" size={24} color="#333" /> },
        { label: 'University Admin', icon: <FontAwesome5 name="university" size={24} color="#333" /> },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Hi Ladan!</Text>
                    <Text style={styles.subtitle}>Welcome to your AI Chat Bot!</Text>
                </View>
                <TouchableOpacity style={styles.languageIcon}>
                    <Ionicons name="language" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.swiperContainer}>
                <Swiper
                    autoplay
                    autoplayTimeout={3}
                    showsPagination
                    dotStyle={styles.dot}
                    activeDotStyle={styles.activeDot}
                >
                    <Image source={require('@/app/assets/banner02.png')} style={styles.bannerImage} resizeMode="cover" />
                    <Image source={require('@/app/assets/banner01.jpg')} style={styles.bannerImage} resizeMode="cover" />
                    <Image source={require('@/app/assets/banner03.jpg')} style={styles.bannerImage} resizeMode="cover" />
                    <Image source={require('@/app/assets/banner06.jpg')} style={styles.bannerImage} resizeMode="cover" />
                </Swiper>
            </View>

            <View style={styles.cardRow}>
                <View style={styles.card}>
                    <Ionicons name="map" size={32} color="#333" />
                    <Text style={styles.cardLabel}>Map</Text>
                </View>
                <View style={styles.card}>
                    <Ionicons name="calendar" size={32} color="#333" />
                    <Text style={styles.cardLabel}>Calendar</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.chatButton}
                onPress={() => navigation.navigate('chat' as never)}
            >
                <Text style={styles.chatButtonText}>Get Start New Chat</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Topics</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.topicRow}
            >
                {topicData.map((item, index) => (
                    <View key={index} style={styles.topicCard}>
                        {item.icon}
                        <Text style={styles.topicLabel}>{item.label}</Text>
                    </View>
                ))}
            </ScrollView>
        </ScrollView>
    );
};

export default IndexScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 50,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    languageIcon: {
        padding: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
    },
    swiperContainer: {
        height: 180,
        marginTop: 20,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    dot: {
        backgroundColor: '#ccc',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#f5c242',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    card: {
        width: '45%',
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        paddingVertical: 20,
        alignItems: 'center',
    },
    cardLabel: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    chatButton: {
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: '#2563eb',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    chatButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10,
        color: '#1a1a1a',
    },
    topicRow: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingBottom: 30,
    },
    topicCard: {
        width: 90,
        height: 90,
        backgroundColor: '#e5e5e5',
        borderRadius: 12,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topicLabel: {
        marginTop: 6,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 4,
    },
});
