import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const BackgroundImage = require('../assets/back.jpg');

const Register = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [ICE, setICE] = useState('');
    const [password, setPassword] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [markerCoordinates, setMarkerCoordinates] = useState(null);

    const [location, setLocation] = useState(null);

    const [region, setRegion] = useState({
        latitude: 32.2833322,
        longitude: -9.2333324,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('deny');
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLat(location.coords.latitude);
            setLon(location.coords.longitude);
        })();
    }, []);

    const navigation = useNavigation();

    function handlePress() {
        navigation.navigate('Login');
    }

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://192.168.1.108:5000/companies/register', {
                name,
                phone,
                ICE,
                password,
                lat,
                lon,
            });
            console.log(response.data.message);
            navigation.navigate('Login');
        } catch (error) {
            console.log(error.response.data.error);
        }
    };
    const [showMap, setShowMap] = useState(false);

    const handleMapButtonPress = () => {
        setShowMap(true);
    };

    const handleMapClose = () => {
        setShowMap(false);
    };

    console.log(markerCoordinates)
    console.log(location)

    const handleMapPress = (event) => {
        setMarkerCoordinates(event.nativeEvent.coordinate);
    }

    const zoomIn = () => {
        setRegion({
            ...region,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2,
        });
    };

    const zoomOut = () => {
        setRegion({
            ...region,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2,
        });
    };

    useEffect(() => {
        const updateCoordinates = () => {
            if (markerCoordinates) {
                setLat(markerCoordinates.latitude);
                setLon(markerCoordinates.longitude);
            }
        };

        updateCoordinates();
    }, [markerCoordinates]);

    return (
        <ImageBackground source={BackgroundImage} style={styles.background}>
            {/* <ScrollView> */}
            <View style={styles.container}>
                <Text style={styles.title}>Welcome!</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name Of Company..."
                        value={name}
                        onChangeText={setName}
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
                    <TextInput
                        style={styles.input}
                        placeholder="Latitude..."
                        value={markerCoordinates ? markerCoordinates.latitude.toString() : lat.toString()}
                        onChangeText={setLat}
                        placeholderTextColor="#ddd"
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Longitude..."
                        value={markerCoordinates ? markerCoordinates.longitude.toString() : lon.toString()}
                        onChangeText={setLon}
                        placeholderTextColor="#ddd"
                        editable={false}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleMapButtonPress}>
                        <Text style={styles.buttonText}>Change your location</Text>
                    </TouchableOpacity>
                    {showMap && (
                        <View style={styles.mapModal}>
                            <TouchableOpacity onPress={handleMapClose} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                            <MapView style={styles.map} region={region} onPress={handleMapPress} >
                                {markerCoordinates && <Marker coordinate={markerCoordinates} />}
                            </MapView>
                            <View style={styles.zoomButtonsContainer}>
                                <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
                                    <Text style={styles.zoomButtonText}>+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
                                    <Text style={styles.zoomButtonText}>-</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupContainer} onPress={handlePress}>
                        <Text style={styles.signupText}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* </ScrollView> */}
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
    cordinatesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#1abc9c',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
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
    mapModal: {
        position: 'absolute',
        top: -180,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
        height: 600,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#1abc9c',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    map: {
        width: '100%',
        height: '80%',
    },
    zoomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center',
        paddingHorizontal: 70,
        marginBottom: 20,
        position: 'absolute',
        bottom: 70,
        width: '100%'
    },
    zoomButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 4,
        width: 60,
        height: 60,
        justifyContent: 'center',
    },
    zoomButtonText: {
        fontSize: 36,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Register