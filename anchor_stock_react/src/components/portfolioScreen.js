import React from 'react';
import {connect} from 'react-redux';
import {getStockFetch,getStockBatchFetch} from '../actions/actions.js';

class PortfolioScreen extends React.PureComponent {

  componentDidMount = () => {
    if (this.props.currentUser.stocks.length > 0) {
      //check if user has stocks
      this.props.getStockBatchFetch(this.props.currentUser.stocks)
      this.startStockInterval()
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentUser.stocks.length > 0 && this.stockInterval === undefined) {
      //check if user has stocks and stockinterval exists
      this.startStockInterval()
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.stockInterval)
  }


  state = {
    symbolSearch: '',
    symbolAmount: 0
  }

  startStockInterval = () => {
    return this.stockInterval = setInterval(() => this.props.getStockBatchFetch(this.props.currentUser.stocks), 180000)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    if(this.state.symbolAmount === 0 || this.state.symbolAmount <= 0) {
      //stock quantity cannot be 0 or less then 0
      alert("Must have a quantity more then zero.")
    } else {
      const data = {...this.state}

      this.props.getStockFetch(data)
    }
  }

  renderPortfolio = (portfolioStocks) => {
    return Object.values(portfolioStocks).map((item,idx) => {
      return <tr key={idx}>
               <td><span className={item.stockTextColor}>{item.symbol}</span> - {item.amount} Shares</td>
               <td className={item.stockTextColor}>${item.totalPrice}</td>
             </tr>
    })
  }


  render(){
    return(
      <div className="centerRowTable">
        <div className="centerColumn tableAlignLeft">
          {this.props.currentUser.stocks.length === 0 ?
            <p>No stocks in portfolio.</p>
          :
          <div>
            <table>
              <thead>Portfolio (${this.props.portfolioPrice})</thead>
              <tbody>
                {Object.keys(this.props.portfolioStocks).length === 0 ? null : this.renderPortfolio(this.props.portfolioStocks)}
              </tbody>
            </table>
          </div>}
        </div>
        <div className="centerColumn formAlignCenter">
          <p>Cash: ${this.props.currentUser.money_amount.toFixed(2)}</p>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Ticker: </label>
              <input type='text' name='symbolSearch' placeholder='Ticker' onChange={this.handleChange} />
            </div>
            <div>
              <label>Qty: </label>
              <input type='number' name='symbolAmount' placeholder='Qty' onChange={this.handleChange} />
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
  portfolioStocks: state.portfolioStocks,
  portfolioPrice: state.portfolioPrice
})

const mapDispatchToProps = dispatch => ({
  getStockFetch: data => dispatch(getStockFetch(data)),
  getStockBatchFetch: data => dispatch(getStockBatchFetch(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(PortfolioScreen);
