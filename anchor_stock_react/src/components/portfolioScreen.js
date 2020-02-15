import React from 'react';
import {connect} from 'react-redux';
import {getStockFetch} from '../actions/actions.js'

class PortfolioScreen extends React.PureComponent {
  state = {
    symbolSearch: '',
    symbolAmount: 0
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    const data = {...this.state}

    this.props.getStockFetch(data)
  }


  render(){
    return(
      <div>
        <p>Cash: ${this.props.currentUser.money_amount}</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Ticker: </label>
            <input type='text' name='symbolSearch' placeholder='Ticker' onChange={this.handleChange} />
          </div>
          <div>
            <label>Qty: </label>
            <input type='text' name='symbolAmount' placeholder='Qty' onChange={this.handleChange} />
          </div>
          <input type='submit' name='submit' value='Buy' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  getStockFetch: data => dispatch(getStockFetch(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(PortfolioScreen);
