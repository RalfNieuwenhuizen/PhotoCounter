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
  CameraRoll,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import RNPhotosFramework from 'react-native-photos-framework';

export default class PhotoCounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraRoll: null,
      assets: null,
      show: null,
    }
  }

  componentDidMount() {
    this.getPhotos();
    this.getAssets();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          You have {this.state.cameraRoll ? this.state.cameraRoll.edges.length : "..."} photos in your CameraRoll, according to React Native CameraRoll
        </Text>
        <Text style={styles.instructions}>
          You have {this.state.assets ? this.state.assets.length : "..."} photos, according to react-native-photos-framework
        </Text>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <TouchableOpacity onPress={() => this.setState({show: "cameraroll"})} style={[styles.button, this.state.show === "cameraroll" && styles.activeButton]}>
            <Text>CameraRoll</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({show: "photos"})} style={[styles.button, this.state.show === "photos" && styles.activeButton]}>
            <Text>photos-framework</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({show: null})} style={[styles.button, this.state.show === null && styles.activeButton]}>
            <Text>Hide</Text>
          </TouchableOpacity>
        </View>
        {this.state.show === "cameraroll" 
          ? this.renderPhotos() 
          : this.state.show === "photos" 
            ? this.renderAssets() 
            : null
        }
      </View>
    );
  }
  
  renderPhotos() {
    return (
      <View>
        <Text style={styles.instructions}>
          Showing all photos from react-native CameraRoll below:
        </Text>
        <ScrollView style={{flex:1}} removeClippedSubviews>
          <View style={{flexWrap: "wrap", flexDirection:"row", flex:1, overflow: "hidden"}}>
            {this.state.cameraRoll && this.state.cameraRoll.edges.map(({node}, index) => {
              console.log(node)
              return <Image key={index} source={node.image} style={{width: 50, height:50}} />
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
    
  renderAssets() {
    return (
      <View>
        <Text style={styles.instructions}>
          Showing all photos from react-native-photos-framework below:
        </Text>
        <ScrollView style={{flex:1}} removeClippedSubviews>
          <View style={{flexWrap: "wrap", flexDirection:"row", flex:1, overflow: "hidden"}}>
            {this.state.assets && this.state.assets.map((asset) => {
              console.log(asset)
              return <Image key={asset.localIdentifier} source={asset.image} style={{width: 50, height:50}} />
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  async getPhotos() {
    const cameraRoll = await CameraRoll.getPhotos({
      first: 1000000
    });
    this.setState({ cameraRoll });
  }

  async getAssets() {
      const photos = await RNPhotosFramework.getAssets({
        //Example props below. Many optional.
        // You can call this function multiple times providing startIndex and endIndex as
        // pagination.
        startIndex: 0,
        endIndex: 1000000,
    
        fetchOptions : {
          // Media types you wish to display. See table below for possible options. Where
          // is the image located? See table below for possible options.
          mediaTypes: ['image'],
          sourceTypes: ['userLibrary', 'cloudShared', 'itunesSynced'],
    
          sortDescriptors : [
            {
              key: 'creationDate',
              ascending: false,
            }
          ]
        },
        includeMetadata: true,
      });
      this.setState({assets: photos.assets});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 25,
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
  button: {
    padding: 20
  },
  activeButton: {
    backgroundColor: "#FFC107"
  }
});
