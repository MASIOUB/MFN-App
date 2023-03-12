import { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';

// import BackgroundImage from '../assets/back.jpg';
const BackgroundImage = require('../assets/back.jpg');

const Register = () => {
    const [name, setName] = useState('');
    const [activity, setActivity] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [ICE, setICE] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        // TODO: Handle login logic here
    };

    return (
        <ImageBackground source={BackgroundImage} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome!</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name..."
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#ddd"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Activity..."
                        value={activity}
                        onChangeText={setActivity}
                        placeholderTextColor="#ddd"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone..."
                        value={phone}
                        onChangeText={setPhone}
                        placeholderTextColor="#ddd"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address..."
                        value={address}
                        onChangeText={setAddress}
                        placeholderTextColor="#ddd"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="city..."
                        value={city}
                        onChangeText={setCity}
                        placeholderTextColor="#ddd"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="ICE..."
                        value={ICE}
                        onChangeText={setICE}
                        placeholderTextColor="#ddd"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password..."
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#ddd"
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupContainer}>
                        <Text style={styles.signupText}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        maxWidth: 350,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        color: '#333',
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#fff',
    },
    button: {
        backgroundColor: '#1abc9c',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    signupContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    signupText: {
        color: '#fff',
    },
});

export default Register