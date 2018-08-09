import React, {Component} from 'react';
import {
  View, 
  StyleSheet, 
  Platform,
  AsyncStorage
} from 'react-native';

import Drawer from 'react-native-drawer';
import ControlPanel from '../component/ControlPanel.js';
import Middleware from './Middleware.js';
import PropTypes from 'prop-types';
import MainNavBar from '../component/MainNavBar';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag_view:'home',
      user_id:'',
      category_data:[],
      item_detail:{}
    };
  }  
  componentWillMount(){
    this.retrieveData();
  };
// //////////////////////////
  retrieveData = async () => {
    try{
      var user_id = await AsyncStorage.getItem('user_id');
      // user_id= 2;
      if(user_id !== null){
        this.onFetchLoginRecords(user_id);
      }
    } catch (error) {
      console.log("can't retrieveData", error);
    }
  };
/////////////////////////
  async onFetchLoginRecords(id) {
    var url = 'http://newshubnepal.com/apps/loginWithUserId?user_id=' + id;

    fetch(url) 
    .then(response => {
      var data = JSON.parse(response['_bodyText']); 
      console.log('---------------',data);
      this.setState({ category_data: data.userinfo.category });
      console.log('===============',this.state.category_data);
    })
    .catch((err) => { 
      alert(err); 
    });
  }
  
/////////////////////////
  
  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };
  changeFlag =(flag)=>{
    var index = 0;

    this.state.category_data.map(element => {  
      if(flag === element.id ) {
        this.props.navigation.navigate( 'news', { 'tabID' : index } );
      }
      index++;
    });
  };

  click_home = () =>{
    this.setState({flag_view:'home'});
  }
  click_savednews = () =>{
    this.setState({flag_view:'savednews'});
    this.props.navigation.navigate('savednews');
  }
  show_newspaper_detail = (item) =>{
    this.setState({item_detail: item}, function(){
      console.log("sdfg", item)
      this.props.navigation.navigate('detail', {'image_info':item});
    });
  }
  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={
          <ControlPanel 
            closeDrawer={this.closeDrawer}
            openDrawer={this.openDrawer} 
            changeFlag={this.changeFlag} 
            click_home={this.click_home}
            click_savednews={this.click_savednews}
          />
        }
        tapToClose={true}
        openDrawerOffset={0.4}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
      >
        <Middleware 
          flag_view={this.state.flag_view} 
          show_newspaper_detail ={(item)=>this.show_newspaper_detail(item)}
          // item_detail = {this.state.item_detail}
        />
      </Drawer>
    )
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    alignItems:'center',
    backgroundColor:'white'
  },

});