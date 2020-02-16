import React from 'react';
import {connect} from 'react-redux';
import {getStockFetch,getStockBatchFetch} from '../actions/actions.js'

class PortfolioScreen extends React.PureComponent {

  componentDidMount = () => {
    this.props.getStockBatchFetch(this.props.currentUser.stocks)
    // window.addEventListener('resize', this.handleLoad);
  }

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

  renderPortfolio = (portfolioStocks) => {
    return Object.values(portfolioStocks).map((item,idx) => {
      return <tr key={idx}>
               <td>{item.symbol} - {item.amount} Shares</td>
               <td>${item.totalPrice}</td>
             </tr>
    })
  }


  render(){
    return(
      <div className="centerRow">
        <div>
          <table>
            {Object.keys(this.props.portfolioStocks).length === 0 ? null : this.renderPortfolio(this.props.portfolioStocks)}
          </table>
        </div>
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  portfolioStocks: state.portfolioStocks
})

const mapDispatchToProps = dispatch => ({
  getStockFetch: data => dispatch(getStockFetch(data)),
  getStockBatchFetch: data => dispatch(getStockBatchFetch(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(PortfolioScreen);
