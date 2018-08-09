import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FlatListView from './FlatlistView';

class Middleware extends Component {

  static contextTypes = {
    drawer: PropTypes.object.isRequired,
  };
  componentDidMount(){
    this.context.drawer.close();
    console.log("hahaha")
  };
  openDrawer = () => {
    if(this.props.onClickMenu)
      this.context.drawer.close();
    else
      this.context.drawer.open();
  };

  componentWillReceiveProps() {
    this.openDrawer();
  }

  render() {
    return (
      <FlatListView {...this.props}/>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    onClickMenu: state.navBar.onClickMenu
  }
}
export default connect(mapStateToProps)(Middleware);
