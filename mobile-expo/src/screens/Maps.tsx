import React, { useState, useEffect } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';

import Header from '../components/Header';

const Maps: React.FC = () => {
  const [region, setRegion] = useState<Region>({
    latitude: 32.2833322,
    longitude: -9.2333324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://192.168.1.108:5000/companies');
      setCompanies(result.data);
    };
    fetchData();
  }, [companies]);

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

  return (
    <View style={styles.container}>
      <Header />
      <MapView style={styles.map} region={region}>
        {companies.map(company => (
          <Marker key={company._id} title={company.name} coordinate={{ latitude: company.lat, longitude: company.lon }} />
        ))}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  zoom: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  zoomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center',
    paddingHorizontal: 70,
    marginBottom: 20,
    position: 'absolute',
    bottom: 10,
    width: '100%'
  },
  zoomButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
    width: 80,
    height: 80,
    justifyContent: 'center',
  },
  zoomButtonText: {
    fontSize: 36,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Maps;
