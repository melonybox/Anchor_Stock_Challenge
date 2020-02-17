import React, {Component} from 'react';
import {connect} from 'react-redux';
import BodyBox from './containers/bodyBox.js';
import NavBox from './containers/navBox.js';

class App extends Component {
  render(){
    return (
      <div>
        {Object.keys(this.props.currentUser).length === 0 ? null : <NavBox />}
        <BodyBox />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps,null)(App);
