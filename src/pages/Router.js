import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import MainNavBar from '../component/MainNavBar.js';

import Login from '../pages/Login.js';
import Signup from '../pages/Signup.js';
import Logo from '../pages/Logo.js';
import Home from '../pages/Home.js';
import SavedNews from '../pages/SavedNews.js';
import News from '../pages/News.js';
import Detail from '../pages/Detail.js';
import Category from '../pages/Category.js';

const Routes = () => (
  <Router navBar={MainNavBar}>
    <Scene key = "root">
      <Scene key = "signin" component = {Login}  hideNavBar={true} initial = {true}/>
      <Scene key = "signup" component = {Signup} hideNavBar={true} />
      <Scene key = "logo" component = {Logo} hideNavBar={true}/>
      <Scene key = "home" component = {Home} hideNavBar={false} title='home'/>
      <Scene key = "savednews" component = {SavedNews} hideNavBar={false} />
      <Scene key = "news" component = {News} hideNavBar={true} />
      <Scene key = "detail" component = {Detail} hideNavBar={true} />
      <Scene key = "category" component = {Category} hideNavBar={true} />
    </Scene>
  </Router>
);
const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Routes