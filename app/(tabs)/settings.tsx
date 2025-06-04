import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
    Ionicons,
    MaterialIcons,
} from '@expo/vector-icons';

export default function ExploreScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handlePickImage = async () => {
        if (imageUri) {
            // Image exists: offer to change or remove
            Alert.alert('Profile Image', 'What would you like to do?', [
                {
                    text: 'Change Image',
                    onPress: pickImage,
                },
                {
                    text: 'Remove Image',
                    onPress: () => setImageUri(null),
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]);
        } else {
            // No image: open picker
            pickImage();
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'Please allow access to your photo library.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleOptionPress = (option: string) => {
        Alert.alert(option, `You selected ${option}`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={handlePickImage} style={styles.profileIconWrapper}>
                    <View style={styles.profileIconContainer}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.profileImage} />
                        ) : (
                            <Ionicons name="person-circle-outline" size={100} color="#888" />
                        )}
                        <View style={styles.plusIconWrapper}>
                            <Ionicons name="add-circle" size={20} color="#007bff" />
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.optionsContainer}>
                    <OptionItem icon={<Ionicons name="bookmark-outline" size={24} color="#000" />} label="Saved Messages" onPress={() => handleOptionPress('Saved Messages')} />
                    <OptionItem icon={<Ionicons name="folder-outline" size={24} color="#000" />} label="Chat Folders" onPress={() => handleOptionPress('Chat Folders')} />
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
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
