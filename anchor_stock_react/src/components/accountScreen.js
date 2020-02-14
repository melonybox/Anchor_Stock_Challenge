import React from 'react';

class AccountScreen extends React.PureComponent {
  state = {
    username: "",
    email: "",
    password: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render(){
    return(
      <div id='accountForm'>
        <form className="centerColumn">
        <div>
          <label>Username: </label>
          <input type='text' name='username' placeholder='Username' onChange={this.handleChange} />
        </div>
        <div>
          <label>Email: </label>
          <input type='email' name='email' placeholder='Email' onChange={this.handleChange} />
        </div>
        <div>
          <label>Password: </label>
          <input type='password' name='password' placeholder='Password' onChange={this.handleChange} />
        </div>
        <input type='submit' name='submit' Value='Submit' />
        </form>
      </div>
    )
  }
}

export default AccountScreen
