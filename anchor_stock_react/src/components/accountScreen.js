import React from 'react';

class AccountScreen extends React.PureComponent {
  state = {
    username: '',
    email: '',
    password: '',
    currAccView: 'loginAcc'
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  handleClick = () => {
    if (this.state.currAccView === 'createAcc'){
      this.setState({
        currAccView: 'loginAcc'
      })
    } else {
      this.setState({
        currAccView: 'createAcc'
      })
    }
  }

  render(){
    return(
      <div>
        <form className="centerColumn" id='accountForm' onSubmit={this.handleSubmit}>
        {this.state.currAccView === 'createAcc' ?
        <div>
          <label>Username: </label>
          <input type='text' name='username' placeholder='Username' onChange={this.handleChange} />
        </div>
        :
        null}
        <div>
          <label>Email: </label>
          <input type='email' name='email' placeholder='Email' onChange={this.handleChange} />
        </div>
        <div>
          <label>Password: </label>
          <input type='password' name='password' placeholder='Password' onChange={this.handleChange} />
        </div>
        {this.state.currAccView === 'createAcc' ?
        <div>
          <input type='button' name='button' value='I have an account' onClick={this.handleClick}/>
          <input type='submit' name='submit' value='Submit' />
        </div>
        :
        <div>
          <input type='button' name='button' value='Register an account' onClick={this.handleClick}/>
          <input type='submit' name='submit' value='Submit' />
        </div>}
        </form>
      </div>
    )
  }
}

export default AccountScreen
