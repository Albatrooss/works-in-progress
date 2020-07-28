import React, { useState } from 'react'

import '../Navbar/Navbar.css';
import userService from '../../utils/userService';

export default function Navbar({ handleClick, dropped, user }) {

  const handleLogout = () => {
    console.log('logout');
    userService.logout();
  }

  let dropdown = user ?
    <>
      <li>
        <div className="dropdown-trigger dropdown-cover" href="#!" onClick={handleClick}>{user.username}<i className="material-icons right">arrow_drop_down</i></div>
        <ul className={dropped ? 'dropdown-content-T dropped-down' : 'dropdown-content-T'}>
          <li><a href="/my-classes">My Classes</a></li>
          <li><a href="/settings">Settings</a></li>
          <li className="divider"></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </li>
    </> :
    <>
      <li><a href="/login">Login</a></li>
      <li><a href="/signup">Signup</a></li>
    </>;

  return (
    <nav>
      <div className="nav-wrapper">
        <img src="Logo-01.png" alt="logo" className="nav-logo" />
        <a href="/" className="brand-logo">WORKS IN PROGRESS</a>
        <ul className="right hide-on-med-and-down">
          <li><a href="/about">About</a></li>
          <li><a href="classes">Classes</a></li>
          {/* <!-- Dropdown Trigger --> */}
          {dropdown}
        </ul>
      </div>
    </nav>
  )
}
