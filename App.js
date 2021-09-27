import React, {useState, useEffect} from 'react';

import {
  Button,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  FlatList,
  SectionList,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ToastAndroid,
  Modal,
} from 'react-native';

const App = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const onPressHandler = () => {
    if (name.length > 3) {
      setSubmitted(!submitted);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <View style={styles.body}>
      <Modal
        animationType="slide"
        hardwareAccelerated
        transparent
        visible={showWarning}
        onRequestClose={() => setShowWarning(false)}>
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            <View style={styles.warning_title}>
              <Text style={styles.text}>WARNING!</Text>
            </View>
            <View style={styles.warning_body}>
              <Text style={styles.text}>
                The name must be longer than 3 characters.
              </Text>
            </View>
            <Pressable
              style={styles.warning_button}
              android_ripple={{color: '#fff'}}
              onPress={() => setShowWarning(false)}>
              <Text style={styles.text}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.text}>Please enter your name:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. John"
        onChangeText={value => setName(value)}
      />
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#dddddd' : '#00ff00',
          },
        ]}
        android_ripple={{color: '#00f'}}>
        <Text style={styles.text}> {submitted ? 'Clear' : 'Submit'}</Text>
      </Pressable>
      {submitted ? (
        <Text style={styles.text}>You are logged in as {name}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: '#FF6B6B',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 20,
  },
  centered_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099',
  },
  warning_title: {
    height: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0',
  },
  warning_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning_button: {
    backgroundColor: '#00ffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default App;
