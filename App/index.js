// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
    const [recipient, setRecipient] = useState('');
    const [occasion, setOccasion] = useState('');
    const [style, setStyle] = useState('');
    const [greeting, setGreeting] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchGreeting = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://dev.192.168.1.107.nip.io:3300/chatgpt', {
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a helpful assistant. Please provide answers for given requests."
                    },
                    {
                        "role": "user",
                        "content": `Create a greeting for ${recipient} on the occasion of ${occasion} in a ${style} style.`
                    }
                ],
                "model": "gpt-4o"
            });
            const resultString = response.data.response;
            setGreeting(resultString);
        } catch (error) {
            console.error("Error fetching greeting:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create a Greeting</Text>
            <TextInput
                style={styles.input}
                placeholder="Recipient"
                value={recipient}
                onChangeText={setRecipient}
            />
            <TextInput
                style={styles.input}
                placeholder="Occasion"
                value={occasion}
                onChangeText={setOccasion}
            />
            <TextInput
                style={styles.input}
                placeholder="Style"
                value={style}
                onChangeText={setStyle}
            />
            <Button title="Generate Greeting" onPress={fetchGreeting} />
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {greeting ? (
                <View style={styles.box}>
                    <Text style={styles.greeting}>{greeting}</Text>
                </View>
            ) : (
                !isLoading && <Text style={styles.noGreeting}>Your greeting will appear here.</Text>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        padding: 10,
        borderRadius: 10,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
    },
    box: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginTop: 20,
    },
    greeting: {
        fontSize: 16,
    },
    noGreeting: {
        marginTop: 20,
        fontStyle: 'italic',
        color: '#AAAAAA',
    },
});