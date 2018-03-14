import React from 'react';
import { StyleSheet, Text, View, Platform, TextInput, Picker, TouchableHighlight, ScrollView, FlatList, Button } from 'react-native';

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

class WorkLogger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalHours: 0,
      logs: []
    };

    this.handleAddLog = this.handleAddLog.bind(this);
    this.handleDeleteLog = this.handleDeleteLog.bind(this);
  }

  handleAddLog = (durationValue, projectValue, remarksValue) => {
    if(isNaN(durationValue)) {
      alert('Please provide the number of hours spent.')
    } else if(projectValue == '') {
      alert('Please select a project.')
    } else if(remarksValue == '') {
      alert('Please provide remarks.')
    } else {
      let log = {
        duration: durationValue,
        project: projectValue,
        remarks: remarksValue
      }

      this.setState({
        totalHours: this.state.totalHours + Number.parseFloat(durationValue),
        logs: [log, ...this.state.logs]
      })
    }
  }

  handleDeleteLog = (indexValue) => {
    alert(indexValue)
    let array = this.state.logs
    //let splicedArray = array.splice(indexValue, 1)
    this.setState({
      totalHours: this.state.totalHours - Number.parseFloat(array[indexValue].duration),
      logs: array.filter( (item, index) => index !== indexValue)
    })
  }

  render() {
    return (
      <View style={styles.body}>
        <NewLogForm handleAddLog = {this.handleAddLog} />

        <LogsSection
          logs = {this.state.logs}
          totalHours = {this.state.totalHours}
          handleDeleteLog = {this.handleDeleteLog} />

      </View>
    );
  }
};

class NewLogForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      durationValue: '',
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

  render() {
    return (
      <ScrollView style={styles.newLogForm} keyboardShouldPersistTaps="handled" scrollEnabled={false}>
        <Text>Duration</Text>
        <TextInput style = {styles.input}
            keyboardType="numeric"
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

        <TouchableHighlight
            style = {styles.button}
            onPress = {()=>this.props.handleAddLog(this.state.durationValue, this.state.projectValue, this.state.remarksValue)}
            underlayColor = '#fff' >
            <Text style = {styles.buttonText}>Add Log</Text>
        </TouchableHighlight>
      </ScrollView>
      
    );
  }
};

class LogsSection extends React.Component {
  
  render() {
    let logArray = this.props.logs
    return (
      <View style = {styles.logSection}>
        <Text style={{fontSize: 25}}>Logs</Text>
        <Text>Total log for the day: {this.props.totalHours} hours</Text>
        <FlatList
            style = {styles.list}
            data = {this.props.logs}
            keyExtractor = {(item, index) => index}
            renderItem = {({ item, index }) => 
              <View style={styles.item}>
                <View style={{flexDirection: 'row', flexWrap:'wrap', marginLeft: 10}}>
                  <Text style={{fontSize: 18}}>{item.duration}h - {item.project}</Text>
                  <TouchableHighlight
                      style = {{marginTop: 3}}
                      onPress = {()=>this.props.handleDeleteLog(index)}
                      underlayColor = '#fff' >
                      <Text style={{color: 'red'}}>  [ Delete ]</Text>
                  </TouchableHighlight>
                </View>
                <Text style={{marginLeft: 10}}>{item.remarks}</Text>
              </View>
            }
        />
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
        <WorkLogger />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
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
    marginTop: 10,
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
  },
  button:{
    marginTop: 10,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: 'powderblue',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText:{
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  newLogForm: {
    marginLeft: 30,
    marginRight: 30,
  },
  logSection: {
    marginTop: 10,
    borderTopWidth: 2,
    borderColor: '#e2e2e2',
  },
  list: {
  },
  item: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 5
  },
});
