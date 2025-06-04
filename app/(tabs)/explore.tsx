import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ExploreScreen() {
    const handleIconPress = () => {
        Alert.alert('Change Profile', 'This would open image picker (not implemented).');
    };

    const handleOptionPress = (option: string) => {
        Alert.alert(option, `You selected ${option}`);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleIconPress} style={styles.profileIconWrapper}>
                <FontAwesome5 name="user-circle" size={100} color="#888" />
            </TouchableOpacity>

            <View style={styles.optionsContainer}>
                <OptionItem icon={<Ionicons name="bookmark-outline" size={24} color="#000" />} label="Saved Messages" onPress={() => handleOptionPress('Saved Messages')} />
                <OptionItem icon={<MaterialIcons name="folder-open" size={24} color="#000" />} label="Chat Folders" onPress={() => handleOptionPress('Chat Folders')} />
                <OptionItem icon={<Ionicons name="notifications-outline" size={24} color="#000" />} label="Notifications and Sounds" onPress={() => handleOptionPress('Notifications')} />
                <OptionItem icon={<Ionicons name="lock-closed-outline" size={24} color="#000" />} label="Privacy and Policy" onPress={() => handleOptionPress('Privacy and Policy')} />
                <OptionItem icon={<Ionicons name="language-outline" size={24} color="#000" />} label="App Language" onPress={() => handleOptionPress('App Language')} />
                <OptionItem icon={<MaterialIcons name="logout" size={24} color="red" />} label="Log Out" onPress={() => handleOptionPress('Log Out')} />
            </View>
        </View>
    );
}

function OptionItem({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) {
    return (
        <TouchableOpacity style={styles.optionItem} onPress={onPress}>
            {icon}
            <Text style={styles.optionLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    profileIconWrapper: {
        marginTop: 50,
        marginBottom: 30,
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
