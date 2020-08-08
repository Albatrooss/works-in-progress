import React, { Component } from 'react'
import userService from '../../utils/userService';
import './Signup.css';

class Signup extends Component {

  state = {
    email: '',
    username: '',
    password: '',
    passwordConf: '',
    errMsg: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.password !== this.state.passwordConf) {
      return this.setState(state => {
        return {
          ...state,
          errMsg: 'Passwords don\'t match..'
        }
      })
    }
    try {
      await userService.signup(this.state);
      this.props.handleSignUp();
      this.props.history.push('/');
    } catch (err) {
      console.log(err)
      this.setState({ errMsg: err.message })
    }
  }

  render() {
    return (
      <div className='signup-page center-align row'>
        <div className="col s12 l8 offset-l2 my-outline-class">
          <h3 className="label-class">Signup</h3>
          <form onSubmit={this.handleSubmit} className="signup-form">
            <p className="red-text">{this.state.errMsg}</p>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Username</div>
              <input onChange={this.handleChange} name="username" type="text" required />
            </div>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Email</div>
              <input onChange={this.handleChange} name="email" type="email" required />
            </div>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Password</div>
              <input onChange={this.handleChange} name="password" type="password" required />
            </div>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">ConfrimPassword</div>
              <input onChange={this.handleChange} name="passwordConf" type="password" required />
            </div>
            <p>Allready a member? <a href="/login">Login</a></p>
            <button className="btn " type="submit">SIGN UP</button>
          </form>

        </div>
      </div>
    )
  }
}

export default Signup;