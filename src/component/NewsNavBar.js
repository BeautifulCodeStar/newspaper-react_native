
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import NavigationBar from 'navigationbar-react-native';

export default class NewsNavBar extends Component {
  constructor() {
    super();
    this.state = {
      onClickMenu: false,
    }
  }

  _ComponentLeft = () => {
   
    return(
      <View style={styles.left_component} >
        <TouchableOpacity style={styles.left_button} onPress={this.props.popUp}>
          <Image
            source={require('../../images/icons/back.png')}
            style={styles.left_icon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  _ComponentCenter = () => {
    return(
      <View style={styles.middle_component}>
        <Text style={styles.middle_text}>New Hub Nepal</Text>
      </View>
    );
  };

  render() {
    return (
      <NavigationBar
        componentLeft     =     {this._ComponentLeft()}
        componentCenter   =     {this._ComponentCenter()}
        navigationBarStyle=     {{ backgroundColor: '#3f51b5' }}
        statusBarStyle    =     {{ barStyle: 'light-content', backgroundColor: '#3f51b5' }}
      />
    );
  }
}

const styles = StyleSheet.create({
  left_component:{
    alignItems:'flex-start'
  },
  left_button:{
    marginLeft:10,
    height:'50%',
    aspectRatio: 1,
  },
  left_icon:{
    aspectRatio:1,
    height:'100%',
  },
  middle_component:{
    flex:1,
    marginLeft:15,
    justifyContent:'center'
  },
  middle_text:{
    fontSize:20,
    color:'white'
  },
  
});