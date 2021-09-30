import React, {useState, useEffect} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('userData').then(value => {
        if (value != null) {
          navigation.navigate('Home');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (name.length != 0 && age.length != 0) {
      try {
        let user = {
          name,
          age,
        };
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Warning!', 'Please fill out all fields.');
    }
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../../assets/asyncS_logo.png')}
      />
      <Text style={styles.text}>Async Storage</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => setName(value)}
        placeholder={'Enter your name'}
      />

      <TextInput
        style={styles.input}
        onChangeText={value => setAge(value)}
        placeholder={'Enter your age'}
      />
      <CustomButton onPressFunction={setData} title="Login" color="#1eb900" />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    height: 100,
    width: 100,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 100,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
});
