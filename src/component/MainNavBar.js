
import React, {Component} from 'react';
import { connect } from 'react-redux';

import ControlPanel from '../component/ControlPanel.js';
import {
  AppRegistry,
  StyleSheet,
  Text, 
  Image,
  View,
  TouchableOpacity, 
  Dimensions,
  AsyncStorage
} from 'react-native';

import Drawer from 'react-native-drawer';
import NavigationBar from 'navigationbar-react-native';
import FlatlistView from "../pages/FlatlistView";
import { showDraw } from '../actions/NavBar';
import { Actions } from 'react-native-router-flux';


class MainNavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flag_logout:false,
      title:['Home', 'Saved News']
    };
  }
  
  isOpenSideBar = () => {
    this.props.showDraw();
  }

  click_rightbtn = () => {
    this.setState({flag_logout:true})
  }

  click_update_category = async () => {
    this.props.navigation.navigate('category');
  }

  click_update_package = async () => {
    Actions.reset('signin');
    await AsyncStorage.clear();
  }

  click_billing = async () => {
    Actions.reset('signin');
    await AsyncStorage.clear();
  }

  click_logout = async () => {
    Actions.reset('signin');
    await AsyncStorage.clear();
  }

  _ComponentLeft = () => {
    return(
      <View style={ styles.left_component } >
        <TouchableOpacity style={ styles.left_button }  onPress={ this.isOpenSideBar }>
          <Image
            source={ require('../../images/icons/menu.png') }
            style={ styles.left_icon }
          />
        </TouchableOpacity>
      </View>
    );
  };

  _ComponentCenter = () => {
    return(
      <View style={ styles.middle_component }>
      {this.props.title === 'home' ?
        <Text style={styles.middle_text}>{this.state.title[0]}</Text>
        :
        <Text style={styles.middle_text}>{this.state.title[1]}</Text>
      }
      </View>
    );
  };

  _ComponentRight = () => {
    return(
      <View style={ styles.right_component }>
        <TouchableOpacity style={ styles.right_button } onPress={this.click_rightbtn}>
          <Image
            source={ require('../../images/icons/main_more.png') }
            style={ styles.right_icon }
          />
        </TouchableOpacity>
        <View style={styles.logout_view}>
          <TouchableOpacity style={this.state.flag_logout? styles.logout_btn : {display:'none'}} onPress={this.click_update_category}>
            <Text style={styles.logout_text}>Update Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.flag_logout? styles.logout_btn : {display:'none'}} onPress={this.click_update_package}>
            <Text style={styles.logout_text}>Update Package</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.flag_logout? styles.logout_btn : {display:'none'}} onPress={this.click_billing}>
            <Text style={styles.logout_text}>Billing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.flag_logout? styles.logout_btn : {display:'none'}} onPress={this.click_logout}>
            <Text style={styles.logout_text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  render() {
    return (
      <NavigationBar
        componentLeft       =     { this._ComponentLeft() }
        componentCenter     =     { this._ComponentCenter() }
        componentRight      =     { this._ComponentRight() }
        navigationBarStyle  =     {{ backgroundColor: '#3f51b5' }}
        statusBarStyle      =     {{ barStyle: 'light-content', backgroundColor: '#3f51b5' }}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    onClickMenu: state.navBar.onClickMenu
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showDraw: () => {
      dispatch(showDraw());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavBar)

const styles = StyleSheet.create({

  left_component:{
    alignItems:'flex-start'
  },

  left_button:{
    height:'100%',
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

  right_component:{
    position:'relative'
  },

  right_button:{
    height:'100%',
    aspectRatio: 1,
  },

  right_icon:{
    aspectRatio:1,
    height:'100%',
  },
  logout_view:{
    position:'absolute',
    justifyContent:'center',
    top:10,
    right:10,
    width: 150,
    backgroundColor:'white',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    borderRadius:3
  },
  logout_btn:{
    width:'100%',
    height:30,
    justifyContent: 'center',   
  },
  logout_text:{
    marginLeft:10
  }
});