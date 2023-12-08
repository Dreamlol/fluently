import React, {useState} from 'react'
import OpenAI from "openai";
import axios from 'axios';
import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Button, Image, Modal, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import './src/audio_params';
import Playback from './src/playback';
import Voice from './src/voice';

process.env['OPENAI_API_KEY'] = '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';

const openai = new OpenAI();

 export default function App() {


  const [uri, setUri] = useState({});

  const [recording, setRecording] = useState();

  const [bColor, setBorderColor] = useState("lightgray");

  const [modalVisible, setModalVisible] = useState(false);

  const text_ai_getting = async () => {

    const url = "https://api.openai.com/v1/audio/transcriptions";

    console.log('Text AI is getting...');

    const headers = {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'multipart/form-data',
    };

    const formData = new FormData();
    formData.append('file', {
      uri: uri.file,
      name: uri.file.split('/').pop(),
      type: 'audio/m4a', // Change to the desired audio format
    });
    formData.append('model', 'whisper-1');

    axios.post(url, formData, { headers })
      .then(response => {
        console.log('Transcription response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  };

  const open_test = async () => {
    try {

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });
    
    console.log(response.choices[0]);
    
    } catch (err) {
     console.error('Error calling OpenAI API:', err.message);
    }
  }

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(audio_preset);
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
  
  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    setUri({ file: recording.getURI()});
    console.log('Recording stopped and stored at', uri.file);
  }

  //REACT NATIVE

  return (
    <View style={styles.container}>

      <Text style={styles.message}>Message:</Text>
      
      <Pressable 
      onPress={() => setBorderColor('lightblue')}
      onPressOut={() => setBorderColor('lightgray')}
      style={[styles.pressable, {borderColor: bColor }]}
      > 
       
        <Text style={styles.message} 
        onPress={recording ? stopRecording : startRecording}>
           {recording ? 'Stop Recording' : 'Start Recording'}
        </Text>

      </Pressable>
      <Playback el = {uri.file}/>
      <Voice/>
    

      <Button
        title="Checking"
        onPress={() => {text_ai_getting()}}
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <Image
              source={require('./assets/fox-png-2.png')}
            />
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   pressable: {
    width: '90%',
    padding: 30,
    gap: 10,
    borderWidth: 3,
    alignItems: 'center',
    borderRadius: 10,
  },
  message: {
    fontSize: 24,
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});