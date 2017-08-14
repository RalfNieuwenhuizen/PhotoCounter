/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  CameraRoll
} from 'react-native';

export default class PhotoCounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraRoll: null,
    }
  }

  componentDidMount() {
    this.getPhotos();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          You have {this.state.cameraRoll ? this.state.cameraRoll.edges.length : "..."} photos in your CameraRoll
        </Text>
      </View>
    );
  }

  async getPhotos() {
    const cameraRoll = await CameraRoll.getPhotos({
      first: 1000000
    });
    console.log(cameraRoll);
    this.setState({ cameraRoll });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
