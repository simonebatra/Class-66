import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';
import icon from './assets/coolmonkey.png';

console.log(db["this"].chunks);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={"blue"}
          centerComponent={{
            text: "Monkey-Chunky App",
            style: { fontSize: 22, color: "white" }
          }}
        >
        </Header>

       <Image source={icon}/>

        <TextInput style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
          value={this.state.text} />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
          var word = this.state.text.toLowerCase().trim();
          db[word]
          ?
          (
            this.setState({chunks: db[word].chunks}),
            this.setState({phonicSounds: db[word].phones})
          )
          :
          Alert.alert("Sorry, we couldn't find this word.")
          }}>
          <Text style={styles.buttonText}>Split Word</Text>
        </TouchableOpacity>
        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },

  inputBox: {
    marginTop: 200,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none'
  },

  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },

  icon: {
    width: 150,
    height: 150,
    marginLeft: 100
  }
});


