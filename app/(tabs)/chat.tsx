import React, { useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const topics = [
    { title: 'Tell me', subtitle: 'what you can do' },
    { title: 'Help me', subtitle: 'find my class' },
    { title: 'How can I', subtitle: 'connect to PFH WiFi' },
    { title: 'Translate', subtitle: 'the text' },
];

export default function ChatScreen() {
    const navigation = useNavigation();
    const router = useRouter();

    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarStyle: { display: 'none' },
            headerShown: false,
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={80}
            >
                {/* Header */}
                <View style={styles.header}>
                    <FontAwesome5 name="robot" size={22} color="#333" style={{ marginRight: 8 }} />
                    <Text style={styles.headerText}>YUNO</Text>
                    <Ionicons name="grid-outline" size={24} color="#333" style={{ marginLeft: 'auto' }} />
                </View>

                <View style={{ flex: 1 }} />

                {/* Topic buttons - now right above input */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.topicScroll}
                >
                    {topics.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.topicButton}>
                            <Text style={styles.topicTitle}>{item.title}</Text>
                            <Text style={styles.topicSubtitle}>{item.subtitle}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Input */}
                <View style={styles.inputWrapper}>
                    <TouchableOpacity style={styles.circleButton}>
                        <Text style={styles.plusText}>+</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Ask YUNO"
                        placeholderTextColor="#777"
                    />

                    <TouchableOpacity>
                        <Ionicons name="mic-outline" size={22} color="#333" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    topicScroll: {
        paddingVertical: 8,
    },
    topicButton: {
        backgroundColor: '#f2f2f2',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
        height: 50,
    },
    topicTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111',
        textAlign: 'center',
        lineHeight: 16,
    },
    topicSubtitle: {
        fontSize: 11,
        color: '#666',
        textAlign: 'center',
        lineHeight: 14,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        borderTopWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 10,
    },
    circleButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    plusText: {
        fontSize: 20,
        color: '#555',
    },
    input: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        color: '#000',
        marginRight: 10,
    },
});
