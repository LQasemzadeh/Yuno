import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExploreScreen() {
    const handleLogout = () => {
        Alert.alert('Log Out', 'Do you really want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Log Out',
                style: 'destructive',
                onPress: async () => {
                    await AsyncStorage.clear();
                    router.replace('/');
                },
            },
        ]);
    };

    const handleOptionPress = (option: string) => {
        if (option === 'Log Out') {
            handleLogout();
        } else {
            Alert.alert(option, `You selected ${option}`);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.optionsContainer}>
                    <OptionItem
                        icon={<Ionicons name="bookmark-outline" size={24} color="#000" />}
                        label="Saved Messages"
                        onPress={() => handleOptionPress('Saved Messages')}
                    />
                    <OptionItem
                        icon={<Ionicons name="folder-outline" size={24} color="#000" />}
                        label="Chat Folders"
                        onPress={() => handleOptionPress('Chat Folders')}
                    />
                    <OptionItem
                        icon={<Ionicons name="notifications-outline" size={24} color="#000" />}
                        label="Notifications and Sounds"
                        onPress={() => handleOptionPress('Notifications and Sounds')}
                    />
                    <OptionItem
                        icon={<Ionicons name="lock-closed-outline" size={24} color="#000" />}
                        label="Privacy and Policy"
                        onPress={() => handleOptionPress('Privacy and Policy')}
                    />
                    <OptionItem
                        icon={<Ionicons name="language-outline" size={24} color="#000" />}
                        label="App Language"
                        onPress={() => handleOptionPress('App Language')}
                    />
                    <OptionItem
                        icon={<MaterialIcons name="logout" size={24} color="red" />}
                        label="Log Out"
                        onPress={() => handleOptionPress('Log Out')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

interface OptionItemProps {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
}

function OptionItem({ icon, label, onPress }: OptionItemProps) {
    return (
        <TouchableOpacity style={styles.optionItem} onPress={onPress}>
            {icon}
            <Text style={styles.optionLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    optionsContainer: {
        width: '90%',
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    optionLabel: {
        marginLeft: 15,
        fontSize: 16,
    },
});
