import React, {Component} from 'react';
import {connect} from 'react-redux';
import AccountScreen from '../components/accountScreen.js';
import PortfolioScreen from '../components/portfolioScreen.js';

class BodyBox extends Component {
  render(){
    switch (this.props.bodyView) {
      case "portfolio":
        return <PortfolioScreen />
      default:
        return <AccountScreen />
    }
  }
}

const mapStateToProps = state => ({
  bodyView: state.bodyView
})

export default connect(mapStateToProps,null)(BodyBox)
