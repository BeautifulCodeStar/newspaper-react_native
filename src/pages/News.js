
import React, {Component} from 'react';
import {
  Dimensions, 
  Platform,
  StyleSheet, 
  View, 
  Image, 
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import NewsNavBar from '../component/NewsNavBar.js';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FlatlistView from './FlatlistView.js';
import { Actions } from 'react-native-router-flux';

popUp = () => {
  Actions.reset('home');
};
export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key:'0', title:'' },
        { key:'1', title:'' },
        { key:'2', title:'' },
        { key:'3', title:'' },
        { key:'4', title:'' },
      ],
      category_ids:[0,1,2,3,4]
    };
  }

  FlatRoute0 = () => (
    <FlatlistView cat_id={this.state.category_ids[0]}/>
  );

  FlatRoute1 = () => (
    <FlatlistView cat_id={this.state.category_ids[1]}/>
  );

  FlatRoute2 = () => (
    <FlatlistView cat_id={this.state.category_ids[2]}/>
  );

  FlatRoute3 = () => (
    <FlatlistView cat_id={this.state.category_ids[3]}/>
  );

  FlatRoute4 = () => (
    <FlatlistView cat_id={this.state.category_ids[4]}/>
  );

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ index: navigation.getParam('tabID') });
    console.log(this.state.index);
    this.retrieveData();
  }

  retrieveData = async () => {
    try{
      var user_id = await AsyncStorage.getItem('user_id');
      if(user_id !== null){
        this.onFetchLoginRecords(user_id);
      }
    } catch (error) {
      console.log("can't retrieveData", error);
    }
  };

  onFetchLoginRecords(id) {
    let url = 'http://newshubnepal.com/apps/loginWithUserId?user_id=' + id;
    fetch(url) 
    .then(response => {
      let data = JSON.parse(response['_bodyText']); 
      let temp_routes=[];
      let countkey = 0;
      data.userinfo.category.map(element=>{
        temp_routes.push({key:countkey, title:element.title});
        countkey++;
      });
      this.setState({ routes: temp_routes });
    })
    .catch((err) => { 
      alert(err); 
    });
  }

  _renderScene = SceneMap({
    '0': this.FlatRoute0,
    '1': this.FlatRoute1,
    '2': this.FlatRoute2,
    '3': this.FlatRoute3,
    '4': this.FlatRoute4,
  });
  
  render() {
    return (
      <View style={styles.container}>
        <NewsNavBar popUp={popUp}/>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width, height:0 }}
        />    
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex:1
  },
});