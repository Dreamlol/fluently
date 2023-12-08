import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function Voice() {
  const speak = () => {
    const thingToSay = 'Земля́ — третья по удалённости от Солнца планета Солнечной системы. Самая плотная, пятая по диаметру и массе среди всех планет Солнечной системы и крупнейшая среди планет земной группы, в которую входят также Меркурий, Венера и Марс. ';
    //const thingToSay = 'Мова — це найважливіший засіб спілкування і пізнання.'
    Speech.speak(thingToSay, {
      language: 'ru-RU',
      pitch: 1,
      rate: 1,
     // voice: "uk-UA-Wavenet-A",
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Press to hear some words" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
