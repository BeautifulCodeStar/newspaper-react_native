
import React, {Component} from 'react';
import { Dimensions, Platform, StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { Actions } from 'react-native-router-flux';
import SingleImageZoomViewer from 'react-native-single-image-zoom-viewer'

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail_data:[],
   
    
      image_uri:''
    };
  }
  componentDidMount(){
    const { navigation } = this.props;
    this.setState({ detail_data: navigation.getParam('image_info') }, function(){
      this.setState({ image_uri: navigation.getParam('image_info').images[0].image_url })
  
    });
  }
  close_btn =() =>{
    conole.log("pop up")
    Actions.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header_view}>
          <View style={styles.logo_image_view}>
            <Image style={styles.logo_image} source={{uri:this.state.detail_data.source}}/>
          </View>
          <View style={styles.date_group}>
            <Text style={styles.date}>{this.state.detail_data.date}</Text>
            <Text style={styles.group}>{this.state.detail_data.category}</Text>
          </View>
          <View style={styles.close_view}>
            <TouchableOpacity style={styles.close_btn}>
              <Image style={styles.close_icon} source={require('../../images/icons/close.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        {/* <ScrollView>
          <ImageZoom 
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').height}
            enableSwipeDown={true}
          >
            <Image 
              enableHorizontalBounce={true}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
              }}
              source={{uri:this.state.image_uri}}
            />
          </ImageZoom>
        </ScrollView> */}
        <SingleImageZoomViewer source={{uri:this.state.image_uri}} width={200} height={200}/>
        <Image style={styles.like_icon} source={require('../../images/icons/unlike.png')} />
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
    backgroundColor:'black'
  },
  header_view:{
    width: width,
    height: 50,
    flexDirection:'row',
    backgroundColor:'white',
    borderBottomWidth: 1,
    borderBottomColor:'red'
  },
  logo_image_view:{
    height:'100%',
    width:'30%'
  },
  logo_image:{
    width: '100%',
    height:'100%'
  },
  date_group:{
    flexDirection:'column',
    height:'100%',
    marginLeft:5,
    justifyContent:'center'
  },
  date:{
    color:'#888888',
    fontSize:10
  },
  group:{
    
    color:'#888888',
    fontSize:10
  },
  close_view:{
    position:'absolute',
    right:5,
    height:'100%',
    justifyContent:'center'
  },
  close_btn:{
    height:'90%',
  },
  close_icon:{
    height:'100%',
    aspectRatio:1
  },
  image_view:{
    width:'100%',
    height:height-70
  },
  news_image:{
    width:'100%',
    height:'100%'
  },
  like_icon:{
    backgroundColor: 'transparent',
    position: 'absolute',
    right:10,
    bottom:20,
    width:40,
    height: 40,
    resizeMode:'contain'
  }
});