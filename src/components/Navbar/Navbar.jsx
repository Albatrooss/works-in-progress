import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { properNoun } from '../../utils/converters';
import userService from '../../utils/userService';

import '../Navbar/Navbar.css';

export default function Navbar({ handleClick, dropped, user }) {

  const [navExpanded, setNavExpanded] = useState(false)
  const [admin, setAdmin] = useState(false);

  const expandNav = () => {
    setNavExpanded(!navExpanded)
  }

  const handleLink = () => {
    setNavExpanded(false);
  }

  let dropdown = user ?
    <>
      <li><Link to="/my-classes"><span onClick={handleLink}>{properNoun(user.username)}</span></Link></li>
      {admin && <li><a href="/admin">Admin</a></li>}
      <li><a href="/logout">Logout</a></li>
    </> :
    <>
      <li><a href="/login">Login</a></li>
      <li><a href="/signup">Signup</a></li>
    </>;

  useEffect(() => {
    let user = userService.getUser();
    if (user) {
      setAdmin(process.env.REACT_APP_ADMINS.split(' ').includes(user._id))
    }
  }, [])

  return (
    <nav>
      <div className="nav-wrapper">
        <img src="images/Logo-01.png" alt="logo" className="nav-logo" />
        <a href="/" className="brand-logo">WORKS IN PROGRESS</a>
        <ul className="right nav-items">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/classes">Classes</Link></li>
          <li><Link to="/collabs">Collabs</Link></li>
          {dropdown}
        </ul>
      </div>
      <div className={`${navExpanded ? 'showing' : ''} hidden-nav-wrapper`}>
        <ul className="hidden-ul">
          <li><Link to="/about"><span onClick={handleLink}>About</span></Link></li>
          <li><Link to="/classes"><span onClick={handleLink}>Classes</span></Link></li>
          <li><Link to="/collabs"><span onClick={handleLink}>Collabs</span></Link></li>
          {dropdown}
        </ul>
      </div>
      <div className="nav-burger" onClick={expandNav}><i className="material-icons">menu</i></div>
    </nav>
  )
}
