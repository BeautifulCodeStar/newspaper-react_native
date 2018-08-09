
import React, {Component} from 'react';
import { 
  Dimensions, 
  Platform, 
  StyleSheet, 
  View, 
  Image,
  TouchableOpacity, 
  Text, 
  TextInput,
  ActivityIndicator,
  Linking,
  AsyncStorage
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import Loader from '../component/Loader.js';
import Cookie from 'react-native-cookie';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      loading: false,
      user_data:{},
      socail_url:{
        facebook:'https://www.facebook.com/',
        twitter:'https://www.twitter.com/',
        google:'https://www.google.com/',
        linkedin:'https://www.linkedin.com/'
      },
    };
  }

  handleEmail = (text) => {
    this.setState({ email: text })
  };
  handlePassword = (text) => {
    this.setState({ password: text })
  };
  /////Login
  click_login = () => {
    if(this.state.email === "" || this.state.password ===""){
      this.refs.toast.show('please enter username and password!', 500);
    } else {
      this.setState({ loading: true });
      this.onFetchLoginRecords();
    }
  };
  //data request
  async onFetchLoginRecords() {
    var data = new FormData();
    data.append("username", this.state.email);
    data.append("password", this.state.password);

    fetch('http://newshubnepal.com/apps/checkUser/', {
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

      if(user_data['status']){
        this.refs.toast.show(user_data['status'], 500);
      }
      else{
        this.storeData(user_data.userinfo.id);
        this.props.navigation.navigate('logo');
      }
      
    })
    .catch((err) => { 
      alert(err); 
    });
  }

  storeData = async ( id ) => {
    try {
      await AsyncStorage.setItem('user_id',id);
    } catch (error) {
      console.log("user_id is not saved", error);
    }
  }
  //signup
  click_signup = () => {
    this.props.navigation.navigate('signup');
  };

  social_click = (e) =>{
    var url;
    if(e === 'f') url = this.state.socail_url.facebook;
    if(e === 't') url = this.state.socail_url.twitter;
    if(e === 'g') url = this.state.socail_url.google;
    if(e === 'l') url = this.state.socail_url.linkedin;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      //   Cookie.get(url).then((data) => {
      //     console.log(`get cookie from ${url}: ${JSON.stringify(data)}`);
      //   });
      //   Cookie.set(url, 'foo', 'bar').then(() => {
      //       console.log(`set cookie 'foo=bar' for ${url}`);
      //   });
    
      //   Cookie.clear(url).then(() => {
      //       console.log(`clear all cookie from ${url}`);
      //   });
      } else {
        console.log("Don't know how to open URI: " + url);
      };
    });
  }
  
  render() {
    const animating = this.state.animating;
    return (
      <View style={styles.container}>
        <Loader
          loading={this.state.loading} />
        <View style={styles.logo_img}>
          <Image style={styles.logo_icon} source={require('../../images/icons/ic_launcher_foreground.png')} />
        </View>
        <View style={styles.email_div}>
          <Image style={styles.email_icon} source={require('../../images/icons/mail.png')}/>
          <TextInput
            style={styles.email_text}
            placeholder={"username/email"}
            onChangeText={this.handleEmail}
          />
        </View>
        <View style={styles.password_div}>
          <Image style={styles.password_icon} source={require('../../images/icons/lock.png')}/>
          <TextInput
            style={styles.password_text}
            secureTextEntry={true}
            placeholder={"password"}
            onChangeText={this.handlePassword}
          />
        </View>
        <TouchableOpacity style={styles.login_btn} activeOpacity = { 0.5 } onPress = { this.click_login }>
          <Text style = { styles.log_in }>LOGIN</Text>
        </TouchableOpacity>
        <View style ={styles.bottom_div}>
          <Text style={styles.bottom_text}>Don't have an account?</Text>
          <TouchableOpacity activeOpacity = { 0.5 } onPress = { this.click_signup }>
            <Text style={styles.sign_up}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
        <View style ={styles.social_sites}>
          <TouchableOpacity activeOpacity = { 0.5 } onPress = { () => this.social_click('f') }>
            <Image style={styles.social_icon} source={require('../../images/icons/facebook_.png')}/>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity = { 0.5 } onPress = { () => this.social_click('t') }>
            <Image style={styles.social_icon} source={require('../../images/icons/twitter_.png')}/>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity = { 0.5 } onPress = { () => this.social_click('g') }>
            <Image style={styles.social_icon} source={require('../../images/icons/google.png')}/>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity = { 0.5 } onPress = { () => this.social_click('l') }>
            <Image style={styles.social_icon} source={require('../../images/icons/linkedin.png')}/>
          </TouchableOpacity>
        </View>  
        
        <Toast ref="toast" position='bottom'  fadeInDuration={700} fadeOutDuration={1000} opacity={0.8}/>
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
    marginTop: 0.25 * height,
    width:0.4 * width,
    height:0.4 * width,
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
    width:0.6*width,
    borderBottomWidth:1,
  },
  email_icon: {
    width: 20,
  },
  password_icon: {
    width: 15,
  },
  email_text: {
    marginLeft:10,
    width:0.5 * width,
    fontSize:14,
  },
  password_text: {
    marginLeft:10,
    width:0.57 * width,
    fontSize:14,
  },
  password_div: {
    flexDirection:'row',
    marginTop:10,
    alignItems:'center',
    height:0.05*height,
    width:0.6*width,
    borderBottomWidth:1,
  },
   login_btn:{
    justifyContent:'center',
    alignItems:'center',
    height:0.06*height,
    width:0.65*width,
    marginTop:15,
    borderRadius:15,
    backgroundColor:'#3f51b5',
  },
  log_in: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white'
  },
  bottom_div: {
    marginTop:10,
    flexDirection:'row',

  },
  bottom_text: {
    textAlign:'center',
  },
  sign_up: {
    marginLeft:5,
    color:'#3f51b5',
  },
  social_sites:{
    width:0.7 * width,
    height:0.06 * height,
    marginTop: 5,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red'
  },
  social_icon:{
    height:'100%',
    aspectRatio: 1,
    marginLeft:10,
    marginRight:10
  },
});