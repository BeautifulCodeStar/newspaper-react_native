import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  AsyncStorage
} from 'react-native';

export default class FlatlistView extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      category_ids:[],
      flag:false
    };
    this.renderItem = this.renderItem.bind(this);
  };
/////////////////////////////    
  componentDidMount(){
    this.retrieveData();
  }
/////////////////////////////
  retrieveData = async () => {
    try{
      var value = await AsyncStorage.getItem('user_id');
      if(value !== null ){
        this.onFetchCategoryIDRecords(value);
      }
    } catch (error) {
      console.log("can't retrieveData", error);
    }
  };

  onFetchCategoryIDRecords(id) {
    let url = 'http://newshubnepal.com/apps/loginWithUserId?user_id=' + id;
    fetch(url) 
    .then(response => {
      let data = JSON.parse(response['_bodyText']); 
      let temp_ids=[] ;
      data.userinfo.category.map(element=>{
        temp_ids.push({id:element.id});
      });
      this.setState({ category_ids: temp_ids });
      this.onFetchLoginRecords(id);
    })
    .catch((err) => { 
      alert(err); 
    });
  }

/////////////////////////////  //data request
  async onFetchLoginRecords(id) {
    var url='';
    const {flag_view, cat_id} = this.props;
    for (let i=0; i<5 ;i++){
      if(cat_id === i){
        url = 'http://newshubnepal.com/apps/newsByCategory?cat_id=' + this.state.category_ids[i].id;
      }
    }
    if(flag_view === 'home'){
      url = 'http://newshubnepal.com/apps/newsByUserId?user_id=' + id;
    }
    if(flag_view === 'savednews'){
      this.setState({flag:true});
      url = 'http://newshubnepal.com/apps/newsByUserFav?user_id=' + id;
    }
    console.log(flag_view);
    console.log(cat_id);
    console.log(url);

    fetch(url) 
    .then(response => {
      var data = JSON.parse(response['_bodyText']); 
      this.setState({ dataSource: data.newscategory });
    })
    .catch((err) => { 
      alert(err); 
    });
  }

  onScroll = (e) => {
    
  };
  /////////////////////////////
  click_newspaper = (item) => {
    this.props.show_newspaper_detail(item);
  }
/////////////////////////////
  renderItem({ item,index}) {
    const category_name = item.category;
    if(item.images === undefined) {
      const image_source = item.image;
      return (
        <TouchableOpacity style={styles.newspaper_item} onPress={()=>this.click_newspaper(item)}>
          <Image resizeMode='cover' style={ styles.newspaper_img } source={{uri:image_source}}/>
          <View style={ styles.image_text }>
            <Text style={ styles.name_age }>{ category_name }</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if(item.images !== undefined) {
      const image_source = item.images[0].image_url;
      return (
        <TouchableOpacity style={styles.newspaper_item} onPress={()=>this.click_newspaper(item)}>
          <Image resizeMode='cover' style={ styles.newspaper_img } source={{uri:image_source}}/>
          <View style={ styles.image_text }>
            <Text style={ styles.name_age }>{ category_name }</Text>
          </View>
        </TouchableOpacity>
      );
    } 
  };
/////////////////////////////
  render() {
    return (
      <FlatList
        contentContainerStyle={styles.flat_list}
        data={this.state.dataSource}
        keyExtractor={(item, index) => index}
        key={this.state.dataSource}
        numColumns={2}
        renderItem={this.renderItem}
        onScroll={(e)=>{this.onScroll(e)}}
      />
    );
  }

}
/////////////////////////////
const styles = StyleSheet.create({
  flat_list: {
    display:'flex',
    marginTop: 5,
    marginLeft: '2.133%',
    justifyContent: 'center',
    flexDirection: 'column',
    shadowColor: '#969696',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },

  newspaper_item: {
    width: '44.5%',
    margin:'2.133%',
    borderRadius:5,
    overflow: 'hidden',
  },

  newspaper_img:{
    width: '100%',
    height: 200,
    resizeMode: 'stretch',
  },

  image_text:{
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    width:'100%',
    height:36,
    fontSize:16,
    backgroundColor:'#fff',
  },

  name_age:{
    justifyContent:'flex-start',
    paddingLeft:4,
  },

  nearby:{
    justifyContent:'flex-end',
    paddingRight:4
  },

  nab_view: {
    position:'absolute',
    flexDirection: 'row',
    height: 60,
    bottom:0,
    left:0,
    right: 0,
    backgroundColor:'#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    borderWidth:0.5,
    borderColor:'#cacaca',
  },

  group: {
    display:'flex',
    width:'50%',
    alignItems:'center',
  },

  group_Btn: {
    height:'100%',
  }
});