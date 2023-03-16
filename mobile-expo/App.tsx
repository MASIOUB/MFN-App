import React from 'react';
import {
  SafeAreaView, StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Maps from './src/screens/Maps';
// import Test from './src/screens/test';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    // <SafeAreaView style={styles.container}>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Maps" component={Maps} options={{headerShown : false}} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  </NavigationContainer>
    // </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
})