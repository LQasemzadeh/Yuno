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
import {
    Ionicons,
    MaterialIcons,
    FontAwesome5,
} from '@expo/vector-icons';

export default function ExploreScreen() {
    const handleIconPress = () => {
        Alert.alert('Change Profile', 'This would open image picker (not implemented).');
    };

    const handleOptionPress = (option: string) => {
        Alert.alert(option, `You selected ${option}`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={handleIconPress} style={styles.profileIconWrapper}>
                    <View style={styles.profileIconContainer}>
                        <FontAwesome5 name="user-circle" size={100} color="#888" />
                        <View style={styles.plusIconWrapper}>
                            <Ionicons name="add-circle" size={20} color="#007bff" />
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.optionsContainer}>
                    <OptionItem icon={<Ionicons name="bookmark-outline" size={24} color="#000" />} label="Saved Messages" onPress={() => handleOptionPress('Saved Messages')} />
                    <OptionItem icon={<MaterialIcons name="folder-open" size={24} color="#000" />} label="Chat Folders" onPress={() => handleOptionPress('Chat Folders')} />
                    <OptionItem icon={<Ionicons name="notifications-outline" size={24} color="#000" />} label="Notifications and Sounds" onPress={() => handleOptionPress('Notifications and Sounds')} />
                    <OptionItem icon={<Ionicons name="lock-closed-outline" size={24} color="#000" />} label="Privacy and Policy" onPress={() => handleOptionPress('Privacy and Policy')} />
                    <OptionItem icon={<Ionicons name="language-outline" size={24} color="#000" />} label="App Language" onPress={() => handleOptionPress('App Language')} />
                    <OptionItem icon={<MaterialIcons name="logout" size={24} color="red" />} label="Log Out" onPress={() => handleOptionPress('Log Out')} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function OptionItem({
                        icon,
                        label,
                        onPress,
                    }: {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
}) {
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
    profileIconWrapper: {
        marginTop: 40,
        marginBottom: 30,
    },
    profileIconContainer: {
        position: 'relative',
    },
    plusIconWrapper: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        backgroundColor: '#fff',
        borderRadius: 12,
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
