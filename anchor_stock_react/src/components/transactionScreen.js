import React from 'react';
import {connect} from 'react-redux';

class TransactionScreen extends React.PureComponent {

  render(){
    return(
      <div className="centerColumn">
        <p>Transactions</p>
        {this.props.currentUser.stocks.length === 0 ?
          <p>No transaction history.</p>
        :
        <table>
          <tbody>
            {this.props.currentUser.stocks.map((item,idx) => {
              return <tr key={idx}>
                       <td>BUY ({item.symbol}) - {item.amount} Shares @ ${item.price}</td>
                     </tr>
            })}
          </tbody>
        </table>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps,null)(TransactionScreen);
