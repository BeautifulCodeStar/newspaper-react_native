import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  AsyncStorage
} from 'react-native';

import PropTypes, { element } from 'prop-types';
import News from '../pages/News.js';
import { hidden } from 'ansi-colors';

export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag_category: false,
      // category_data:[{id:'social', title:'Social'},{id:'bank', title:'Bank'},{id:'hhhh', title:'HHHH'}]
      category_data:[]
    };
  }
  componentWillMount(){
    this.retrieveData();
  };

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

  async onFetchLoginRecords(id) {
    var url = 'http://newshubnepal.com/apps/loginWithUserId?user_id=' + id;

    fetch(url) 
    .then(response => {
      var data = JSON.parse(response['_bodyText']); 
      this.setState({ category_data: data.userinfo.category });
    })
    .catch((err) => { 
      alert(err); 
    });
  }

  click_category = () =>{
    this.setState({ flag_category: !this.state.flag_category });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header_view}>
          <Image style={styles.back_Img} source={require('../../images/img/image1.jpg')} />
          <Text style={styles.user_fullname}>Jiwan Neupane</Text>
          <Text style={styles.user_name}>Jiwan</Text>
        </View>
        <TouchableOpacity style={styles.view_home} onPress={this.props.click_home}>
          <Image style={styles.home_img} source={require('../../images/icons/home.png')} />
          <Text style={styles.home_text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.view_home} onPress={this.props.click_savednews}>
          <Image style={styles.home_img} source={require('../../images/icons/home.png')} />
          <Text style={styles.home_text}>Saved News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.view_home} onPress={this.click_category}>
          <Image style={styles.category_img} source={require('../../images/icons/category.png')} />
          <Text style={styles.category_text}>Select Category</Text>
          <Image style={this.state.flag_category? styles.more_img_expand : styles.more_img_collapse}
                 source={require('../../images/icons/more.png')}
          />
        </TouchableOpacity>

        <View style={this.state.flag_category? styles.categories_view_expand : styles.categories_view_collapse}>
        {
          this.state.category_data.map(element => {
            return(
              <TouchableOpacity key={element.id} style={styles.view_home} onPress={() => this.props.changeFlag(element.id)}>
                <Image style={styles.category_img} source={require('../../images/icons/category.png')} />
                <Text style={styles.home_text}>{element.title}</Text>
              </TouchableOpacity>
            );
          })
        }
        </View>
      </View>
    );
  }
}
// const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:20,
    backgroundColor: 'white',
  },
  header_view: {
    width:'100%',
    height:'20%',
  },
  back_Img:{
    width:'100%',
    height:'100%'
  },
  user_fullname:{
    marginTop:-40,
    paddingLeft:10,
    color:'white',
  },
  user_name:{
    marginLeft:10,
    marginTop:5,
    color:'white',
  },
  view_home:{
    flexDirection:'row',
    width:'100%',
    height:30,
    alignItems:'center'
  },
  home_img:{
    width:20,
    height:20,
    marginLeft:10
  },
  home_text:{
    marginLeft:10,
  },
  category_img:{
    width:16,
    height:15,
    marginLeft:12
  },
  category_text: {
    marginLeft:12
  },
  more_img_collapse:{
    position:'absolute',
    width:20,
    height:20,
    right:10
  },
  more_img_expand:{
    position:'absolute',
    width:20,
    height:20,
    right:10,
    transform: [{ rotate: '90deg'}]
  },
  categories_view_expand:{
    marginLeft:30
  },
  categories_view_collapse:{
    display:'none'
  }
});