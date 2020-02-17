import React from 'react';
import {connect} from 'react-redux';
import {handleScreenSwitch} from '../actions/actions.js';

class NavButtons extends React.PureComponent {

  handleClick = event => {
    if (event.target.name === 'portfolio' && event.target.name !== this.props.bodyView) {
      this.props.handleScreenSwitch('portfolio')
    } else if (event.target.name === 'transactions' && event.target.name !== this.props.bodyView) {
      this.props.handleScreenSwitch('transactions')
    }
  }

  render(){
    return(
      <div>
        <button type='button' name='portfolio' onClick={this.handleClick}>Portfolio</button>
        <button type='button' name='transactions' onClick={this.handleClick}>Transactions</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bodyView: state.bodyView
})

const mapDispatchToProps = dispatch => ({
  handleScreenSwitch: data => dispatch(handleScreenSwitch(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(NavButtons);
