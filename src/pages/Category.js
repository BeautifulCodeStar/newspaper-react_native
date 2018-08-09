
import React, {Component} from 'react';
import {
  Dimensions, 
  Platform,
  StyleSheet, 
  View, 
  Image, 
  Text,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native';

import NewsNavBar from '../component/NewsNavBar.js';
import CheckBox from 'react-native-check-box';
import { Actions } from 'react-native-router-flux';
import Toast, {DURATION} from 'react-native-easy-toast';

popUp = () => {
  Actions.reset('home');
};

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray:[],
      user_category:[],
      checkArray:[],
      user_id:'',
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.onFetchAllCategoryRecords();
  }

  onFetchAllCategoryRecords() {
    let url = 'http://newshubnepal.com/apps/newsCategoryJson';
    fetch(url) 
    .then(response => {
      let data = JSON.parse(response['_bodyText']); 
      this.setState({dataArray: data.category});
      console.log("dataArray==========", this.state.dataArray);
      this.retrieveData();
    })
    .catch((err) => { 
      alert(err); 
    });
  }
  ////////
  retrieveData = async () => {
    try{
      var user_ID = await AsyncStorage.getItem('user_id');
      console.log('user_ID',user_ID);
      if(user_ID !== null){
        this.setState({user_id:user_ID});
        this.onFetchUserCategoryRecords(this.state.user_id);
      }
    } catch (error) {
      console.log("can't retrieveData", error);
    }
  };

  onFetchUserCategoryRecords(id) {
    
    var url = 'http://newshubnepal.com/apps/loginWithUserId?user_id=' + id;

    fetch(url) 
    .then(response => {
      var data = JSON.parse(response['_bodyText']); 
      this.setState({ user_category: data.userinfo.category });
      this.makeCheckArray();
    })
    .catch((err) => { 
      alert("sdf",err); 
    });
  }

  makeCheckArray(){
    var temp_flag = [];
    this.state.dataArray.map(data=>{
      var flag = false; 
      if(this.state.user_category.length !== 0) {
        this.state.user_category.map(user_data=>{
          if(data.id === user_data.id) {
            temp_flag.push({key:data.id, title:data.title, checked_flag:true});
            flag = true;
          }
        });
      }
      if(flag === false) temp_flag.push({key:data.id, title:data.title, checked_flag:false});
    });
    this.setState({ checkArray: temp_flag});
  }

  toggle(data, index){
    data.checked_flag = !data.checked_flag;
    var temp = this.state.checkArray;
    temp[index].checked_flag = data.checked_flag;
    this.setState({checkArray:temp});
    
  }

  click_submit = () =>{
    var num = 0;
    var user_choice = '';
    this.state.checkArray.map(data=>{
      if(data.checked_flag == true) {
        user_choice = user_choice + data.key + ",";
        num++;
      }
    });
    if(num > 6){
      this.refs.toast.show("You can only choose maximum 5 categories.", 500);
    } 
    else{
      this.updateCategories(user_choice.slice(0,-1));
    }
  }

  updateCategories(new_categories) {
    var data = new FormData();
    data.append("user_id", this.state.user_id);
    data.append("user_choice", new_categories);

    fetch('http://newshubnepal.com/apps/updateUserchoice/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/html',
      },
      body: data
    })
    .then(response => {
      this.refs.toast.show("User Choice Updated", 500);
      this.props.navigation.navigate('logo');
    })
    .catch((err) => { 
      alert(err); 
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NewsNavBar popUp={popUp}/>
        <ScrollView>
          {this.state.checkArray.map((data, index)=>{
            return(
              <CheckBox
                key={data.key}
                style={{ padding: 5}}
                onClick={()=>this.toggle(data, index)}
                isChecked={data.checked_flag}
                rightText={data.title}
                rightTextStyle={{marginLeft:10}}
                checkedImage={<Image source={require('../../images/icons/cb_enabled.png')} style={{width: 20, aspectRatio:1}}/>}
                unCheckedImage={<Image source={require('../../images/icons/cb_disabled.png')} style={{width: 20, aspectRatio:1}}/>}
              />   
            )
          })}
          <TouchableOpacity style={styles.submit} onPress={this.click_submit}>
            <Text>SUBMIT CATEGORY</Text>
          </TouchableOpacity>
        </ScrollView>
        <Toast ref="toast" position='bottom'  fadeInDuration={700} fadeOutDuration={1000} opacity={0.8}/>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex:1
  },
  submit:{
    height: 35,
    padding:5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d6d7d7'
  },
});