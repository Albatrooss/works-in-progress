import React, { Component } from 'react'
import userService from '../../utils/userService';

import './Signup.css';

class Login extends Component {
  state = {
    email: '',
    pw: '',
    errMsg: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      this.props.handleLogin();
      this.props.history.push('/');
    } catch (err) {
      console.log('hello? ', err)
      this.setState({ errMsg: err.message })
    }
  }

  render() {
    return (
      <div className="signup-page center-align">
        <h1>LOG IN</h1>
        <div className="row">
          <form className="col s12 l8 z-depth-3" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input onChange={this.handleChange} name="email" type="email" placeholder="example@email.com" className="validate" />
                <input onChange={this.handleChange} name="pw" type="password" placeholder="password" className="validate" />
              </div>
              <p className="red-text text-lighten-1">{this.state.errMsg}</p>
              <p>Not a member? <a href="/signup">Signup</a></p>
              <button className="btn" type="submit">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default Login