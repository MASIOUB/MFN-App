import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Maps = () => {
    const markers = [
        {
            coordinate: {
                latitude: 37.78825,
                longitude: -122.4324,
            },
            title: 'Marker 1',
            description: 'This is marker 1',
        },
        {
            coordinate: {
                latitude: 37.78845,
                longitude: -122.4334,
            },
            title: 'Marker 2',
            description: 'This is marker 2',
        },
    ];

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
        </View>
    )
}

export default Maps

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    map: {
      flex: 1,
    },
  });