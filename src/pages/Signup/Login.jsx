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
      <div className="signup-page center-align row">
        <div className="col s12 l8 offset-l2 my-outline-class">
          <h3 className="label-class">Log In</h3>
          <form onSubmit={this.handleSubmit} className="signup-form">
            <p className="red-text">{this.state.errMsg}</p>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Email</div>
              <input onChange={this.handleChange} name="email" type="email" />
            </div>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Password</div>
              <input onChange={this.handleChange} name="pw" type="password" />
            </div>
            <p>Not a member? <a href="/signup">Signup</a></p>
            <button className="btn" type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login