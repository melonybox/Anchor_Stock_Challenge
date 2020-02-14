import React from 'react';
import {connect} from 'react-redux';
import {userCreateFetch,userLoginFetch} from '../actions/actions.js'

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
    const buttonValue = document.getElementById('formButtonView').value
    let data = {}
    if (buttonValue === 'Register an account') {
      data = {
        email: this.state.email,
        password: this.state.password
      }
      this.props.userLoginFetch(data)
    } else {
      data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
      this.props.userCreateFetch(data)
    }
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
        <div>
          <input type='submit' name='submit' value='Submit' />
          <input type='button' name='button' value={this.state.currAccView === 'createAcc' ? 'I have an account' : 'Register an account'} id='formButtonView' onClick={this.handleClick}/>
        </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userCreateFetch: data => dispatch(userCreateFetch(data)),
  userLoginFetch: data => dispatch(userLoginFetch(data))
})

export default connect(null,mapDispatchToProps)(AccountScreen);
