
import React, {Component} from 'react';
import { Dimensions, Platform, StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import Home from './Home.js';
import News from './News.js';

export default class Logo extends Component {
  componentDidMount() {
    this.setTimePassed();
  }

  setTimePassed() {
    setTimeout( () => {
      this.props.navigation.navigate('home');
    },600);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo_img}>
          <Image style={styles.logo_icon} source={require('../../images/icons/ic_launcher_foreground.png')} />
        </View>
      </View>
    );
  }
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    alignItems:'center',
    backgroundColor:'white'
  },
  logo_img: {
    marginTop: 0.25 * height,
    width:0.6 * width,
    height:0.6 * width,
  },
  logo_icon:{
    width: '100%',
    height: '100%'
  },

});