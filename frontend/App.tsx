/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView, StyleSheet,
} from 'react-native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Maps from './src/screens/Maps';

function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      {/* <Login /> */}
      {/* <Register /> */}
      <Maps />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
})