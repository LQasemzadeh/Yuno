import { View, Text, StyleSheet } from 'react-native';

export default function HomeTab() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏠 YUNO Home</Text>
            <Text style={styles.subtitle}>
                Welcome back! Use the tabs below to explore.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#133b89',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});
