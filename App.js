import React from 'react';
import { StyleSheet, Text, View, Platform, TextInput, Picker, Button } from 'react-native';

let Log = {
  duration: 0,
  project: '',
  remarks: ''
}

class StatusBar extends React.Component{
  render(){
    return(
      <View style={styles.statusBar} />
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold', fontSize: 25, color: '#fff' }}>Work Logger</Text>
      </View>
    );
  }
};

class Body extends React.Component {
  render() {
    return (
      <View style={styles.body}>
        <NewLogForm />
      </View>
    );
  }
};

class NewLogForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      durationValue: 0,
      projectValue: '',
      remarksValue: ''
    };
  }

  updateDurationValue = (value) => {
    this.setState({ durationValue: value })
  }

  updateProjectValue = (value) => {
    this.setState({ projectValue: value })
  }

  updateRemarksValue = (value) => {
    this.setState({ remarksValue: value })
  }

  addLog = () => {
    if(isNaN(this.state.durationValue)) {
      alert('Duration must be a number.')
    } else if(this.state.projectValue == '') {
      alert('Project must not be blank.')
    } else {
      alert('Duration: ' + this.state.durationValue + 'h\nProject: ' + this.state.projectValue + '\nRemarks: ' + this.state.remarksValue)
    }
  }

  render() {
    return (
      <View>
        <Text>Duration</Text>
        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "In Hours"
            placeholderTextColor = "#D6D6D6"
            onChangeText = {this.updateDurationValue} />

        <Text>Project</Text>
        <Picker itemStyle = {styles.picker}
            selectedValue = {this.state.projectValue}
            onValueChange = {this.updateProjectValue} >
          <Picker.Item label = "Select a Project" value = "" />
          <Picker.Item label = "Hydra" value = "Hydra" />
          <Picker.Item label = "Dragon MY" value = "Dragon MY" />
          <Picker.Item label = "Dragon P2P" value = "Dragon P2P" />
        </Picker>

        <Text>Remarks</Text>
        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Remarks"
            placeholderTextColor = "#D6D6D6"
            onChangeText = {this.updateRemarksValue} />

        <Button
            onPress = {this.addLog}
            title = "Add Log" />
      </View>
    );
  }
};

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Header />
        <Body />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    height: (Platform.OS === 'ios') ? 20 : 0,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  body: {
    margin: 30,
  },
  input: {
    padding: 5,
    height: 40,
    borderColor: '#e2e2e2',
    borderWidth: 1,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    fontSize: 15,
  }
});
