import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Linking,
    Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import {
    Ionicons,
    FontAwesome5,
    MaterialIcons,
} from '@expo/vector-icons';

const IndexScreen = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const monthName = today.toLocaleString('en-US', { month: 'long' });
    const weekdayName = today.toLocaleString('en-US', { weekday: 'long' });
    const outlookURL = `https://outlook.office.com/calendar/view/day?date=${year}-${month}-${day}`;

    const topicData = [
        { label: 'International Office', icon: <FontAwesome5 name="globe" size={24} color="#133b89" /> },
        { label: 'Career Services', icon: <MaterialIcons name="work" size={24} color="#133b89" /> },
        { label: 'IT Services', icon: <MaterialIcons name="computer" size={24} color="#133b89" /> },
        { label: "Registrar's Office", icon: <MaterialIcons name="description" size={24} color="#133b89" /> },
        { label: 'Admissions Office', icon: <FontAwesome5 name="user-graduate" size={24} color="#133b89" /> },
        { label: 'University Admin', icon: <FontAwesome5 name="university" size={24} color="#133b89" /> },
        { label: 'Library', icon: <FontAwesome5 name="book" size={24} color="#133b89" /> },
        { label: 'Secretary', icon: <Ionicons name="person" size={24} color="#133b89" /> },
        { label: 'Finance', icon: <FontAwesome5 name="money-bill" size={24} color="#133b89" /> },
        { label: 'Laboratories', icon: <FontAwesome5 name="flask" size={24} color="#133b89" /> },
    ];

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleProfilePress = () => {
        Alert.alert(
            "Profile Picture",
            "Choose an option",
            [
                { text: "Change Photo", onPress: pickImage },
                { text: "Remove Photo", onPress: () => setProfileImage(null) },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.userRow}>
                    <TouchableOpacity onPress={handleProfilePress} style={styles.profileImageContainer}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.profilePlaceholder}>
                                <Ionicons name="person" size={28} color="#888" />
                            </View>
                        )}
                        <View style={styles.addIcon}>
                            <Ionicons name="add-circle" size={18} color="#007bff" />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.title}>Hi Ladan!</Text>
                        <Text style={styles.subtitle}>Welcome to your AI Chat Bot!</Text>
                    </View>
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

                <TouchableOpacity style={styles.iosCalendarCard} onPress={() => Linking.openURL(outlookURL)}>
                    <View style={styles.calendarHeader}>
                        <Text style={styles.calendarMonth}>{monthName}</Text>
                    </View>
                    <View style={styles.calendarBody}>
                        <Text style={styles.calendarDayNumber}>{day}</Text>
                        <Text style={styles.calendarWeekday}>{weekdayName}</Text>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
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
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    languageIcon: {
        padding: 8,
    },
    title: {
        fontSize: 22, // reduced size
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 14, // reduced size
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
    iosCalendarCard: {
        width: '45%',
        borderRadius: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 3,
        position: 'relative',
    },
    calendarHeader: {
        backgroundColor: '#f59e0b',
        paddingVertical: 8,
        alignItems: 'center',
    },
    calendarMonth: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    calendarBody: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    calendarDayNumber: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#111',
    },
    calendarWeekday: {
        fontSize: 18,
        color: '#f59e0b',
        fontWeight: '500',
    },
    chevron: {
        position: 'absolute',
        bottom: 10,
        right: 12,
        fontSize: 22,
        color: '#999',
    },
    chatButton: {
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: '#133b89',
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
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#133b89',
    },
    topicLabel: {
        marginTop: 6,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    profileImageContainer: {
        marginRight: 12,
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    profilePlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIcon: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
});
