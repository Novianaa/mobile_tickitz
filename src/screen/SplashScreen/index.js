import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function SpalshScreen(props) {
  useEffect(() => {
    const token = false;
    setTimeout(() => {
      if (token) {
        props.navigation.navigate('AppScreen');
      } else {
        props.navigation.navigate('AuthScreen');
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/image/Tickitz-white.png')} style={styles.logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5F2EEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 60,
    width: 250,

  }
});

export default SpalshScreen;
