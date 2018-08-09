
import React, {Component} from 'react';
import { Dimensions, Platform, StyleSheet, View, Image,TouchableOpacity, Text, TextInput, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Toast, {DURATION} from 'react-native-easy-toast';
import Loader from '../component/Loader.js';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:'',
      fullname:'',
      address:'',
      contact:'',
      image_url:'',
      image:'',
      fill_image:false,
      loading: false,
      user_id:''
    };
  }

  handle_username = (text) => {
    this.setState({ username: text });
  };
  handle_password = (text) => {
    this.setState({ password:text });
  };
  handle_fullname = (text) => {
    this.setState({ fullname: text });
  };
  handle_address = (text) => {
    this.setState({ address:text });
  };
  handle_contact = (text) => {
    this.setState({ contact: text });
  };

  click_upload = () => {
    this.setState({fill_image: true})
  };

  click_signup = () => {
    
    // if(this.state.fill_image === false) {
    //   this.refs.toast.show('please select voucher image!', 500); 
    // } else {
      if(this.validate()){
        this.setState({loading: true});
        this.onFetchSignupRecords();
      }
    // }
    
  };

  validate = () => {
    if(this.state.username === "" || this.state.password === "" || this.state.fullname === "" || this.state.address === "" || this.state.contact === "" ){
      this.refs.toast.show('please fill all the filds!', 500);
      return false;
    } else {
      return true;
    }
  }

  async onFetchSignupRecords() {
    var data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("fullname", this.state.fullname);
    data.append("address", this.state.address);
    data.append("contact", this.state.contact);
    data.append("image_url", this.state.image_url);
    data.append("image", this.state.image);

    fetch('http://newshubnepal.com/apps/addUser/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/html',
      },
      body: data
    })
    .then(response => {
      this.setState({ loading: false });
      var user_data = JSON.parse(response['_bodyText']); 
      console.log("sdf",user_data);

      if(user_data.is_news_user === 'no'){
        this.refs.toast.show("username is already exist!. Please change your username", 500);
      }
      if(user_data.is_news_user === 'yes'){
        this.storeData(user_data.status.toString());
        this.props.navigation.navigate('category');
      }
    })
    .catch((err) => { 
      alert(err); 
    });
  }
  storeData = async ( id ) => {
    try {
      await AsyncStorage.setItem('user_id',id);
      return true;
    } catch (error) {
      console.log("user_id is not saved", error);
      return false;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo_img}>
          <Image style={styles.logo_icon} source={require('../../images/icons/ic_launcher_foreground.png')} />
        </View>
        <View style={styles.email_div}>
        <TextInput
          style={styles.email_text}
          placeholder={"username / email"}
          onChangeText={this.handle_username}
        />
      </View>
      <View style={styles.data_div}>
        <TextInput
          style={styles.data_text}
          secureTextEntry={true}
          placeholder={"password"}
          onChangeText={this.handle_password}
        />
      </View>
      <View style={styles.data_div}>
      <TextInput
        style={styles.email_text}
        placeholder={"full name"}
        onChangeText={this.handle_fullname}
        />
      </View>
      <View style={styles.data_div}>
        <TextInput
          style={styles.data_text}
          placeholder={"address"}
          onChangeText={this.handle_address}
          />
        </View>
        <View style={styles.data_div}>
          <TextInput
            style={styles.data_text}
            placeholder={"contact"}
            onChangeText={this.handle_contact}
          />
        </View>
        <Image style={this.state.fill_image ? styles.upload_img : {display:'none'}}/>
        <TouchableOpacity style={styles.uploadImg_btn} activeOpacity = { 0.5 } onPress = { this.click_upload }>
          <Text style = { styles.upload_image }>UPLOAD IMAGE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadImg_btn} activeOpacity = { 0.5 } onPress = { this.click_signup }>
          <Text style = { styles.upload_image }>SIGN UP</Text>
        </TouchableOpacity>
        <Toast ref="toast" position='bottom'  fadeInDuration={700} fadeOutDuration={1000} opacity={0.8}/>
        <Loader
          loading={this.state.loading} />
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
  back_but:{
    position:'absolute',
    top:28,
    left:24,
  },
  logo_img: {
    marginTop: 0.1 * height,
    width:0.35 * width,
    height:0.35 * width,
  },
  logo_icon:{
    width: '100%',
    height: '100%'
  },
  email_div: {
    flexDirection:'row',
    marginTop:-5,
    alignItems:'center',
    height:0.05*height,
    width:0.5*width,
    borderBottomWidth:1,
  },
  email_text: {
    width:0.5 * width,
    fontSize:14,
  },
  data_text: {
    width:0.5 * width,
    fontSize:14,
  },
  data_div: {
    flexDirection:'row',
    marginTop:5,
    alignItems:'center',
    height:0.05*height,
    width:0.5*width,
    borderBottomWidth:1,
  },
   uploadImg_btn:{
    justifyContent:'center',
    alignItems:'center',
    height:0.06*height,
    width:0.52*width,
    marginTop:15,
    borderRadius:15,
    backgroundColor:'#3f51b5',
  },
  upload_image: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white'
  },
  upload_img:{
    marginTop:5,
    marginBottom:5,
    width:0.3 * width,
    aspectRatio: 1,
  }

});