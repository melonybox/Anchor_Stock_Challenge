import React, {Component} from 'react';
import AccountScreen from '../components/accountScreen.js';
import PortfolioScreen from '../components/portfolioScreen.js';

class BodyBox extends Component {
  render(){
    return(
      <>
      <AccountScreen />
      <PortfolioScreen />
      </>
    )
  }
}

export default BodyBox
