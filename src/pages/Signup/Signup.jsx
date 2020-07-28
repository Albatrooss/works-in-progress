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
    try {
      await userService.signup(this.state);
      this.props.handleSignUp();
      this.props.history.push('/');
    } catch (err) {
      this.setState({ errMsg: err.err.message })
    }
  }

  render() {
    return (
      <div className='signup-page center-align'>
        <h1>SIGNUP</h1>
        <div className="row">
          <form className="col s12 l8 z-depth-3" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <p>{this.state.errMsg}</p>
                <input onChange={this.handleChange} name="username" type="text" placeholder="username" className="validate" required />
                <input onChange={this.handleChange} name="email" type="email" placeholder="example@email.com" className="validate" required />
                <input onChange={this.handleChange} name="pw" type="password" placeholder="password" className="validate" required />
                <p>Allready a member? <a href="/login">Login</a></p>
                <button className="btn " type="submit">SIGN UP</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Signup;