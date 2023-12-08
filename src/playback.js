import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function Playback({ el }) {
  const [sound, setSound] = React.useState();
  async function playSound() {
    console.log({ uri: `${el}`});
    if (el) {
    
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync({ uri: `${el}`});
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
